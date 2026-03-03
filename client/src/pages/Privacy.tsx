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
            <p className="text-muted-foreground">Last updated: October 15, 2023</p>
            
            <h3 className="text-foreground font-display mt-8">1. Information We Collect</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              We collect information you provide directly to us, such as when you subscribe to our newsletter, 
              fill out a contact form, or interact with us on social media. This may include your name, 
              email address, and any other information you choose to provide.
            </p>
            
            <h3 className="text-foreground font-display mt-8">2. How We Use Information</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              We use the information we collect to send you our newsletter, respond to your inquiries, 
              and improve our services. We do not sell or rent your personal information to third parties.
            </p>
            
            <h3 className="text-foreground font-display mt-8">3. Communication Preferences</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              You may opt out of receiving promotional communications from us at any time by following 
              the instructions in those communications (e.g., clicking the "unsubscribe" link in our newsletter).
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
