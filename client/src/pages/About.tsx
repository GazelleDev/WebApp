import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import storyImgOne from "@assets/Screenshot_2026-03-02_at_12.08.31_PM_1772562150247.png";
import storyImgTwo from "@assets/Screenshot_2026-03-02_at_12.09.38_PM_1772562150247.png";

const principles = [
  {
    label: "01",
    title: "Quiet hospitality",
    desc: "Gazelle is being shaped around a slower emotional tempo. Service, sound, and pacing should feel composed rather than performative.",
  },
  {
    label: "02",
    title: "Architectural warmth",
    desc: "Curves, stone tones, softened edges, and material contrast are part of the identity, not a backdrop added after the fact.",
  },
  {
    label: "03",
    title: "Menu restraint",
    desc: "The menu is meant to feel focused and deliberate. Fewer things, done with clarity, gives the brand a stronger point of view.",
  },
];

const storyBlocks = [
  {
    title: "Brand before launch",
    desc: "Gazelle is still in development, so this page is not a founder myth or a completed company history. It is a clear statement of intent for what the brand is trying to become.",
  },
  {
    title: "Experience as one system",
    desc: "The room, the menu, the pacing, and the visual identity are being designed together. The goal is not to make separate things look coordinated, but to make them feel inseparable.",
  },
  {
    title: "Built for a certain mood",
    desc: "Warmth, restraint, and confidence are the qualities driving the project. Gazelle should feel memorable because it is considered, not because it is loud.",
  },
];

export default function About() {
  return (
    <PageTransition className="min-h-screen bg-background pb-24 pt-32">
      <div className="px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[3rem] border border-border/70 bg-card/82 p-8 shadow-[0_28px_80px_rgba(36,35,39,0.12)] sm:p-10 lg:min-h-[39rem] lg:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/45 to-transparent" />
              <div className="absolute -left-12 top-12 h-48 w-48 rounded-full bg-[#C0987E]/22 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#9F7965]/16 blur-3xl" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/35 bg-white/55 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                    Brand Intent
                  </div>

                  <h1 className="mt-8 max-w-3xl text-5xl font-display leading-[0.92] text-foreground md:text-7xl lg:text-[5.7rem]">
                    A brand being shaped
                    <br />
                    <span className="italic text-[#9F7965]">with restraint.</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                    Gazelle began as a desire to build a coffee experience that feels warmer, slower, and more architecturally composed than the usual cafe formula.
                  </p>

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    This is still a brand in development. What you see here is the philosophy, visual language, and emotional direction that will shape the final physical experience.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/gallery"
                      className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-colors hover:bg-foreground/90"
                    >
                      View Atmosphere
                    </Link>
                    <Link
                      href="/menu"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/60 bg-white/45 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors hover:border-[#9F7965] hover:text-[#9F7965]"
                    >
                      See Menu Direction
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-12 grid gap-3"
                >
                  {storyBlocks.map((block) => (
                    <motion.div
                      key={block.title}
                      variants={fadeUpVariant}
                      className="rounded-[1.6rem] border border-white/55 bg-white/45 px-5 py-5 backdrop-blur-sm"
                    >
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                        {block.title}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/86">
                        {block.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 lg:grid-rows-[1.05fr_0.95fr]"
            >
              <div className="relative min-h-[22rem] overflow-hidden rounded-[3rem] border border-[#9F7965]/40 bg-[#242327] p-4 shadow-[0_30px_90px_rgba(36,35,39,0.24)] sm:p-5">
                <img
                  src={storyImgOne}
                  alt="Gazelle interior seating preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.08),rgba(36,35,39,0.26)_44%,rgba(36,35,39,0.72)_100%)]" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#242327]/28 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                  Spatial Language
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-[2rem] border border-white/10 bg-[#242327]/30 p-6 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    Design Direction
                  </p>
                  <p className="mt-3 max-w-lg text-[1.9rem] font-display leading-[1.02] text-white md:text-[2.2rem]">
                    Gazelle is meant to feel intimate, composed, and quietly cinematic.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-[2.4rem] border border-[#9F7965]/35 bg-[#242327] p-4 shadow-[0_24px_70px_rgba(36,35,39,0.16)]"
                >
                  <img
                    src={storyImgTwo}
                    alt="Gazelle entry and architectural arches"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.18),rgba(36,35,39,0.58)_100%)]" />
                  <div className="relative flex h-full min-h-[18rem] items-end rounded-[1.8rem] border border-white/10 bg-[#242327]/18 p-5 backdrop-blur-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                        Entry Mood
                      </p>
                      <p className="mt-2 text-lg font-display text-white">
                        Soft thresholds, arches, and a calmer visual tempo.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-[2.4rem] border border-border/70 bg-card/70 p-7 shadow-[0_20px_60px_rgba(36,35,39,0.08)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                    Why It Exists
                  </p>
                  <h2 className="mt-4 text-[2.35rem] font-display leading-none text-foreground">
                    Not louder.
                    <br />
                    More deliberate.
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    Gazelle is being designed for people who want atmosphere, service, and menu choices to feel connected. The identity works only if those parts reinforce one another.
                  </p>
                  <div className="mt-8 rounded-[1.6rem] border border-white/45 bg-white/45 px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                      Current State
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/86">
                      A clear visual and experiential direction is in place. The goal now is refinement, not invention from scratch.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
              className="rounded-[2.75rem] border border-border/70 bg-background/92 p-7 shadow-[0_22px_60px_rgba(36,35,39,0.07)] sm:p-8 lg:p-10"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                What Guides It
              </p>
              <h2 className="mt-5 max-w-md text-4xl font-display leading-tight text-foreground md:text-5xl">
                Three principles shape the whole project.
              </h2>
              <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-muted-foreground">
                The visual identity is only useful if it helps define how Gazelle should feel. These principles are the filter for every design decision.
              </p>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
              >
                Talk to Gazelle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-5"
            >
              {principles.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUpVariant}
                  className={`rounded-[2.2rem] border p-6 shadow-[0_18px_44px_rgba(36,35,39,0.08)] ${
                    index === 1
                      ? "border-[#9F7965]/40 bg-[#242327] text-white"
                      : "border-border/70 bg-card/65 text-foreground"
                  }`}
                >
                  <div className="grid gap-5 md:grid-cols-[7rem_1fr] md:items-start">
                    <div>
                      <p className={`text-[10px] uppercase tracking-[0.32em] ${index === 1 ? "text-[#C0987E]" : "text-[#9F7965]"}`}>
                        {item.label}
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-[2rem] font-display leading-none ${index === 1 ? "text-white" : "text-foreground"}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${index === 1 ? "text-white/72" : "text-muted-foreground"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
