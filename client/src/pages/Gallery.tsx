import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { usePublicContent } from "@/hooks/use-public-content";
import {
  PageTransition,
  createRevealVariant,
  fadeUpVariant,
  heroCopyVariant,
  heroVisualVariant,
  modalBackdropVariant,
  modalPanelVariant,
  revealViewport,
  staggerContainer,
  tightRevealViewport,
  tightStaggerContainer,
} from "@/components/ui/PageTransition";

import img1 from "@assets/Screenshot_2026-03-02_at_12.00.23_PM_1772562150247.png";
import img2 from "@assets/Screenshot_2026-03-02_at_12.04.42_PM_1772562150247.png";
import img3 from "@assets/Screenshot_2026-03-02_at_12.05.07_PM_1772562150247.png";
import img4 from "@assets/Screenshot_2026-03-02_at_12.05.40_PM_1772562150247.png";
import img5 from "@assets/Screenshot_2026-03-02_at_12.07.46_PM_1772562150247.png";
import img6 from "@assets/Screenshot_2026-03-02_at_12.08.31_PM_1772562150247.png";
import img7 from "@assets/Screenshot_2026-03-02_at_12.08.52_PM_1772562150247.png";
import img8 from "@assets/Screenshot_2026-03-02_at_12.09.15_PM_1772562150247.png";
import img9 from "@assets/Screenshot_2026-03-02_at_12.09.38_PM_1772562150247.png";
import img10 from "@assets/Screenshot_2026-03-02_at_12.10.04_PM_1772562150247.png";
import img11 from "@assets/Screenshot_2026-03-02_at_12.10.32_PM_1772562150247.png";

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  note: string;
  layout: string;
};

export default function Gallery() {
  const { data } = usePublicContent();
  const content = data?.galleryPage;
  const gallerySignals = content?.gallerySignals ?? [];
  const galleryImages: GalleryImage[] = (content?.frames ?? []).map((frame, index) => ({
    src: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11][index] ?? img1,
    alt: frame.title,
    title: frame.title,
    note: frame.note,
    layout: [
      "md:col-span-2 xl:col-span-2 xl:row-span-2",
      "",
      "",
      "",
      "xl:row-span-2",
      "md:col-span-2 xl:col-span-2",
      "",
      "",
      "",
      "md:col-span-2 xl:col-span-2",
      "",
    ][index] ?? "",
  }));
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <PageTransition className="min-h-screen bg-background pb-24 pt-32">
      <div className="px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroCopyVariant}
              className="relative overflow-hidden rounded-[3rem] border border-border/70 bg-card/82 p-8 shadow-[0_28px_80px_rgba(36,35,39,0.12)] sm:p-10 lg:min-h-[39rem] lg:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/45 to-transparent" />
              <div className="absolute -left-12 top-12 h-48 w-48 rounded-full bg-[#C0987E]/22 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#9F7965]/16 blur-3xl" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/35 bg-white/55 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                    {content?.heroEyebrow ?? "Atmosphere Gallery"}
                  </div>

                  <h1 className="mt-8 max-w-3xl text-5xl font-display leading-[0.92] text-foreground md:text-7xl lg:text-[5.6rem]">
                    {content?.heroTitle ?? "Spatial studies"}
                    <br />
                    <span className="italic text-[#9F7965]">{content?.heroAccent ?? "for Gazelle."}</span>
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                    {content?.heroBody ?? "A quieter read of the Gazelle world through light, material, and spatial rhythm."}
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/location"
                      className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-colors hover:bg-foreground/90"
                    >
                      {content?.primaryCtaLabel ?? "See the Location"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <motion.div
                  variants={tightStaggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mt-12 grid gap-3 md:grid-cols-3"
                >
                  {gallerySignals.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={fadeUpVariant}
                      className="rounded-[1.6rem] border border-white/55 bg-white/45 px-5 py-5 backdrop-blur-sm"
                    >
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
                        {item.label}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/86">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroVisualVariant}
              className="relative min-h-[39rem] overflow-hidden rounded-[3rem] border border-[#9F7965]/40 bg-[#242327] p-4 shadow-[0_30px_90px_rgba(36,35,39,0.24)] sm:p-5"
            >
              <img
                src={img1}
                alt="Gazelle flagship interior hero"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.08),rgba(36,35,39,0.22)_38%,rgba(36,35,39,0.76)_100%)]" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#242327]/28 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-white/78 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                {content?.featuredFrameLabel ?? "Featured Frame"}
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={createRevealVariant({ axis: "x", distance: 18, delay: 0.28, duration: 0.62, scale: 0.98 })}
                className="absolute right-5 top-5 hidden w-[12.5rem] rounded-[2rem] border border-white/10 bg-[#242327]/34 p-3 backdrop-blur-md xl:block"
              >
                <div className="overflow-hidden rounded-[1.4rem]">
                  <img
                    src={img10}
                    alt="Gazelle service station detail"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.26em] text-white/50">
                  {content?.serviceDetailLabel ?? "Service Detail"}
                </p>
              </motion.div>

              <div className="absolute inset-x-5 bottom-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={createRevealVariant({ distance: 14, delay: 0.35, duration: 0.58, scale: 0.985 })}
                  className="rounded-[2.15rem] border border-white/10 bg-[#242327]/30 p-6 backdrop-blur-md"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    {content?.visualToneLabel ?? "Visual Tone"}
                  </p>
                  <p className="mt-3 max-w-md text-[1.8rem] font-display leading-[1.02] text-white md:text-[2.1rem]">
                    {content?.visualToneTitle ?? "Quiet, tactile, and cinematic."}
                  </p>
                </motion.div>

                <motion.button
                  type="button"
                  initial="hidden"
                  animate="visible"
                  variants={createRevealVariant({ distance: 14, delay: 0.45, duration: 0.58, scale: 0.985 })}
                  onClick={() => setSelectedImage(galleryImages[0])}
                  className="rounded-[2.15rem] border border-white/10 bg-[#C0987E] p-6 text-left text-[#242327] transition-colors hover:bg-[#9F7965] hover:text-[#f4ece6]"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-current/70">
                    {content?.openFrameLabel ?? "Open Frame"}
                  </p>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-[92rem]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={fadeUpVariant}
            className="mb-8"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
              {content?.curatedFramesLabel ?? "Curated Frames"}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={tightRevealViewport}
            className="grid auto-rows-[16rem] gap-5 md:auto-rows-[18rem] md:grid-cols-2 xl:auto-rows-[14rem] xl:grid-cols-4"
          >
            {galleryImages.map((image) => (
              <motion.button
                key={image.alt}
                type="button"
                variants={fadeUpVariant}
                onClick={() => setSelectedImage(image)}
                className={`group relative overflow-hidden rounded-[2.3rem] border border-border/70 bg-card/60 text-left shadow-[0_18px_48px_rgba(36,35,39,0.08)] ${image.layout}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,35,39,0.02),rgba(36,35,39,0.18)_42%,rgba(36,35,39,0.86)_100%)] transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                    {image.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </div>

      <AnimatePresence initial={false}>
        {selectedImage && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalBackdropVariant}
            className="fixed inset-0 z-[100] bg-[#242327]/88 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-[101] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f4ece6] transition-colors hover:text-[#C0987E]"
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-full items-center justify-center">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalPanelVariant}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex max-h-[82vh] items-center justify-center overflow-hidden rounded-[2.4rem] border border-white/10 bg-black/10 p-3">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[78vh] w-full rounded-[1.8rem] object-contain"
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-[1.8rem] border border-white/10 bg-[#242327]/58 p-5 text-[#f4ece6] backdrop-blur-md md:max-w-[26rem]">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                    {content?.expandedFrameLabel ?? "Expanded Frame"}
                  </p>
                  <h3 className="mt-3 text-[1.8rem] font-display leading-none text-white">
                    {selectedImage.title}
                  </h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
