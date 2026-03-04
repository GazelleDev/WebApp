import { pgTable, text, serial, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { ContentDocumentKey } from "./content";

// === TABLE DEFINITIONS ===
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contentDocuments = pgTable("content_documents", {
  id: serial("id").primaryKey(),
  key: text("key").$type<ContentDocumentKey>().notNull().unique(),
  payload: jsonb("payload").notNull(),
  updatedByUserId: integer("updated_by_user_id").references(() => adminUsers.id, {
    onDelete: "set null",
  }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => menuCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  priceLabel: text("price_label").notNull(),
  badgeCodes: jsonb("badge_codes").$type<string[]>().notNull(),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// === BASE SCHEMAS ===
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address")
  .max(320, "Email address is too long");

export const insertContactMessageSchema = createInsertSchema(contactMessages, {
  name: z.string().trim().min(2, "Name is required").max(80, "Name is too long"),
  email: emailSchema,
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
}).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers, {
  email: emailSchema,
}).omit({
  id: true,
  createdAt: true,
});

// === EXPLICIT API CONTRACT TYPES ===
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type CreateContactMessageRequest = InsertContactMessage;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type CreateNewsletterSubscriberRequest = InsertNewsletterSubscriber;

export type AdminUser = typeof adminUsers.$inferSelect;
export type AdminSession = typeof adminSessions.$inferSelect;
export type ContentDocument = typeof contentDocuments.$inferSelect;
export type MenuCategory = typeof menuCategories.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
