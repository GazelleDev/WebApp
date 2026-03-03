import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

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
          <h1 className="text-5xl md:text-7xl font-display mb-6">Visit Us</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
            An oasis of calm in the city. Join us for your morning ritual or afternoon escape.
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
                <p className="text-xl text-foreground font-display mb-1">1240 Heritage Avenue</p>
                <p className="text-muted-foreground">Suite 101<br/>Metropolis, NY 10012</p>
                <p className="mt-4 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/30">
                  <span className="font-medium text-foreground block mb-1">Parking Notes:</span>
                  Street parking available on Heritage Ave. Complimentary 1-hour parking in the rear lot for guests.
                </p>
              </div>

              <div className="h-px bg-border/60" />

              <div>
                <h3 className="flex items-center gap-3 text-sm tracking-widest uppercase text-accent mb-4">
                  <Clock className="w-4 h-4" /> Hours
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-muted-foreground">7:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Saturday</span>
                    <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-foreground">
                    <span className="font-medium">Sunday</span>
                    <span className="text-muted-foreground">8:00 AM - 4:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="h-px bg-border/60" />

              <div>
                <h3 className="flex items-center gap-3 text-sm tracking-widest uppercase text-accent mb-4">
                  <Phone className="w-4 h-4" /> Contact
                </h3>
                <p className="text-foreground mb-2">(555) 123-4567</p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hello@gazellecoffee.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map Image Placeholder (Since we can't use real iframe easily without keys, we use an elegant image representation) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-7 h-[500px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-sm border border-border/50 relative group"
          >
            {/* map aesthetic placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
              alt="Map view of location" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
               <div className="bg-background/90 backdrop-blur px-6 py-3 rounded-full border border-border flex items-center gap-3 shadow-lg">
                 <MapPin className="w-5 h-5 text-accent" />
                 <span className="font-medium tracking-wide uppercase text-sm">Open in Maps</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
