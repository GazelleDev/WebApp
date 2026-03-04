import { z } from 'zod';
import { insertContactMessageSchema, insertNewsletterSubscriberSchema } from './schema';
import {
  adminContentDocumentsResponseSchema,
  adminLoginRequestSchema,
  adminMenuDocumentResponseSchema,
  adminMenuDocumentSchema,
  adminSessionResponseSchema,
  contentDocumentKeySchema,
  documentUpdateRequestSchema,
  publicContentBootstrapSchema,
} from './content';

const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  health: {
    get: {
      method: 'GET' as const,
      path: '/api/health' as const,
      responses: {
        200: z.object({
          status: z.literal('ok'),
          storageMode: z.enum(['memory', 'database']),
          adminEnabled: z.boolean(),
        }),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: successResponseSchema,
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  newsletter: {
    create: {
      method: 'POST' as const,
      path: '/api/newsletter' as const,
      input: insertNewsletterSubscriberSchema,
      responses: {
        200: successResponseSchema,
        201: successResponseSchema,
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  publicContent: {
    get: {
      method: 'GET' as const,
      path: '/api/content/public' as const,
      responses: {
        200: publicContentBootstrapSchema,
        500: errorSchemas.internal,
      },
    },
  },
  admin: {
    auth: {
      session: {
        method: 'GET' as const,
        path: '/api/admin/auth/session' as const,
        responses: {
          200: adminSessionResponseSchema,
          401: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
      login: {
        method: 'POST' as const,
        path: '/api/admin/auth/login' as const,
        input: adminLoginRequestSchema,
        responses: {
          200: adminSessionResponseSchema,
          400: errorSchemas.validation,
          401: errorSchemas.internal,
          429: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
      logout: {
        method: 'POST' as const,
        path: '/api/admin/auth/logout' as const,
        responses: {
          200: successResponseSchema,
          503: errorSchemas.internal,
        },
      },
    },
    content: {
      list: {
        method: 'GET' as const,
        path: '/api/admin/content' as const,
        responses: {
          200: adminContentDocumentsResponseSchema,
          401: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/admin/content/:key' as const,
        params: z.object({
          key: contentDocumentKeySchema,
        }),
        input: documentUpdateRequestSchema,
        responses: {
          200: z.object({
            success: z.literal(true),
            updatedAt: z.string(),
          }),
          400: errorSchemas.validation,
          401: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
    },
    menu: {
      get: {
        method: 'GET' as const,
        path: '/api/admin/menu' as const,
        responses: {
          200: adminMenuDocumentResponseSchema,
          401: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/admin/menu' as const,
        input: adminMenuDocumentSchema,
        responses: {
          200: z.object({
            success: z.literal(true),
            updatedAt: z.string(),
          }),
          400: errorSchemas.validation,
          401: errorSchemas.internal,
          503: errorSchemas.internal,
        },
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
