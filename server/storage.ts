import { and, asc, eq, lt } from "drizzle-orm";
import { db } from "./db";
import {
  adminSessions,
  adminUsers,
  contactMessages,
  contentDocuments,
  menuCategories,
  menuItems,
  newsletterSubscribers,
  type AdminSession,
  type AdminUser,
  type ContactMessage,
  type CreateContactMessageRequest,
  type CreateNewsletterSubscriberRequest,
  type NewsletterSubscriber,
} from "@shared/schema";
import {
  adminMenuDocumentSchema,
  buildDefaultPublicContentBootstrap,
  contentDocumentKeySchema,
  contentDocumentSchemas,
  type ContentDocumentRecord,
  type ContentDocumentRecordMap,
  defaultContentDocuments,
  defaultMenuDocument,
  type AdminMenuDocument,
  type ContentDocumentKey,
  type ContentDocumentPayloadMap,
  type PublicContentBootstrap,
} from "@shared/content";

export type AdminSessionWithUser = {
  session: AdminSession;
  user: AdminUser;
};

type StoredDocumentRecord<K extends ContentDocumentKey = ContentDocumentKey> =
  ContentDocumentRecord<K>;

export interface IStorage {
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
  createNewsletterSubscriber(subscriber: CreateNewsletterSubscriberRequest): Promise<NewsletterSubscriber>;
  findAdminByEmail(email: string): Promise<AdminUser | null>;
  upsertAdminUser(email: string, passwordHash: string): Promise<AdminUser>;
  createAdminSession(userId: number, tokenHash: string, expiresAt: Date): Promise<AdminSession>;
  getAdminSessionByTokenHash(tokenHash: string): Promise<AdminSessionWithUser | null>;
  deleteAdminSessionByTokenHash(tokenHash: string): Promise<void>;
  deleteExpiredAdminSessions(now: Date): Promise<void>;
  getAdminContentDocuments(): Promise<ContentDocumentRecordMap>;
  updateContentDocument<K extends ContentDocumentKey>(
    key: K,
    payload: ContentDocumentPayloadMap[K],
    userId: number,
  ): Promise<StoredDocumentRecord<K>>;
  getAdminMenuDocument(): Promise<{ menu: AdminMenuDocument; updatedAt: string | null }>;
  replaceAdminMenu(menu: AdminMenuDocument, userId: number): Promise<{ menu: AdminMenuDocument; updatedAt: string }>;
  getPublicContentBootstrap(): Promise<PublicContentBootstrap>;
}

function toIsoString(value: Date | null | undefined) {
  return value ? value.toISOString() : null;
}

function buildDefaultDocumentRecords(): ContentDocumentRecordMap {
  return {
    "site-settings": {
      payload: structuredClone(defaultContentDocuments["site-settings"]),
      updatedAt: null,
    },
    "home-page": {
      payload: structuredClone(defaultContentDocuments["home-page"]),
      updatedAt: null,
    },
    "about-page": {
      payload: structuredClone(defaultContentDocuments["about-page"]),
      updatedAt: null,
    },
    "location-page": {
      payload: structuredClone(defaultContentDocuments["location-page"]),
      updatedAt: null,
    },
    "gallery-page": {
      payload: structuredClone(defaultContentDocuments["gallery-page"]),
      updatedAt: null,
    },
    "contact-page": {
      payload: structuredClone(defaultContentDocuments["contact-page"]),
      updatedAt: null,
    },
    "footer-content": {
      payload: structuredClone(defaultContentDocuments["footer-content"]),
      updatedAt: null,
    },
    "privacy-page": {
      payload: structuredClone(defaultContentDocuments["privacy-page"]),
      updatedAt: null,
    },
    "menu-page": {
      payload: structuredClone(defaultContentDocuments["menu-page"]),
      updatedAt: null,
    },
  };
}

function buildMenuDocument(
  page = defaultContentDocuments["menu-page"],
  categories?: AdminMenuDocument["categories"],
): AdminMenuDocument {
  return {
    page: structuredClone(page),
    categories: categories ? structuredClone(categories) : structuredClone(defaultMenuDocument.categories),
  };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "menu-category";
}

function createUniqueSlug(title: string, usedSlugs: Set<string>) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  usedSlugs.add(slug);
  return slug;
}

function parseDocumentPayload<K extends ContentDocumentKey>(
  key: K,
  value: unknown,
): ContentDocumentPayloadMap[K] {
  const schema = contentDocumentSchemas[key];
  const result = schema.safeParse(value);

  if (result.success) {
    return result.data as ContentDocumentPayloadMap[K];
  }

  return structuredClone(defaultContentDocuments[key]) as ContentDocumentPayloadMap[K];
}

function setDocumentRecord<K extends ContentDocumentKey>(
  documents: ContentDocumentRecordMap,
  key: K,
  record: ContentDocumentRecord<K>,
) {
  documents[key] = record;
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

  async findAdminByEmail(_email: string): Promise<AdminUser | null> {
    return null;
  }

  async upsertAdminUser(_email: string, _passwordHash: string): Promise<AdminUser> {
    throw new Error("Admin storage requires DATABASE_URL");
  }

  async createAdminSession(_userId: number, _tokenHash: string, _expiresAt: Date): Promise<AdminSession> {
    throw new Error("Admin storage requires DATABASE_URL");
  }

  async getAdminSessionByTokenHash(_tokenHash: string): Promise<AdminSessionWithUser | null> {
    return null;
  }

  async deleteAdminSessionByTokenHash(_tokenHash: string): Promise<void> {
    return;
  }

  async deleteExpiredAdminSessions(_now: Date): Promise<void> {
    return;
  }

  async getAdminContentDocuments(): Promise<ContentDocumentRecordMap> {
    return buildDefaultDocumentRecords();
  }

  async updateContentDocument<K extends ContentDocumentKey>(
    _key: K,
    _payload: ContentDocumentPayloadMap[K],
    _userId: number,
  ): Promise<StoredDocumentRecord<K>> {
    throw new Error("Admin storage requires DATABASE_URL");
  }

  async getAdminMenuDocument(): Promise<{ menu: AdminMenuDocument; updatedAt: string | null }> {
    return {
      menu: structuredClone(defaultMenuDocument),
      updatedAt: null,
    };
  }

  async replaceAdminMenu(
    _menu: AdminMenuDocument,
    _userId: number,
  ): Promise<{ menu: AdminMenuDocument; updatedAt: string }> {
    throw new Error("Admin storage requires DATABASE_URL");
  }

  async getPublicContentBootstrap(): Promise<PublicContentBootstrap> {
    return buildDefaultPublicContentBootstrap();
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

  async findAdminByEmail(email: string) {
    const [user] = await this.database
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    return user ?? null;
  }

  async upsertAdminUser(email: string, passwordHash: string) {
    const now = new Date();
    const [user] = await this.database
      .insert(adminUsers)
      .values({
        email,
        passwordHash,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: adminUsers.email,
        set: {
          passwordHash,
          updatedAt: now,
        },
      })
      .returning();

    return user;
  }

  async createAdminSession(userId: number, tokenHash: string, expiresAt: Date) {
    const [session] = await this.database
      .insert(adminSessions)
      .values({
        userId,
        tokenHash,
        expiresAt,
        createdAt: new Date(),
      })
      .returning();

    return session;
  }

  async getAdminSessionByTokenHash(tokenHash: string) {
    const [record] = await this.database
      .select({
        session: adminSessions,
        user: adminUsers,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
      .where(eq(adminSessions.tokenHash, tokenHash))
      .limit(1);

    if (!record) {
      return null;
    }

    return record;
  }

  async deleteAdminSessionByTokenHash(tokenHash: string) {
    await this.database.delete(adminSessions).where(eq(adminSessions.tokenHash, tokenHash));
  }

  async deleteExpiredAdminSessions(now: Date) {
    await this.database.delete(adminSessions).where(lt(adminSessions.expiresAt, now));
  }

  async getAdminContentDocuments(): Promise<ContentDocumentRecordMap> {
    const documents = buildDefaultDocumentRecords();
    const rows = await this.database.select().from(contentDocuments);

    for (const row of rows) {
      const keyResult = contentDocumentKeySchema.safeParse(row.key);

      if (!keyResult.success) {
        continue;
      }

      const key = keyResult.data;
      const record = {
        payload: parseDocumentPayload(key, row.payload),
        updatedAt: toIsoString(row.updatedAt),
      } as StoredDocumentRecord<typeof key>;

      setDocumentRecord(documents, key, record);
    }

    return documents;
  }

  async updateContentDocument<K extends ContentDocumentKey>(
    key: K,
    payload: ContentDocumentPayloadMap[K],
    userId: number,
  ) {
    const now = new Date();
    const [record] = await this.database
      .insert(contentDocuments)
      .values({
        key,
        payload,
        updatedByUserId: userId,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: contentDocuments.key,
        set: {
          payload,
          updatedByUserId: userId,
          updatedAt: now,
        },
      })
      .returning();

    return {
      payload: parseDocumentPayload(key, record.payload),
      updatedAt: toIsoString(record.updatedAt),
    } as StoredDocumentRecord<K>;
  }

  private async loadMenuCategoriesWithItems() {
    const categories = await this.database
      .select()
      .from(menuCategories)
      .orderBy(asc(menuCategories.sortOrder), asc(menuCategories.id));

    if (categories.length === 0) {
      return structuredClone(defaultMenuDocument.categories);
    }

    const items = await this.database
      .select()
      .from(menuItems)
      .orderBy(asc(menuItems.sortOrder), asc(menuItems.id));

    return categories.map((category) => ({
      id: String(category.id),
      title: category.title,
      visible: category.visible,
      items: items
        .filter((item) => item.categoryId === category.id)
        .map((item) => ({
          id: String(item.id),
          name: item.name,
          description: item.description,
          priceLabel: item.priceLabel,
          badgeCodes: item.badgeCodes,
          visible: item.visible,
        })),
    }));
  }

  async getAdminMenuDocument() {
    const documents = await this.getAdminContentDocuments();
    const categories = await this.loadMenuCategoriesWithItems();

    return {
      menu: buildMenuDocument(documents["menu-page"].payload, categories),
      updatedAt: documents["menu-page"].updatedAt,
    };
  }

  async replaceAdminMenu(menu: AdminMenuDocument, userId: number) {
    const now = new Date();

    await this.database.transaction(async (tx) => {
      await tx
        .insert(contentDocuments)
        .values({
          key: "menu-page",
          payload: menu.page,
          updatedByUserId: userId,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: contentDocuments.key,
          set: {
            payload: menu.page,
            updatedByUserId: userId,
            updatedAt: now,
          },
        });

      await tx.delete(menuCategories);

      const usedSlugs = new Set<string>();

      for (let categoryIndex = 0; categoryIndex < menu.categories.length; categoryIndex += 1) {
        const category = menu.categories[categoryIndex];
        const [createdCategory] = await tx
          .insert(menuCategories)
          .values({
            slug: createUniqueSlug(category.title, usedSlugs),
            title: category.title,
            visible: category.visible,
            sortOrder: categoryIndex,
            createdAt: now,
            updatedAt: now,
          })
          .returning();

        if (category.items.length === 0) {
          continue;
        }

        await tx.insert(menuItems).values(
          category.items.map((item: AdminMenuDocument["categories"][number]["items"][number], itemIndex: number) => ({
            categoryId: createdCategory.id,
            name: item.name,
            description: item.description,
            priceLabel: item.priceLabel,
            badgeCodes: item.badgeCodes,
            visible: item.visible,
            sortOrder: itemIndex,
            createdAt: now,
            updatedAt: now,
          })),
        );
      }
    });

    return {
      menu: (await this.getAdminMenuDocument()).menu,
      updatedAt: now.toISOString(),
    };
  }

  async getPublicContentBootstrap() {
    const documents = await this.getAdminContentDocuments();
    const menu = await this.getAdminMenuDocument();

    return {
      siteSettings: documents["site-settings"].payload,
      homePage: documents["home-page"].payload,
      aboutPage: documents["about-page"].payload,
      locationPage: documents["location-page"].payload,
      galleryPage: documents["gallery-page"].payload,
      contactPage: documents["contact-page"].payload,
      footerContent: documents["footer-content"].payload,
      privacyPage: documents["privacy-page"].payload,
      menu: {
        page: documents["menu-page"].payload,
        categories: menu.menu.categories,
      },
    };
  }
}

export const storageMode = db ? "database" : "memory";
export const storage: IStorage = db ? new DatabaseStorage(db) : new MemoryStorage();
