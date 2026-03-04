import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import {
  adminContentDocumentsResponseSchema,
  adminLoginRequestSchema,
  adminMenuDocumentResponseSchema,
  adminMenuDocumentSchema,
  adminSessionResponseSchema,
  contentDocumentKeySchema,
  contentDocumentSchemas,
  documentUpdateRequestSchema,
  type AdminContentDocumentsResponse,
  type AdminLoginRequest,
  type AdminMenuDocument,
  type ContentDocumentKey,
  type ContentDocumentPayloadMap,
} from "@shared/content";
import { publicContentQueryKey } from "./use-public-content";

export const adminSessionQueryKey = ["admin-session"] as const;
export const adminContentQueryKey = ["admin-content"] as const;
export const adminMenuQueryKey = ["admin-menu"] as const;

async function parseJsonResponse(res: Response) {
  return res.json().catch(() => null);
}

export function useAdminSession() {
  return useQuery({
    queryKey: adminSessionQueryKey,
    queryFn: async () => {
      const res = await fetch(api.admin.auth.session.path, {
        method: api.admin.auth.session.method,
        credentials: "include",
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        if (res.status === 401) {
          return adminSessionResponseSchema.parse({
            authenticated: false,
            user: null,
          });
        }

        throw new Error(json?.message || "Failed to load admin session");
      }

      return adminSessionResponseSchema.parse(json);
    },
  });
}

export function useAdminLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AdminLoginRequest) => {
      const parsedInput = adminLoginRequestSchema.parse(input);
      const res = await fetch(api.admin.auth.login.path, {
        method: api.admin.auth.login.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsedInput),
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to sign in");
      }

      return adminSessionResponseSchema.parse(json);
    },
    onSuccess: (session) => {
      queryClient.setQueryData(adminSessionQueryKey, session);
    },
  });
}

export function useAdminLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.admin.auth.logout.path, {
        method: api.admin.auth.logout.method,
        credentials: "include",
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to sign out");
      }

      return json;
    },
    onSuccess: () => {
      queryClient.setQueryData(adminSessionQueryKey, {
        authenticated: false,
        user: null,
      });
    },
  });
}

export function useAdminContentDocuments() {
  return useQuery({
    queryKey: adminContentQueryKey,
    queryFn: async () => {
      const res = await fetch(api.admin.content.list.path, {
        method: api.admin.content.list.method,
        credentials: "include",
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to load admin content");
      }

      return adminContentDocumentsResponseSchema.parse(json);
    },
  });
}

export function useUpdateAdminContentDocument<K extends ContentDocumentKey>(key: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ContentDocumentPayloadMap[K]) => {
      const parsedKey = contentDocumentKeySchema.parse(key);
      const parsedPayload = contentDocumentSchemas[parsedKey].parse(payload);
      const res = await fetch(buildUrl(api.admin.content.update.path, { key: parsedKey }), {
        method: api.admin.content.update.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          documentUpdateRequestSchema.parse({
            payload: parsedPayload,
          }),
        ),
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to save content");
      }

      return json as { success: true; updatedAt: string };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminContentQueryKey });
      void queryClient.invalidateQueries({ queryKey: publicContentQueryKey });
    },
  });
}

export function useAdminMenuDocument() {
  return useQuery({
    queryKey: adminMenuQueryKey,
    queryFn: async () => {
      const res = await fetch(api.admin.menu.get.path, {
        method: api.admin.menu.get.method,
        credentials: "include",
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to load menu editor data");
      }

      return adminMenuDocumentResponseSchema.parse(json);
    },
  });
}

export function useUpdateAdminMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (menu: AdminMenuDocument) => {
      const parsedMenu = adminMenuDocumentSchema.parse(menu);
      const res = await fetch(api.admin.menu.update.path, {
        method: api.admin.menu.update.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(parsedMenu),
      });

      const json = await parseJsonResponse(res);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to save menu");
      }

      return json as { success: true; updatedAt: string };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminMenuQueryKey });
      void queryClient.invalidateQueries({ queryKey: adminContentQueryKey });
      void queryClient.invalidateQueries({ queryKey: publicContentQueryKey });
    },
  });
}

export type AdminDocuments = AdminContentDocumentsResponse["documents"];
