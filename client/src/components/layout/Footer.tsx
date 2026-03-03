import { Link } from "wouter";
import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/use-newsletter";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Instagram, Twitter, MapPin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSubscribeNewsletter();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate({ email }, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Welcome to the Gazelle inner circle.",
        });
        setEmail("");
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

  return (
    <footer className="bg-card pt-20 pb-10 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Socials */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h2 className="text-3xl font-display font-semibold mb-4">Gazelle.</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Quiet luxury. Bold coffee. An escape from the everyday, crafted for those who appreciate the finer details.
            </p>
            <div className="flex items-center gap-4 text-foreground/70">
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-foreground">Explore</h3>
            <ul className="flex flex-col gap-4 text-muted-foreground">
              <li><Link href="/menu" className="hover:text-accent transition-colors">Our Menu</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">The Story</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Atmosphere</Link></li>
              <li><Link href="/location" className="hover:text-accent transition-colors">Visit Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-foreground">The Dispatch</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe for seasonal menu updates, private event invitations, and coffee culture.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 pr-12 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted-foreground"
                required
              />
              <button 
                type="submit" 
                disabled={isPending}
                className="absolute right-0 top-0 bottom-0 px-4 text-foreground/50 hover:text-accent transition-colors disabled:opacity-50"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gazelle Coffee. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
