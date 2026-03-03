import { useState } from "react";
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  // coffee shop interior wide
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
  // latte art close up
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800",
  // pastry detail
  "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800",
  // exterior storefront
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=800",
  // people talking
  "https://images.unsplash.com/photo-1521017430205-959c9415494a?auto=format&fit=crop&q=80&w=800",
  // matcha prep
  "https://images.unsplash.com/photo-1563822249548-9a72b6353cad?auto=format&fit=crop&q=80&w=800",
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
            Glimpses into the daily life at Gazelle.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUpVariant}
              className={`relative cursor-pointer overflow-hidden rounded-2xl group ${
                idx === 0 || idx === 3 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`Gallery image ${idx + 1}`} 
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
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
