import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display mb-8">The Story</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Gazelle was founded on a simple premise: coffee should be an experience, not just a transaction. 
            We believe in taking the time to do things right.
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-t-full overflow-hidden aspect-[4/5]"
          >
            {/* barista making coffee */}
            <img 
              src="https://pixabay.com/get/gc30f05129181553f7fbce38a17c6c894c7bffa0a5a270459e594d93ae4ded0dabb1ebf1dcbdd001e80880d957528f1e4d652d1ce29c1e785a1eb58392337ddcc_1280.jpg" 
              alt="Barista" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-b-full overflow-hidden aspect-[4/5] md:mt-24"
          >
            {/* coffee beans roasting */}
            <img 
              src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800" 
              alt="Coffee beans" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-10 md:p-16 border border-border/50 shadow-sm mb-24">
          <h2 className="text-3xl font-display text-center mb-12">Our Philosophy</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 text-accent text-lg font-medium">01. Sourcing</div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-display mb-3">Direct & Transparent</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  We work directly with small-scale farmers in Ethiopia, Colombia, and Japan. Paying above fair-trade prices ensures sustainable practices and exceptional quality year after year.
                </p>
              </div>
            </div>
            
            <div className="w-full h-px bg-border/60" />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 text-accent text-lg font-medium">02. Roasting</div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-display mb-3">Precision & Care</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Our roasting process is tailored to each specific bean lot. We prefer lighter roasts that highlight the natural terroir and fruity notes, avoiding the bitter, burnt flavors of mass-produced coffee.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-border/60" />
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 text-accent text-lg font-medium">03. Space</div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-display mb-3">A Place to Pause</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  The environment is just as important as the cup. We've designed Gazelle to be an architectural sanctuary—warm woods, soft acoustics, and no blaring music. It's an analog space in a digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </PageTransition>
  );
}
