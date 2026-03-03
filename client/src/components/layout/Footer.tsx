import { Link } from "wouter";
import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/use-newsletter";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSubscribeNewsletter();
  const { toast } = useToast();

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
      <div className="mx-auto max-w-[92rem] overflow-hidden rounded-[2.5rem] border border-[#3d3028] bg-[#1f1713] text-[#f6ede4] shadow-[0_32px_90px_rgba(34,20,10,0.24)]">
        <div className="relative px-6 py-9 md:px-10 md:py-10 lg:px-12 lg:py-[2.9rem]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#7d573d]/18 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#e6c2a1]/10 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-7">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[#d8c0b0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6C2A1]" />
                Brand Preview
              </div>

              <h2 className="mt-4 font-brand text-5xl leading-none text-[#E6C2A1] md:text-6xl">
                Gazelle.
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#dbcabd] md:text-lg">
                Quiet luxury. Bold coffee. A warm, architectural brand world still being refined before launch.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:hello@gazellecoffee.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f6ede4] transition-colors hover:border-[#E6C2A1]/40 hover:text-[#E6C2A1]"
                >
                  hello@gazellecoffee.com
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E6C2A1] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#201713] transition-colors hover:bg-[#edd0b5]"
                >
                  Contact Page
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3">
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-[#d8c0b0]">
                  Explore
                </h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm text-[#f6ede4]/82">
                  <li><Link href="/menu" className="transition-colors hover:text-[#E6C2A1]">Menu</Link></li>
                  <li><Link href="/about" className="transition-colors hover:text-[#E6C2A1]">About</Link></li>
                  <li><Link href="/gallery" className="transition-colors hover:text-[#E6C2A1]">Gallery</Link></li>
                  <li><Link href="/location" className="transition-colors hover:text-[#E6C2A1]">Location</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-[#d8c0b0]">
                  Info
                </h3>
                <ul className="mt-5 flex flex-col gap-3 text-sm text-[#f6ede4]/82">
                  <li><Link href="/contact" className="transition-colors hover:text-[#E6C2A1]">Contact</Link></li>
                  <li><Link href="/privacy" className="transition-colors hover:text-[#E6C2A1]">Privacy</Link></li>
                  <li><span className="text-[#f6ede4]/58">Flagship details coming soon</span></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm md:p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#d8c0b0]">
                  The Dispatch
                </p>
                <h3 className="mt-3 text-[1.6rem] font-display leading-none text-[#f6ede4]">
                  Stay close to the launch.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#dbcabd]">
                  Subscribe for opening updates, seasonal menu notes, and future tasting invitations.
                </p>

                <form onSubmit={handleSubscribe} className="mt-4">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#f6ede4] px-2 py-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#201713] placeholder:text-[#7a6457] focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#201713] text-[#E6C2A1] transition-colors hover:bg-[#2b211d] disabled:opacity-50"
                      aria-label="Subscribe to newsletter"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#bca696]">
                  No spam. Just meaningful updates.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-4 border-t border-white/10 pt-4 text-sm text-[#c5b1a3] md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Gazelle Coffee. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <span>Design phase in progress</span>
              <Link href="/privacy" className="transition-colors hover:text-[#E6C2A1]">
                Privacy Policy
              </Link>
              <Link href="/contact" className="transition-colors hover:text-[#E6C2A1]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
