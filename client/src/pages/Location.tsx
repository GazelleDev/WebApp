import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Clock, Mail, ArrowRight } from "lucide-react";
import previewImg from "@assets/Screenshot_2026-03-02_at_12.09.38_PM_1772562150247.png";

export default function Location() {
  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6">Location Preview</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
            The Gazelle flagship is still in development. This page shares what is confirmed now without presenting placeholder operational details as if they were live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 bg-card p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm"
          >
            <div className="space-y-10">
              <div>
                <h3 className="flex items-center gap-3 text-sm tracking-widest uppercase text-accent mb-4">
                  <MapPin className="w-4 h-4" /> Location
                </h3>
                <p className="text-xl text-foreground font-display mb-1">Flagship details coming soon</p>
                <p className="text-muted-foreground">
                  We&apos;re finalizing the first public Gazelle location.
                  <br />
                  Address, neighborhood, and opening date will be announced once confirmed.
                </p>
                <p className="mt-4 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/30">
                  <span className="font-medium text-foreground block mb-1">Current Status:</span>
                  The imagery on this site reflects the intended design direction for Gazelle&apos;s physical space, not a currently open storefront.
                </p>
              </div>

              <div className="h-px bg-border/60" />

              <div>
                <h3 className="flex items-center gap-3 text-sm tracking-widest uppercase text-accent mb-4">
                  <Clock className="w-4 h-4" /> Hours
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Public Opening</span>
                    <span className="text-muted-foreground">To be announced</span>
                  </li>
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Preview Events</span>
                    <span className="text-muted-foreground">Shared by newsletter</span>
                  </li>
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Service Hours</span>
                    <span className="text-muted-foreground">Published with launch</span>
                  </li>
                </ul>
              </div>

              <div className="h-px bg-border/60" />

              <div>
                <h3 className="flex items-center gap-3 text-sm tracking-widest uppercase text-accent mb-4">
                  <Mail className="w-4 h-4" /> Contact
                </h3>
                <p className="text-foreground mb-2">hello@gazellecoffee.com</p>
                <p className="text-muted-foreground">
                  Use the contact form for private events, creative partnerships, or launch questions.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-foreground font-medium transition-colors hover:text-accent"
                >
                  Contact Gazelle
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-7 h-[500px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-sm border border-border/50 relative group"
          >
            <img 
              src={previewImg}
              alt="Gazelle flagship interior preview"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
               <div className="bg-background/90 backdrop-blur px-6 py-3 rounded-full border border-border flex items-center gap-3 shadow-lg">
                 <MapPin className="w-5 h-5 text-accent" />
                 <span className="font-medium tracking-wide uppercase text-sm">Flagship Preview</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
