import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import { ArrowRight } from "lucide-react";
import heroImg from "@assets/Screenshot_2026-03-02_at_12.00.23_PM_1772562150247.png";
import signature1 from "@assets/Screenshot_2026-03-02_at_12.07.46_PM_1772562150247.png";
import signature2 from "@assets/Screenshot_2026-03-02_at_12.10.04_PM_1772562150247.png";
import signature3 from "@assets/Screenshot_2026-03-02_at_12.05.40_PM_1772562150247.png";
import atmosphereImg from "@assets/Screenshot_2026-03-02_at_12.05.07_PM_1772562150247.png";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={heroImg} 
            alt="Gazelle Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 tracking-tight text-balance"
          >
            Quiet luxury.<br/><span className="italic text-white/90">Bold coffee.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl font-light text-white/80 mb-10 max-w-2xl mx-auto"
          >
            A sanctuary for the senses. Meticulously sourced beans, masterfully roasted, served in an atmosphere of refined elegance.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/menu" 
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white hover:bg-accent/90 transition-all duration-300 tracking-widest text-sm uppercase rounded-sm"
            >
              Explore Menu
            </Link>
            <Link 
              href="/location" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 text-white hover:bg-white/10 transition-all duration-300 tracking-widest text-sm uppercase rounded-sm"
            >
              Visit Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-sm tracking-widest uppercase text-accent mb-4">Our Craft</h2>
            <h3 className="text-4xl md:text-5xl font-display text-foreground">Signature Offerings</h3>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                title: "The Gazelle Espresso",
                desc: "Our house blend featuring notes of dark chocolate, wild berries, and toasted hazelnut.",
                img: signature1
              },
              {
                title: "Ceremonial Matcha",
                desc: "First-harvest shade-grown leaves from Uji, Japan. Whisked to perfection.",
                img: signature2
              },
              {
                title: "Artisan Pastries",
                desc: "Baked fresh daily by our in-house patissier using French butter and local flour.",
                img: signature3
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUpVariant} className="group cursor-pointer">
                <div className="overflow-hidden rounded-[var(--radius-arch)] mb-6 relative aspect-[3/4] bg-card">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h4 className="text-2xl font-display mb-2">{item.title}</h4>
                <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Atmosphere / Split Section */}
      <section className="py-0 bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[50vh] lg:h-auto relative">
            <img 
              src={atmosphereImg} 
              alt="Gazelle Atmosphere" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="px-8 py-20 md:p-24 lg:p-32 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <h2 className="text-sm tracking-widest uppercase text-accent mb-6">The Atmosphere</h2>
              <h3 className="text-4xl md:text-5xl font-display mb-8 leading-tight">Designed for pause.</h3>
              <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
                Gazelle was born from a desire to create a space that feels like a retreat. Soft lighting, textured surfaces, and the low hum of conversation create a backdrop for moments of genuine connection—whether with others or simply with yourself.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors group"
              >
                Read our story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
            <h2 className="text-5xl md:text-6xl font-display mb-8">Find Your Table</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto font-light">
              Located in the heart of the historic district. Walk-ins always welcome.
            </p>
            <div className="inline-block p-1 bg-border/40 rounded-full">
              <div className="bg-background rounded-full px-8 py-4 border border-border/50 shadow-sm flex items-center justify-center gap-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Open until 6:00 PM</span>
              </div>
            </div>
            <div className="mt-12">
              <Link 
                href="/location" 
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all rounded-sm tracking-widest text-sm uppercase"
              >
                Get Directions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
