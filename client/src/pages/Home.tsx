import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import { ArrowRight } from "lucide-react";
import heroImg from "@assets/Screenshot_2026-03-02_at_12.00.23_PM_1772562150247.png";
import signature1 from "@assets/Screenshot_2026-03-02_at_12.07.46_PM_1772562150247.png";
import signature2 from "@assets/Screenshot_2026-03-02_at_12.10.04_PM_1772562150247.png";
import signature3 from "@assets/Screenshot_2026-03-02_at_12.05.40_PM_1772562150247.png";
import atmosphereImg from "@assets/Screenshot_2026-03-02_at_12.05.07_PM_1772562150247.png";

const signatureOfferings = [
  {
    title: "The Gazelle Espresso",
    desc: "A house ritual built around dark chocolate depth, wild berry lift, and a polished finish.",
    tag: "House Ritual",
    img: signature1,
  },
  {
    title: "Ceremonial Matcha",
    desc: "First-harvest leaves from Uji, whisked with restraint and served with a softer, more architectural mood.",
    tag: "Quiet Intensity",
    img: signature2,
  },
  {
    title: "Laminated Pastries",
    desc: "Butter-forward, deeply fragrant, and designed to feel as considered as the room around them.",
    tag: "Morning Finish",
    img: signature3,
  },
];

const studioSignals = [
  { label: "Current Phase", value: "Brand Preview" },
  { label: "Menu Focus", value: "Espresso, Matcha, Pastry" },
  { label: "Opening Mode", value: "Flagship in Development" },
];

const atmosphereTraits = [
  {
    title: "Architectural calm",
    desc: "Arches, stone tones, and softened edges create a room that feels composed before a single cup is poured.",
  },
  {
    title: "Slow service energy",
    desc: "The experience is meant to feel intentional, not rushed. The pace is part of the identity.",
  },
  {
    title: "Warm material palette",
    desc: "Cream, brass, walnut, and shadow create the contrast that gives Gazelle its tone.",
  },
];

export default function Home() {
  return (
    <PageTransition className="bg-background">
      <section className="px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto grid max-w-[92rem] gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.75rem] border border-border/70 bg-[#efe2d3] p-8 shadow-[0_28px_80px_rgba(68,45,21,0.12)] sm:p-10 lg:p-12"
          >
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/45 to-transparent" />
            <div className="absolute -left-12 top-14 h-44 w-44 rounded-full bg-[#e6c2a1]/35 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#c99d76]/18 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b69073]/35 bg-white/55 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#7e5e4b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b98259]" />
                Gazelle Brand World
              </div>

              <h1 className="mt-8 max-w-3xl text-5xl font-display leading-[0.92] text-[#201713] md:text-7xl lg:text-[5.75rem]">
                A quieter kind
                <br />
                <span className="italic text-[#8d6447]">of coffee luxury.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#5e4a3d] md:text-xl">
                Gazelle is a hospitality concept shaped around warmth, restraint, and a strong visual identity. The space, menu, and mood are being designed as one continuous experience.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-full bg-[#201713] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f6ede4] transition-colors hover:bg-[#2b211d]"
                >
                  Explore Menu
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c7a88d]/70 bg-white/45 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#3a2b23] transition-colors hover:border-[#b98259] hover:text-[#8d6447]"
                >
                  Read the Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-12 grid gap-3 md:grid-cols-3">
                {studioSignals.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/50 bg-white/45 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8d6e5b]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#241914]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[580px] overflow-hidden rounded-[2.75rem] border border-[#3d3028] bg-[#1f1713] p-4 shadow-[0_32px_90px_rgba(34,20,10,0.24)] sm:p-5"
          >
            <img
              src={heroImg}
              alt="Gazelle flagship interior preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,0.16),rgba(12,8,6,0.32)_48%,rgba(12,8,6,0.7)_100%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="ml-auto max-w-[16rem] rounded-[2rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md"
              >
                <div className="overflow-hidden rounded-[1.4rem]">
                  <img
                    src={signature2}
                    alt="Ceremonial matcha service"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/55">
                  Featured Ritual
                </p>
                <p className="mt-2 text-lg font-display text-white">
                  Matcha, plated with quiet drama.
                </p>
              </motion.div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="rounded-[2rem] border border-white/10 bg-black/24 p-5 backdrop-blur-md"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    Interior Direction
                  </p>
                  <p className="mt-3 max-w-sm text-2xl font-display leading-tight text-white">
                    Curves, stone tones, and softened light shape the entire mood.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="rounded-[2rem] border border-white/10 bg-[#f1dfcf] p-5 text-[#241914]"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#836958]">
                    Flagship Note
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4b392e]">
                    The physical location is still being finalized, but the world it belongs to is already taking shape.
                  </p>
                  <Link
                    href="/location"
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#241914] transition-colors hover:text-[#8d6447]"
                  >
                    View Location Preview
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="lg:col-span-4"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
              Signature Offerings
            </p>
            <h2 className="mt-5 max-w-md text-4xl font-display leading-tight text-foreground md:text-5xl">
              The menu is being shaped like the room itself.
            </h2>
            <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-muted-foreground">
              Nothing in Gazelle is meant to feel generic. Each core offering supports the atmosphere rather than competing with it.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
            >
              See the full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-5 md:grid-cols-2 lg:col-span-8 xl:grid-cols-3"
          >
            {signatureOfferings.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUpVariant}
                className={`group overflow-hidden rounded-[2.2rem] border border-border/70 bg-card/55 p-4 shadow-[0_18px_50px_rgba(65,44,19,0.08)] ${
                  index === 0 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[1.7rem] bg-card">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pb-1 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                    {item.tag}
                  </p>
                  <h3 className="mt-3 text-[1.9rem] font-display leading-none text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem] rounded-[2.75rem] border border-border/70 bg-card/55 p-4 shadow-[0_24px_70px_rgba(65,44,19,0.08)] sm:p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2.2rem] border border-[#3d3028] bg-[#1f1713]">
              <img
                src={atmosphereImg}
                alt="Gazelle atmosphere preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,5,0.08),rgba(9,6,5,0.26)_45%,rgba(9,6,5,0.66)_100%)]" />

              <div className="absolute bottom-5 left-5 right-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/18 backdrop-blur-md">
                  <img
                    src={signature3}
                    alt="Gazelle pastry detail"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="rounded-[1.7rem] border border-white/10 bg-black/22 p-5 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    Spatial Mood
                  </p>
                  <p className="mt-3 text-xl font-display leading-tight text-white">
                    Every surface is meant to support a slower emotional tempo.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUpVariant}
              className="flex flex-col justify-between rounded-[2.2rem] bg-background p-7 sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  The Atmosphere
                </p>
                <h2 className="mt-5 text-4xl font-display leading-tight text-foreground md:text-5xl">
                  Designed for pause, not noise.
                </h2>
                <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">
                  Gazelle is being built as a place where architecture, menu, and pacing all reinforce the same quiet confidence.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {atmosphereTraits.map((trait) => (
                  <div key={trait.title} className="border-t border-border/70 pt-5 first:border-t-0 first:pt-0">
                    <h3 className="text-2xl font-display text-foreground">
                      {trait.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                      {trait.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
              >
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Teaser */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
          >
            <h2 className="text-5xl md:text-6xl font-display mb-8">Flagship Update</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto font-light">
              Gazelle&apos;s first physical location is still being finalized. Join the list for launch timing, preview events, and opening details.
            </p>
            <div className="inline-block p-1 bg-border/40 rounded-full">
              <div className="bg-background rounded-full px-8 py-4 border border-border/50 shadow-sm flex items-center justify-center gap-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Location details coming soon</span>
              </div>
            </div>
            <div className="mt-12">
              <Link 
                href="/location" 
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all rounded-sm tracking-widest text-sm uppercase"
              >
                See the Preview
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
