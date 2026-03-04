import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";
import { usePublicContent } from "@/hooks/use-public-content";

export default function Privacy() {
  const { data } = usePublicContent();
  const content = data?.privacyPage;

  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-4xl md:text-5xl font-display mb-12">{content?.title ?? "Privacy Policy"}</h1>
          
          <div className="prose prose-stone prose-lg">
            <p className="text-muted-foreground">{content?.lastUpdatedLabel ?? "Last updated: March 3, 2026"}</p>

            {(content?.sections ?? []).map((section) => (
              <div key={section.heading}>
                <h3 className="text-foreground font-display mt-8">{section.heading}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
