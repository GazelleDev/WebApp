import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (data: typeof api.newsletter.create.input._type) => {
      const res = await fetch(api.newsletter.create.path, {
        method: api.newsletter.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(json.message || "Validation failed");
        }
        throw new Error("Failed to subscribe");
      }
      
      return api.newsletter.create.responses[201].parse(json);
    },
  });
}
