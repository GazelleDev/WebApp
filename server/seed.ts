import { storage } from "./storage";
import { db } from "./db";
import { defaultContentDocuments, defaultMenuDocument, type ContentDocumentKey } from "@shared/content";
import { hashPassword } from "./auth";

export async function seedAdminAndContent() {
  if (!db) {
    throw new Error("DATABASE_URL is required to seed admin content.");
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminEmail || !adminPassword || !sessionSecret) {
    throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD, and SESSION_SECRET are required to seed admin content.");
  }

  const passwordHash = await hashPassword(adminPassword);
  const adminUser = await storage.upsertAdminUser(adminEmail, passwordHash);

  const documents = await storage.getAdminContentDocuments();
  const documentKeys = Object.keys(defaultContentDocuments) as ContentDocumentKey[];

  for (const key of documentKeys) {
    if (!documents[key].updatedAt) {
      await storage.updateContentDocument(key, defaultContentDocuments[key], adminUser.id);
    }
  }

  const menuDocument = await storage.getAdminMenuDocument();
  if (!menuDocument.updatedAt) {
    await storage.replaceAdminMenu(defaultMenuDocument, adminUser.id);
  }

  return {
    adminEmail,
    seededDocuments: documentKeys.filter((key) => !documents[key].updatedAt),
    seededMenu: !menuDocument.updatedAt,
  };
}
