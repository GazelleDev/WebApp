import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import { useAdminLogin, useAdminSession } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import {
  AdminField,
  AdminInput,
  AdminPageShell,
  AdminPrimaryButton,
  AdminSectionCard,
} from "@/components/admin/fields";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const sessionQuery = useAdminSession();
  const loginMutation = useAdminLogin();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (sessionQuery.data?.authenticated) {
      navigate("/admin");
    }
  }, [navigate, sessionQuery.data?.authenticated]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    loginMutation.mutate(form, {
      onSuccess: () => {
        navigate("/admin");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Sign-in failed",
          description: error.message,
        });
      },
    });
  };

  return (
    <AdminPageShell>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl"
        >
          <AdminSectionCard
            title="Gazelle Admin"
            description="Sign in to update site content, business details, and the menu without touching code."
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/25 bg-[#C0987E]/12 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#9F7965]">
              <LockKeyhole className="h-3.5 w-3.5" />
              Owner access
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AdminField label="Email">
                <AdminInput
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="owner@gazellecoffee.com"
                  required
                />
              </AdminField>

              <AdminField label="Password">
                <AdminInput
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </AdminField>

              {sessionQuery.error ? (
                <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {sessionQuery.error.message}
                </p>
              ) : null}

              <AdminPrimaryButton
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </AdminPrimaryButton>
            </form>
          </AdminSectionCard>
        </motion.div>
      </div>
    </AdminPageShell>
  );
}
