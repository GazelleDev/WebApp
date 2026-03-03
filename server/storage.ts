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

class MemoryStorage implements IStorage {
  private contactMessageId = 1;
  private newsletterSubscriberId = 1;
  private readonly contactMessages: ContactMessage[] = [];
  private readonly newsletterSubscribers: NewsletterSubscriber[] = [];

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: this.contactMessageId++,
      ...message,
      createdAt: new Date(),
    };

    this.contactMessages.push(newMessage);
    return newMessage;
  }

  async createNewsletterSubscriber(subscriber: CreateNewsletterSubscriberRequest): Promise<NewsletterSubscriber> {
    const existingSubscriber = this.newsletterSubscribers.find(
      (entry) => entry.email === subscriber.email,
    );

    if (existingSubscriber) {
      throw new Error("duplicate key value violates unique constraint");
    }

    const newSubscriber: NewsletterSubscriber = {
      id: this.newsletterSubscriberId++,
      ...subscriber,
      createdAt: new Date(),
    };

    this.newsletterSubscribers.push(newSubscriber);
    return newSubscriber;
  }
}

export class DatabaseStorage implements IStorage {
  constructor(private readonly database: NonNullable<typeof db>) {}

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [newMessage] = await this.database.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createNewsletterSubscriber(subscriber: CreateNewsletterSubscriberRequest): Promise<NewsletterSubscriber> {
    const [newSubscriber] = await this.database
      .insert(newsletterSubscribers)
      .values(subscriber)
      .returning();
    return newSubscriber;
  }
}

export const storageMode = db ? "database" : "memory";
export const storage: IStorage = db ? new DatabaseStorage(db) : new MemoryStorage();
