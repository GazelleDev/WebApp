import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AdminPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f0ea] text-[#242327]">
      <div className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export function AdminSectionCard({
  id,
  title,
  description,
  actions,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-[2rem] border border-[#9F7965]/20 bg-white/85 p-6 shadow-[0_18px_50px_rgba(36,35,39,0.08)] sm:p-7"
    >
      <div className="mb-6 flex flex-col gap-4 border-b border-[#9F7965]/12 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#242327]">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6e5e55]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export function AdminGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#9F7965]">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-[#7c6d64]">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-[1rem] border border-[#d9c4b5] bg-[#fcf8f5] px-4 py-3 text-sm text-[#242327] outline-none transition-colors placeholder:text-[#9F7965]/75 focus:border-[#9F7965]",
        props.className,
      )}
    />
  );
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[8rem] w-full rounded-[1rem] border border-[#d9c4b5] bg-[#fcf8f5] px-4 py-3 text-sm leading-relaxed text-[#242327] outline-none transition-colors placeholder:text-[#9F7965]/75 focus:border-[#9F7965]",
        props.className,
      )}
    />
  );
}

export function AdminToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
        checked
          ? "border-[#9F7965] bg-[#C0987E] text-[#242327]"
          : "border-[#d9c4b5] bg-white text-[#6e5e55]",
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors",
          checked ? "bg-[#242327]" : "bg-[#d9c4b5]",
        )}
      />
      {label}
    </button>
  );
}

export function AdminPrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#242327] px-5 py-3 text-sm font-medium text-[#f4ece6] transition-colors hover:bg-[#9F7965] disabled:cursor-not-allowed disabled:opacity-50",
        props.className,
      )}
    />
  );
}

export function AdminSecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[#d9c4b5] bg-white px-4 py-2.5 text-sm font-medium text-[#242327] transition-colors hover:border-[#9F7965] hover:text-[#9F7965] disabled:cursor-not-allowed disabled:opacity-50",
        props.className,
      )}
    />
  );
}

export function AdminStatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "dirty" | "saved";
}) {
  const toneClass =
    tone === "dirty"
      ? "border-[#C0987E]/60 bg-[#C0987E]/18 text-[#9F7965]"
      : tone === "saved"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-[#d9c4b5] bg-white text-[#6e5e55]";

  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", toneClass)}>
      {children}
    </span>
  );
}

export function AdminSubCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-[#ead9cf] bg-[#fcf8f5] p-4 shadow-[0_8px_24px_rgba(36,35,39,0.04)]">
      {children}
    </div>
  );
}
