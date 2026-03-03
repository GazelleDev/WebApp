import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-4xl md:text-5xl font-display mb-12">Privacy Policy</h1>
          
          <div className="prose prose-stone prose-lg">
            <p className="text-muted-foreground">Last updated: March 3, 2026</p>
            
            <h3 className="text-foreground font-display mt-8">1. Information We Collect</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              We collect information you provide directly to us when you subscribe to our newsletter or submit the contact form. This may include your name, email address, and the contents of your message.
            </p>
            
            <h3 className="text-foreground font-display mt-8">2. How We Use Information</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              We use this information to respond to inquiries, send newsletter updates you requested, and understand interest in the Gazelle concept. We do not sell or rent your personal information to third parties.
            </p>
            
            <h3 className="text-foreground font-display mt-8">3. Communication Preferences</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              You may opt out of promotional emails at any time by using the unsubscribe link in those emails or by contacting us directly.
            </p>

            <h3 className="text-foreground font-display mt-8">4. Questions</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              If you have privacy questions or want your submitted data removed, email hello@gazellecoffee.com.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
