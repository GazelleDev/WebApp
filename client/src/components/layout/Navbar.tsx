import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePublicContent } from "@/hooks/use-public-content";
import {
  motionEase,
  quickTransition,
  softSpring,
  tightStaggerContainer,
  overlayCardVariant,
} from "@/components/ui/PageTransition";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/location", label: "Location" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

const mobileBackdropVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  },
} as const;

const mobilePanelVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.44,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.996,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
} as const;

export function Navbar() {
  const { data } = usePublicContent();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOverlay = location === "/" && !isScrolled && !mobileMenuOpen;
  const storeName = data?.siteSettings.storeName ?? "Gazelle";
  const statusLabel = data?.siteSettings.navbarStatusLabel ?? "In Development";

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
          animate={{
            scale: isScrolled ? 0.985 : 1,
            y: isScrolled ? -2 : 0,
          }}
          transition={quickTransition}
          className="mx-auto max-w-7xl"
        >
          <div
            className={cn(
              "rounded-[1.75rem] border px-4 py-2.5 shadow-[0_18px_60px_rgba(36,35,39,0.16)] backdrop-blur-xl transition-all duration-500 sm:px-5 lg:px-6",
              isOverlay
                ? "border-white/15 bg-[#242327]/22 text-white"
                : "border-border/70 bg-background/88 text-foreground",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="group flex min-w-0 items-center">
                <span className="min-w-0 truncate font-brand text-[1.7rem] leading-none text-[#C0987E]">
                  {storeName}.
                </span>
              </Link>

              <nav
                className={cn(
                  "hidden lg:flex items-center gap-1 rounded-full border p-1",
                  isOverlay
                    ? "border-white/16 bg-[#242327]/42 shadow-[0_12px_30px_rgba(36,35,39,0.18)]"
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
                            ? "text-[#9F7965] hover:text-[#242327]"
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
                              : "bg-background shadow-[inset_0_0_0_1px_rgba(36,35,39,0.05),0_8px_24px_rgba(36,35,39,0.08)]",
                          )}
                          transition={softSpring}
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
                      ? "border-[#9F7965]/35 bg-[#f4ece6]/55 text-[#242327]"
                      : "border-border/70 bg-card/75 text-muted-foreground",
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {statusLabel}
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

      <AnimatePresence initial={false} mode="wait">
        {mobileMenuOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileBackdropVariant}
              className="fixed inset-0 z-30 bg-background/72 backdrop-blur-md sm:z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobilePanelVariant}
              className="fixed inset-0 z-40 overflow-hidden bg-background/96 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)] backdrop-blur-xl sm:inset-x-6 sm:bottom-4 sm:top-24 sm:z-50 sm:rounded-[2rem] sm:border sm:border-border/70 sm:bg-background/95 sm:p-6 sm:shadow-[0_32px_80px_rgba(36,35,39,0.24)] sm:backdrop-blur-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="mb-5 shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                    Gazelle Preview
                  </p>
                  <h2 className="mt-3 text-[2.65rem] font-display leading-[0.92] tracking-[-0.03em]">
                    Browse Gazelle.
                  </h2>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Move through the site sections from one clean mobile menu.
                  </p>
                </div>

                <motion.nav
                  variants={tightStaggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1"
                >
                  {links.map((link, index) => {
                    const isActive = location === link.href;

                    return (
                      <motion.div key={link.href} variants={overlayCardVariant}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-[1.35rem] border px-4 py-2.5 transition-colors",
                            isActive
                              ? "border-accent/30 bg-accent/10 text-foreground"
                              : "border-border/60 bg-card/50 text-foreground hover:border-accent/30 hover:text-accent",
                          )}
                        >
                          <div className="min-w-0">
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-accent/20 bg-background px-1.5 text-[10px] uppercase tracking-[0.2em] text-accent/80">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[1.45rem] font-medium leading-none tracking-[-0.02em]">
                                {link.label}
                              </span>
                            </span>
                          </div>
                          <span
                            className={cn(
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                              isActive
                                ? "border-accent/30 bg-background text-foreground"
                                : "border-border/60 bg-background/80 text-muted-foreground",
                            )}
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <motion.div
                  variants={overlayCardVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.16,
                    duration: 0.58,
                    ease: motionEase,
                  }}
                  className="mt-3 shrink-0 rounded-[1.5rem] border border-border/70 bg-card/70 p-3.5"
                >
                  <p className="text-[9px] uppercase tracking-[0.26em] text-accent">
                    Currently
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {statusLabel}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
                    >
                      Contact
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
