import type { Request, Response } from "express";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export const ADMIN_SESSION_COOKIE = "gazelle_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;
const LOGIN_WINDOW_MS = 1000 * 60 * 15;
const MAX_LOGIN_ATTEMPTS = 10;

const loginAttempts = new Map<string, number[]>();

function requireSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }

  return secret;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [salt, hash] = passwordHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const storedHash = Buffer.from(hash, "hex");

  if (storedHash.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedHash, derivedKey);
}

export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
  const secret = requireSessionSecret();
  return createHash("sha256").update(`${secret}:${token}`).digest("hex");
}

export function getSessionDurationMs() {
  return SESSION_DURATION_MS;
}

export function parseCookies(cookieHeader?: string | null) {
  const cookies: Record<string, string> = {};

  if (!cookieHeader) {
    return cookies;
  }

  for (const cookie of cookieHeader.split(";")) {
    const [rawName, ...valueParts] = cookie.trim().split("=");
    const value = valueParts.join("=");

    if (!rawName) {
      continue;
    }

    cookies[rawName] = decodeURIComponent(value ?? "");
  }

  return cookies;
}

export function getAdminSessionToken(req: Request) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[ADMIN_SESSION_COOKIE] ?? null;
}

export function setAdminSessionCookie(res: Response, token: string, expiresAt: Date) {
  res.cookie(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export function clearAdminSessionCookie(res: Response) {
  res.clearCookie(ADMIN_SESSION_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getLoginThrottleKey(req: Request) {
  return `${req.ip ?? "unknown"}:${req.body?.email ?? "unknown"}`;
}

export function isLoginRateLimited(key: string, now = Date.now()) {
  const attempts = loginAttempts.get(key) ?? [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < LOGIN_WINDOW_MS);

  loginAttempts.set(key, recentAttempts);

  return recentAttempts.length >= MAX_LOGIN_ATTEMPTS;
}

export function recordLoginAttempt(key: string, now = Date.now()) {
  const attempts = loginAttempts.get(key) ?? [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < LOGIN_WINDOW_MS);
  recentAttempts.push(now);
  loginAttempts.set(key, recentAttempts);
}

export function clearLoginAttempts(key: string) {
  loginAttempts.delete(key);
}
