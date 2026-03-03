import { db } from "./db";
import { 
  contactMessages, 
  newsletterSubscribers,
  type ContactMessage, 
  type CreateContactMessageRequest,
  type NewsletterSubscriber,
  type CreateNewsletterSubscriberRequest
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
  createNewsletterSubscriber(subscriber: CreateNewsletterSubscriberRequest): Promise<NewsletterSubscriber>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createNewsletterSubscriber(subscriber: CreateNewsletterSubscriberRequest): Promise<NewsletterSubscriber> {
    const [newSubscriber] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return newSubscriber;
  }
}

export const storage = new DatabaseStorage();
