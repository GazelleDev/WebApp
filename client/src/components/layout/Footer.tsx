import { Link } from "wouter";
import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/use-newsletter";
import { useToast } from "@/hooks/use-toast";
import { usePublicContent } from "@/hooks/use-public-content";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSubscribeNewsletter();
  const { toast } = useToast();
  const { data } = usePublicContent();
  const siteSettings = data?.siteSettings;
  const footer = data?.footerContent;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate({ email }, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Welcome to the Gazelle inner circle.",
        });
        setEmail("");
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message,
        });
      }
    });
  };

  return (
    <footer className="mt-auto px-4 pb-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem] overflow-hidden rounded-[2.5rem] border border-[#9F7965]/40 bg-[#242327] text-[#f4ece6] shadow-[0_32px_90px_rgba(36,35,39,0.28)]">
        <div className="relative px-6 py-9 md:px-10 md:py-10 lg:px-12 lg:py-[2.9rem]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#9F7965]/18 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C0987E]/10 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-7">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[#C0987E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                {footer?.eyebrow ?? "Brand Preview"}
              </div>

              <h2 className="mt-4 font-brand text-5xl leading-none text-[#C0987E] md:text-6xl">
                {siteSettings?.storeName ?? "Gazelle"}.
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#eaded6] md:text-lg">
                {footer?.brandDescription ?? "Quiet luxury. Bold coffee. A warm, architectural brand world still being refined before launch."}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${siteSettings?.generalEmail ?? "hello@gazellecoffee.com"}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4ece6] transition-colors hover:border-[#C0987E]/40 hover:text-[#C0987E]"
                >
                  {siteSettings?.generalEmail ?? "hello@gazellecoffee.com"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C0987E] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#242327] transition-colors hover:bg-[#9F7965] hover:text-[#f4ece6]"
                >
                  {footer?.contactCtaLabel ?? "Contact Page"}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-[#C0987E]">
                  {footer?.exploreHeading ?? "Explore"}
                </h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm text-[#f4ece6]/82">
                  <li><Link href="/menu" className="transition-colors hover:text-[#C0987E]">Menu</Link></li>
                  <li><Link href="/about" className="transition-colors hover:text-[#C0987E]">About</Link></li>
                  <li><Link href="/gallery" className="transition-colors hover:text-[#C0987E]">Gallery</Link></li>
                  <li><Link href="/location" className="transition-colors hover:text-[#C0987E]">Location</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-[#C0987E]">
                  {footer?.infoHeading ?? "Info"}
                </h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm text-[#f4ece6]/82">
                  <li><Link href="/contact" className="transition-colors hover:text-[#C0987E]">Contact</Link></li>
                  <li><Link href="/privacy" className="transition-colors hover:text-[#C0987E]">Privacy</Link></li>
                  <li><span className="text-[#f4ece6]/58">{footer?.flagshipInfoLabel ?? "Flagship details coming soon"}</span></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm md:p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                  {footer?.newsletterEyebrow ?? "The Dispatch"}
                </p>
                <h3 className="mt-3 text-[1.6rem] font-display leading-none text-[#f4ece6]">
                  {footer?.newsletterTitle ?? "Stay close to the launch."}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#eaded6]">
                  {footer?.newsletterDescription ?? "Subscribe for opening updates, seasonal menu notes, and future tasting invitations."}
                </p>

                <form onSubmit={handleSubscribe} className="mt-4">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#f4ece6] px-2 py-2">
                    <input
                      type="email"
                      placeholder={footer?.newsletterPlaceholder ?? "Email address"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#242327] placeholder:text-[#9F7965] focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#242327] text-[#C0987E] transition-colors hover:bg-[#9F7965] hover:text-[#f4ece6] disabled:opacity-50"
                      aria-label="Subscribe to newsletter"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#9F7965]">
                  {footer?.newsletterDisclaimer ?? "No spam. Just meaningful updates."}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-4 border-t border-white/10 pt-4 text-sm text-[#d5c1b4] md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {siteSettings?.storeName ?? "Gazelle"} Coffee. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <span>{footer?.legalStatusLabel ?? "Design phase in progress"}</span>
              <Link href="/privacy" className="transition-colors hover:text-[#C0987E]">
                Privacy Policy
              </Link>
              <Link href="/contact" className="transition-colors hover:text-[#C0987E]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
