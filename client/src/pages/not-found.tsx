import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";

export default function NotFound() {
  return (
    <PageTransition className="min-h-dvh bg-background px-6 pb-24 pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="mx-auto flex max-w-2xl flex-col items-start gap-8 rounded-[2rem] border border-border/70 bg-card p-10 shadow-sm"
      >
        <div className="flex items-center gap-3 text-accent">
          <AlertCircle className="h-7 w-7" />
          <span className="text-sm tracking-[0.24em] uppercase">Page Not Found</span>
        </div>
        <div>
          <h1 className="mb-4 text-4xl md:text-5xl font-display">This page isn&apos;t part of the Gazelle site.</h1>
          <p className="max-w-xl text-lg text-muted-foreground font-light leading-relaxed">
            The route you opened does not exist in the current build. Use the main navigation or return to the homepage.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center rounded-sm bg-foreground px-6 py-3 text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/90"
        >
          Return Home
        </Link>
      </motion.div>
    </PageTransition>
  );
}
