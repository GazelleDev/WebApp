import type { Express, NextFunction, Request, Response } from "express";
import type { Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { api } from "@shared/routes";
import {
  adminLoginRequestSchema,
  contentDocumentKeySchema,
  contentDocumentSchemas,
} from "@shared/content";
import {
  clearAdminSessionCookie,
  clearLoginAttempts,
  generateSessionToken,
  getAdminSessionToken,
  getLoginThrottleKey,
  getSessionDurationMs,
  hashSessionToken,
  isLoginRateLimited,
  recordLoginAttempt,
  setAdminSessionCookie,
  verifyPassword,
} from "./auth";
import { db } from "./db";

type AuthedResponseLocals = {
  adminUserId: number;
  adminEmail: string;
};

function sendValidationError(res: Response, error: z.ZodError) {
  const issue = error.issues[0];

  return res.status(400).json({
    message: issue?.message ?? "Validation failed",
    field: issue?.path.join("."),
  });
}

function sendUnavailable(res: Response) {
  return res.status(503).json({
    message: "Admin features require DATABASE_URL and SESSION_SECRET.",
  });
}

function sendUnauthorized(res: Response) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}

function isAdminEnabled() {
  return Boolean(db) && Boolean(process.env.SESSION_SECRET);
}

async function readAdminSession(req: Request, res: Response) {
  const token = getAdminSessionToken(req);

  if (!token) {
    return null;
  }

  await storage.deleteExpiredAdminSessions(new Date());

  let tokenHash: string;

  try {
    tokenHash = hashSessionToken(token);
  } catch {
    clearAdminSessionCookie(res);
    return null;
  }

  const sessionRecord = await storage.getAdminSessionByTokenHash(tokenHash);

  if (!sessionRecord) {
    clearAdminSessionCookie(res);
    return null;
  }

  if (sessionRecord.session.expiresAt <= new Date()) {
    await storage.deleteAdminSessionByTokenHash(tokenHash);
    clearAdminSessionCookie(res);
    return null;
  }

  return sessionRecord;
}

async function requireAdmin(
  req: Request,
  res: Response<any, AuthedResponseLocals>,
  next: NextFunction,
) {
  if (!isAdminEnabled()) {
    return sendUnavailable(res);
  }

  const sessionRecord = await readAdminSession(req, res);

  if (!sessionRecord) {
    return sendUnauthorized(res);
  }

  res.locals.adminUserId = sessionRecord.user.id;
  res.locals.adminEmail = sessionRecord.user.email;
  return next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(api.publicContent.get.path, async (_req, res) => {
    try {
      const bootstrap = await storage.getPublicContentBootstrap();
      return res.status(200).json(bootstrap);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);
      return res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendValidationError(res, err);
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.newsletter.create.path, async (req, res) => {
    try {
      const input = api.newsletter.create.input.parse(req.body);
      await storage.createNewsletterSubscriber(input);
      return res.status(201).json({ success: true, message: "Subscribed to newsletter successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendValidationError(res, err);
      }

      if (err instanceof Error && err.message.includes("duplicate key value")) {
        return res.status(200).json({ success: true, message: "Already subscribed to newsletter" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.admin.auth.session.path, async (req, res) => {
    if (!isAdminEnabled()) {
      return sendUnavailable(res);
    }

    try {
      const sessionRecord = await readAdminSession(req, res);

      return res.status(200).json({
        authenticated: Boolean(sessionRecord),
        user: sessionRecord
          ? {
              id: sessionRecord.user.id,
              email: sessionRecord.user.email,
            }
          : null,
      });
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.admin.auth.login.path, async (req, res) => {
    if (!isAdminEnabled()) {
      return sendUnavailable(res);
    }

    const throttleKey = getLoginThrottleKey(req);
    if (isLoginRateLimited(throttleKey)) {
      return res.status(429).json({ message: "Too many login attempts. Please try again later." });
    }

    try {
      const input = adminLoginRequestSchema.parse(req.body);
      const user = await storage.findAdminByEmail(input.email);

      if (!user) {
        recordLoginAttempt(throttleKey);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValid = await verifyPassword(input.password, user.passwordHash);
      if (!isValid) {
        recordLoginAttempt(throttleKey);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      clearLoginAttempts(throttleKey);

      const token = generateSessionToken();
      const tokenHash = hashSessionToken(token);
      const expiresAt = new Date(Date.now() + getSessionDurationMs());
      await storage.createAdminSession(user.id, tokenHash, expiresAt);
      setAdminSessionCookie(res, token, expiresAt);

      return res.status(200).json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendValidationError(res, err);
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.admin.auth.logout.path, async (req, res) => {
    if (!isAdminEnabled()) {
      return sendUnavailable(res);
    }

    try {
      const token = getAdminSessionToken(req);

      if (token) {
        const tokenHash = hashSessionToken(token);
        await storage.deleteAdminSessionByTokenHash(tokenHash);
      }

      clearAdminSessionCookie(res);
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch {
      clearAdminSessionCookie(res);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(
    api.admin.content.list.path,
    requireAdmin,
    async (_req: Request, res: Response<any, AuthedResponseLocals>) => {
      try {
        const documents = await storage.getAdminContentDocuments();
        return res.status(200).json({ documents });
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  app.put(
    api.admin.content.update.path,
    requireAdmin,
    async (req: Request, res: Response<any, AuthedResponseLocals>) => {
      try {
        const params = api.admin.content.update.params.parse(req.params);
        const key = contentDocumentKeySchema.parse(params.key);
        const schema = contentDocumentSchemas[key];
        const parsedBody = api.admin.content.update.input.parse(req.body);
        const payload = schema.parse(parsedBody.payload);

        const updatedRecord = await storage.updateContentDocument(
          key,
          payload,
          res.locals.adminUserId,
        );

        return res.status(200).json({
          success: true,
          updatedAt: updatedRecord.updatedAt ?? new Date().toISOString(),
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          return sendValidationError(res, err);
        }

        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  app.get(
    api.admin.menu.get.path,
    requireAdmin,
    async (_req: Request, res: Response<any, AuthedResponseLocals>) => {
      try {
        const { menu, updatedAt } = await storage.getAdminMenuDocument();
        return res.status(200).json({ menu, updatedAt });
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  app.put(
    api.admin.menu.update.path,
    requireAdmin,
    async (req: Request, res: Response<any, AuthedResponseLocals>) => {
      try {
        const input = api.admin.menu.update.input.parse(req.body);
        const updated = await storage.replaceAdminMenu(input, res.locals.adminUserId);
        return res.status(200).json({
          success: true,
          updatedAt: updated.updatedAt,
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          return sendValidationError(res, err);
        }

        return res.status(500).json({ message: "Internal server error" });
      }
    },
  );

  return httpServer;
}
