import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/location", label: "Location" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOverlay = location === "/" && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ scale: isScrolled ? 0.985 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl"
        >
          <div
            className={cn(
              "rounded-[1.75rem] border px-4 py-2.5 shadow-[0_18px_60px_rgba(40,26,12,0.16)] backdrop-blur-xl transition-all duration-500 sm:px-5 lg:px-6",
              isOverlay
                ? "border-white/15 bg-black/20 text-white"
                : "border-border/70 bg-background/88 text-foreground",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="group flex min-w-0 items-center">
                <span className="min-w-0 truncate font-brand text-[1.7rem] leading-none text-[#ab7e32]">
                  Gazelle.
                </span>
              </Link>

              <nav
                className={cn(
                  "hidden lg:flex items-center gap-1 rounded-full border p-1",
                  isOverlay
                    ? "border-white/12 bg-white/5"
                    : "border-border/70 bg-card/65",
                )}
              >
                {links.map((link) => {
                  const isActive = location === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors",
                        isActive
                          ? "text-foreground"
                          : isOverlay
                            ? "text-white/72 hover:text-white"
                            : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="desktop-nav-active"
                          className={cn(
                            "absolute inset-0 rounded-full",
                            isOverlay
                              ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                              : "bg-background shadow-[inset_0_0_0_1px_rgba(29,26,23,0.05),0_8px_24px_rgba(74,54,27,0.08)]",
                          )}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-3 xl:flex">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.24em]",
                    isOverlay
                      ? "border-white/15 bg-white/8 text-white/80"
                      : "border-border/70 bg-card/75 text-muted-foreground",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  In Development
                </div>

                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-all",
                    isOverlay
                      ? "bg-white text-foreground hover:bg-white/90"
                      : "bg-foreground text-background hover:bg-foreground/90",
                  )}
                >
                  Contact
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <button
                className={cn(
                  "inline-flex items-center gap-3 rounded-full border px-4 py-3 lg:hidden",
                  isOverlay
                    ? "border-white/15 bg-white/10 text-white"
                    : "border-border/70 bg-card/75 text-foreground",
                )}
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                <span className="text-[11px] uppercase tracking-[0.28em]">
                  {mobileMenuOpen ? "Close" : "Menu"}
                </span>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-24 z-50 rounded-[2rem] border border-border/70 bg-background/95 p-6 shadow-[0_32px_80px_rgba(36,22,8,0.24)] backdrop-blur-2xl sm:inset-x-6"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                    Gazelle Preview
                  </p>
                  <h2 className="mt-3 text-4xl font-display leading-none">
                    Browse Gazelle.
                  </h2>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground transition-colors hover:text-accent"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-[1.25rem] border px-5 py-4 transition-colors",
                      location === link.href
                        ? "border-accent/30 bg-accent/10 text-foreground"
                        : "border-border/60 bg-card/50 text-foreground hover:border-accent/30 hover:text-accent",
                    )}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.28em] text-accent/80">
                      Section
                    </span>
                    <span className="mt-2 block text-3xl font-display leading-none">
                      {link.label}
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">
                      {link.href === "/"
                        ? "Landing page and brand overview."
                        : link.href === "/menu"
                          ? "Offerings, categories, and pricing."
                          : link.href === "/location"
                            ? "Flagship status and opening context."
                            : link.href === "/about"
                              ? "Origins, philosophy, and intent."
                              : "Interior imagery and atmosphere."}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-card/70 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  Currently
                </p>
                <p className="mt-3 text-base font-medium text-foreground">
                  The site is in active design development.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We can keep refining the visual system, motion, and layout before the content gets locked.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
                >
                  Contact Gazelle
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
