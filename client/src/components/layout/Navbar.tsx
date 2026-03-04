import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePublicContent } from "@/hooks/use-public-content";
import {
  modalBackdropVariant,
  modalPanelVariant,
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

export function Navbar() {
  const { data } = usePublicContent();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOverlay = location === "/" && !isScrolled && !mobileMenuOpen;
  const storeName = data?.siteSettings.storeName ?? "Gazelle";
  const statusLabel = data?.siteSettings.navbarStatusLabel ?? "In Development";

  // === FIX: replace shared layoutId pill with a single measured indicator ===
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const measureIndicator = () => {
    const navEl = navRef.current;
    const activeEl = itemRefs.current[location];

    if (!navEl || !activeEl) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = navEl.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setIndicator({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  };
  // === END FIX ===

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

  // === FIX: keep indicator correct on route change + scroll/resize ===
  useLayoutEffect(() => {
    requestAnimationFrame(measureIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const onResize = () => measureIndicator();
    const onScroll = () => measureIndicator();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // === END FIX ===

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
                  {/* === FIX: stable measurement root + single indicator === */}
                  <div ref={navRef} className="relative flex items-center gap-1">
                    <motion.span
                      initial={false}
                      animate={{
                        left: indicator.left,
                        width: indicator.width,
                        opacity: indicator.opacity,
                      }}
                      transition={softSpring}
                      className={cn(
                        "absolute top-0 bottom-0 rounded-full",
                        isOverlay
                          ? "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                          : "bg-background shadow-[inset_0_0_0_1px_rgba(36,35,39,0.05),0_8px_24px_rgba(36,35,39,0.08)]",
                      )}
                      style={{ pointerEvents: "none" }}
                    />

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
                          {/* Capture the anchor element for measurement without changing layout */}
                          <span
                            ref={(el) => {
                              itemRefs.current[link.href] = el?.parentElement as HTMLAnchorElement | null;
                              if (isActive) requestAnimationFrame(measureIndicator);
                            }}
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                  {/* === END FIX === */}
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
        </div>
      </header>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalBackdropVariant}
              className="fixed inset-0 z-40 bg-[#242327]/35 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalPanelVariant}
              className="fixed inset-x-4 top-24 z-50 rounded-[2rem] border border-border/70 bg-background/95 p-6 shadow-[0_32px_80px_rgba(36,35,39,0.24)] backdrop-blur-2xl sm:inset-x-6"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                    Gazelle Preview
                  </p>
                  <h2 className="mt-3 text-4xl font-display leading-none">Browse Gazelle.</h2>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground transition-colors hover:text-accent"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.nav
                variants={tightStaggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2"
              >
                {links.map((link) => (
                  <motion.div key={link.href} variants={overlayCardVariant}>
                    <Link
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
                  </motion.div>
                ))}
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
                className="mt-6 rounded-[1.5rem] border border-border/70 bg-card/70 p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Currently</p>
                <p className="mt-3 text-base font-medium text-foreground">
                  The site is in active design development.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We can keep refining the visual system, motion, and layout before the content gets
                  locked.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
                >
                  Contact Gazelle
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}