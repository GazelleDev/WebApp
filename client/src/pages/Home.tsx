import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  PageTransition,
  createRevealVariant,
  fadeUpVariant,
  heroCopyVariant,
  heroImageVariant,
  heroVisualVariant,
  revealViewport,
  staggerContainer,
  tightRevealViewport,
  tightStaggerContainer,
} from "@/components/ui/PageTransition";
import { usePublicContent } from "@/hooks/use-public-content";
import { ArrowRight } from "lucide-react";
import heroImg from "@assets/Screenshot_2026-03-02_at_12.00.23_PM_1772562150247.png";
import signature1 from "@assets/Screenshot_2026-03-02_at_12.07.46_PM_1772562150247.png";
import signature2 from "@assets/Screenshot_2026-03-02_at_12.10.04_PM_1772562150247.png";
import signature3 from "@assets/Screenshot_2026-03-02_at_12.05.40_PM_1772562150247.png";
import atmosphereImg from "@assets/Screenshot_2026-03-02_at_12.05.07_PM_1772562150247.png";

export default function Home() {
  const { data } = usePublicContent();
  const content = data?.homePage;
  const signatureOfferings = (content?.signatureOfferings ?? []).map((offering, index) => ({
    ...offering,
    img: [signature1, signature2, signature3][index] ?? signature1,
  }));
  const featuredOffering = signatureOfferings[0];
  const supportingOfferings = signatureOfferings.slice(1);
  const studioSignals = content?.studioSignals ?? [];
  const menuDirection = content?.menuDirection ?? [];
  const atmosphereTraits = content?.atmosphereTraits ?? [];

  return (
    <PageTransition className="bg-background">
      <section className="px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pb-14 lg:pt-32">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroCopyVariant}
              className="relative overflow-hidden rounded-[3rem] border border-border/70 bg-card/82 p-8 shadow-[0_28px_80px_rgba(36,35,39,0.12)] sm:p-10 lg:min-h-[40rem] lg:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/45 to-transparent" />
              <div className="absolute -left-12 top-12 h-48 w-48 rounded-full bg-[#C0987E]/28 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#9F7965]/18 blur-3xl" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/35 bg-white/55 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                    {content?.heroEyebrow ?? "Gazelle Brand World"}
                  </div>

                  <h1 className="mt-8 max-w-3xl text-5xl font-display leading-[0.92] text-foreground md:text-7xl lg:text-[5.95rem]">
                    {content?.heroTitle ?? "A quieter kind"}
                    <br />
                    <span className="italic text-[#9F7965]">{content?.heroAccent ?? "of coffee luxury."}</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                    {content?.heroBody ?? "Gazelle is a hospitality concept shaped around warmth, restraint, and a strong visual identity. The space, menu, and mood are being designed as one continuous experience."}
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/menu"
                      className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-colors hover:bg-foreground/90"
                    >
                      {content?.primaryCtaLabel ?? "Explore Menu"}
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/60 bg-white/45 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors hover:border-[#9F7965] hover:text-[#9F7965]"
                    >
                      {content?.secondaryCtaLabel ?? "Read the Story"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tightStaggerContainer}
                  className="relative mt-12 overflow-hidden rounded-[1.9rem] border border-white/55 bg-white/45 backdrop-blur-sm"
                >
                  <div className="grid divide-y divide-border/50 md:grid-cols-3 md:divide-x md:divide-y-0">
                    {studioSignals.map((item) => (
                      <motion.div
                        key={item.label}
                        variants={fadeUpVariant}
                        className="px-5 py-5 lg:px-6"
                      >
                        <p className="text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroVisualVariant}
              className="relative min-h-[640px] overflow-hidden rounded-[3rem] border border-[#9F7965]/40 bg-[#242327] p-4 shadow-[0_32px_90px_rgba(36,35,39,0.24)] sm:p-5"
            >
              <motion.img
                initial="hidden"
                animate="visible"
                variants={heroImageVariant}
                src={heroImg}
                alt="Gazelle flagship interior preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.16),rgba(36,35,39,0.32)_42%,rgba(36,35,39,0.76)_100%)]" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#242327]/26 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                {content?.heroVisualEyebrow ?? "Spatial Preview"}
              </div>

              <div className="absolute inset-x-5 bottom-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={createRevealVariant({ distance: 14, delay: 0.35, duration: 0.58, scale: 0.985 })}
                  className="rounded-[2.15rem] border border-white/10 bg-[#242327]/30 p-6 backdrop-blur-md"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    {content?.heroInteriorEyebrow ?? "Interior Direction"}
                  </p>
                  <p className="mt-3 max-w-md text-[1.95rem] font-display leading-[1.02] text-white md:text-[2.35rem]">
                    {content?.heroInteriorTitle ?? "Curves, stone tones, and softened light shape the mood before the first sip."}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={createRevealVariant({ distance: 14, delay: 0.45, duration: 0.58, scale: 0.985 })}
                  className="rounded-[2.15rem] border border-white/10 bg-[#C0987E] p-6 text-[#242327]"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#242327]/65">
                    {content?.heroFlagshipEyebrow ?? "Flagship Note"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#242327]/82">
                    {content?.heroFlagshipBody ?? "The physical location is still being finalized, but the world it belongs to is already taking shape."}
                  </p>
                  <Link
                    href="/location"
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#242327] transition-colors hover:text-[#9F7965]"
                  >
                    {content?.flagshipCtaLabel ?? "See the Preview"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={fadeUpVariant}
              className="flex flex-col justify-between rounded-[2.75rem] border border-border/70 bg-background/90 p-7 shadow-[0_22px_60px_rgba(36,35,39,0.07)] sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  {content?.signatureIntroEyebrow ?? "Signature Offerings"}
                </p>
                <h2 className="mt-5 max-w-md text-4xl font-display leading-tight text-foreground md:text-5xl">
                  {content?.signatureIntroTitle ?? "The menu is being shaped like the room itself."}
                </h2>
                <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-muted-foreground">
                  {content?.signatureIntroBody ?? "Nothing in Gazelle is meant to feel generic. Each core offering supports the atmosphere rather than competing with it."}
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={tightRevealViewport}
                className="mt-10 space-y-4"
              >
                {menuDirection.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUpVariant}
                    className="flex gap-4 rounded-[1.5rem] border border-border/60 bg-card/40 px-4 py-4"
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <Link
                href="/menu"
                className="mt-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-colors hover:text-accent"
              >
                {content?.menuDirectionCtaLabel ?? "See the full menu"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={tightRevealViewport}
              className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]"
            >
              <motion.article
                variants={fadeUpVariant}
                className="group flex h-full flex-col overflow-hidden rounded-[2.6rem] border border-border/70 bg-card/65 p-5 shadow-[0_18px_50px_rgba(36,35,39,0.08)]"
              >
                <div className="overflow-hidden rounded-[1.9rem] bg-card">
                  <img
                    src={featuredOffering.img}
                    alt={featuredOffering.title}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between px-1 pb-1 pt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                      {featuredOffering.tag}
                    </p>
                    <h3 className="mt-3 text-[2.3rem] font-display leading-none text-foreground">
                      {featuredOffering.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                      {featuredOffering.desc}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.6rem] border border-white/45 bg-white/45 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-[#9F7965]">
                      {content?.signaturePositionEyebrow ?? "Signature Position"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {content?.signaturePositionBody ?? featuredOffering?.note ?? "A concentrated house cup designed to anchor the tone of the full menu."}
                    </p>
                  </div>
                </div>
              </motion.article>

              <div className="grid gap-5">
                {supportingOfferings.map((item, index) => (
                  <motion.article
                    key={item.title}
                    variants={fadeUpVariant}
                    className={`overflow-hidden rounded-[2.2rem] border p-4 shadow-[0_18px_44px_rgba(36,35,39,0.08)] ${
                      index === 0
                        ? "border-[#9F7965]/40 bg-[#242327] text-white"
                        : "border-border/70 bg-card/65 text-foreground"
                    }`}
                  >
                    <div className="grid gap-4 sm:grid-cols-[0.78fr_1.22fr] sm:items-stretch">
                      <div className={`overflow-hidden rounded-[1.6rem] ${index === 0 ? "bg-white/5" : "bg-card"}`}>
                        <img
                          src={item.img}
                          alt={item.title}
                          className="aspect-[4/4] h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <div>
                          <p className={`text-[10px] uppercase tracking-[0.28em] ${index === 0 ? "text-[#C0987E]" : "text-accent"}`}>
                            {item.tag}
                          </p>
                          <h3 className={`mt-3 text-[1.8rem] font-display leading-none ${index === 0 ? "text-white" : "text-foreground"}`}>
                            {item.title}
                          </h3>
                          <p className={`mt-4 text-sm leading-relaxed ${index === 0 ? "text-white/72" : "text-muted-foreground"}`}>
                            {item.desc}
                          </p>
                        </div>

                          <p className={`mt-5 text-[10px] uppercase tracking-[0.24em] ${index === 0 ? "text-white/45" : "text-[#9F7965]"}`}>
                            {item.note}
                          </p>
                        </div>
                      </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem] rounded-[2.75rem] border border-border/70 bg-card/55 p-4 shadow-[0_24px_70px_rgba(36,35,39,0.08)] sm:p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2.2rem] border border-[#9F7965]/40 bg-[#242327]">
              <img
                src={atmosphereImg}
                alt="Gazelle atmosphere preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.08),rgba(36,35,39,0.28)_45%,rgba(36,35,39,0.68)_100%)]" />

              <div className="absolute bottom-5 left-5 right-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#242327]/18 backdrop-blur-md">
                  <img
                    src={signature3}
                    alt="Gazelle pastry detail"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="rounded-[1.7rem] border border-white/10 bg-[#242327]/22 p-5 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    {content?.atmosphereImageEyebrow ?? "Spatial Mood"}
                  </p>
                  <p className="mt-3 text-xl font-display leading-tight text-white">
                    {content?.atmosphereImageTitle ?? "Every surface is meant to support a slower emotional tempo."}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={tightRevealViewport}
              variants={fadeUpVariant}
              className="flex flex-col justify-between rounded-[2.2rem] bg-background p-7 sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  {content?.atmosphereEyebrow ?? "The Atmosphere"}
                </p>
                <h2 className="mt-5 text-4xl font-display leading-tight text-foreground md:text-5xl">
                  {content?.atmosphereTitle ?? "Designed for pause, not noise."}
                </h2>
                <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">
                  {content?.atmosphereBody ?? "Gazelle is being built as a place where architecture, menu, and pacing all reinforce the same quiet confidence."}
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
                {content?.atmosphereCtaLabel ?? "Read our story"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={fadeUpVariant}
          >
            <h2 className="mb-8 text-5xl font-display md:text-6xl">{content?.flagshipTitle ?? "Flagship Update"}</h2>
            <p className="mx-auto mb-12 max-w-xl text-xl font-light text-muted-foreground">
              {content?.flagshipBody ?? "Gazelle's first physical location is still being finalized. Join the list for launch timing, preview events, and opening details."}
            </p>
            <div className="inline-block rounded-full bg-border/40 p-1">
              <div className="flex items-center justify-center gap-4 rounded-full border border-border/50 bg-background px-8 py-4 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="font-medium">{content?.flagshipStatusLabel ?? "Location details coming soon"}</span>
              </div>
            </div>
            <div className="mt-12">
              <Link
                href="/location"
                className="inline-flex items-center justify-center rounded-sm bg-foreground px-8 py-4 text-sm uppercase tracking-widest text-background transition-all hover:bg-foreground/90"
              >
                {content?.flagshipCtaLabel ?? "See the Preview"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
