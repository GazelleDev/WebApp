import { useState } from "react";
import { PageTransition, fadeUpVariant } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";
import { useCreateContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { mutate, isPending } = useCreateContact();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We've received your message and will be in touch shortly.",
        });
        setFormData({ name: "", email: "", message: "" });
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message,
        });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6">Get in Touch</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-md font-light">
            Inquiries regarding private events, wholesale partnerships, or general questions are welcome.
          </p>
          
          <div className="space-y-6 text-foreground">
            <div>
              <h4 className="text-sm tracking-widest uppercase text-accent mb-2">General</h4>
              <p>hello@gazellecoffee.com</p>
            </div>
            <div>
              <h4 className="text-sm tracking-widest uppercase text-accent mb-2">Press & Partnerships</h4>
              <p>press@gazellecoffee.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-card p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="Jane Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="jane@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-foreground text-background rounded-xl font-medium tracking-widest text-sm uppercase hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

      </div>
    </PageTransition>
  );
}
