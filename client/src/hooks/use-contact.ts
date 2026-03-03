import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data: typeof api.contact.create.input._type) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(json.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      return api.contact.create.responses[201].parse(json);
    },
  });
}
