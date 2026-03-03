import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { CreateContactMessageRequest } from "@shared/schema";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data: CreateContactMessageRequest) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      const json = await res.json().catch(() => null);
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(json?.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      return api.contact.create.responses[201].parse(json);
    },
  });
}
