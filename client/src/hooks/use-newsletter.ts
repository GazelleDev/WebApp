import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { CreateNewsletterSubscriberRequest } from "@shared/schema";

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (data: CreateNewsletterSubscriberRequest) => {
      const res = await fetch(api.newsletter.create.path, {
        method: api.newsletter.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      const json = await res.json().catch(() => null);
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(json?.message || "Validation failed");
        }
        throw new Error("Failed to subscribe");
      }
      
      if (res.status === 200) {
        return api.newsletter.create.responses[200].parse(json);
      }

      return api.newsletter.create.responses[201].parse(json);
    },
  });
}
