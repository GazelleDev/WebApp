import { useState } from "react";
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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

const galleryImages = [
  { src: img1, alt: "Gazelle Interior - Main Dining Area" },
  { src: img2, alt: "Gazelle Interior - Counter and Arched Feature" },
  { src: img3, alt: "Gazelle Interior - Seating and Lighting" },
  { src: img4, alt: "Gazelle Interior - Marble Counter Detail" },
  { src: img5, alt: "Gazelle Interior - Arched Logo Wall" },
  { src: img6, alt: "Gazelle Interior - Dining Perspective" },
  { src: img7, alt: "Gazelle Interior - Modern Ceiling Lighting" },
  { src: img8, alt: "Gazelle Interior - Window View and Seating" },
  { src: img9, alt: "Gazelle Interior - Entry and Accessibility Ramp" },
  { src: img10, alt: "Gazelle Interior - Service Station Detail" },
  { src: img11, alt: "Gazelle Interior - Architectural Arches" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6">Atmosphere</h1>
          <p className="text-muted-foreground text-lg max-w-xl font-light">
            Glimpses into the meticulously designed sanctuary that is Gazelle.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUpVariant}
              className={`relative cursor-pointer overflow-hidden group ${
                idx % 5 === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9] rounded-2xl" : "aspect-square rounded-[var(--radius-arch)]"
              }`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-foreground hover:text-accent transition-colors z-[101]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={selectedImage} 
              alt="Selected" 
              className="max-w-full max-h-full rounded-sm object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
