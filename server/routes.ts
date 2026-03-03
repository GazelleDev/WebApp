import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact Form Submission
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Newsletter Signup
  app.post(api.newsletter.create.path, async (req, res) => {
    try {
      const input = api.newsletter.create.input.parse(req.body);
      await storage.createNewsletterSubscriber(input);
      res.status(201).json({ success: true, message: "Subscribed to newsletter successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Consider duplicate email as handled gracefully
      if (err instanceof Error && err.message.includes('duplicate key value')) {
        return res.status(201).json({ success: true, message: "Already subscribed to newsletter" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
