import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import {
  buildDefaultPublicContentBootstrap,
  publicContentBootstrapSchema,
} from "@shared/content";

export const publicContentQueryKey = ["public-content"] as const;

export function usePublicContent() {
  return useQuery({
    queryKey: publicContentQueryKey,
    queryFn: async () => {
      const res = await fetch(api.publicContent.get.path, {
        method: api.publicContent.get.method,
        credentials: "include",
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message || "Failed to load site content");
      }

      return publicContentBootstrapSchema.parse(json);
    },
    initialData: buildDefaultPublicContentBootstrap(),
  });
}
