import { PageTransition, fadeUpVariant, staggerContainer } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";

const menuData = [
  {
    category: "Espresso",
    items: [
      { name: "Espresso", desc: "Double shot of our signature Gazelle blend.", price: "$4.00" },
      { name: "Macchiato", desc: "Double espresso with a dash of steamed milk.", price: "$4.50" },
      { name: "Cortado", desc: "Equal parts espresso and steamed milk.", price: "$4.75" },
      { name: "Flat White", desc: "Silky textured milk over a double shot.", price: "$5.00" },
      { name: "Cappuccino", desc: "Rich espresso topped with deep foam.", price: "$5.00" },
      { name: "Latte", desc: "Espresso with steamed milk and a light foam layer.", price: "$5.50" },
    ]
  },
  {
    category: "Filter & Pour",
    items: [
      { name: "Pour Over", desc: "Rotating selection of single-origin beans. Please ask your barista.", price: "$6.00+" },
      { name: "Batch Brew", desc: "Our daily drip coffee.", price: "$3.50" },
      { name: "Cold Brew", desc: "Slow-steeped for 18 hours. Smooth and bold.", price: "$5.00" },
    ]
  },
  {
    category: "Tea & Botanical",
    items: [
      { name: "Ceremonial Matcha", desc: "Whisked with water or your choice of milk.", price: "$6.50", badges: ["DF", "VG"] },
      { name: "Hojicha Latte", desc: "Roasted green tea with steamed milk.", price: "$6.00" },
      { name: "Loose Leaf Tea", desc: "Earl Grey, Jasmine, Chamomile, or Peppermint.", price: "$4.50" },
      { name: "Golden Milk", desc: "Turmeric, ginger, black pepper, and honey.", price: "$5.50", badges: ["GF"] },
    ]
  },
  {
    category: "Pastries",
    items: [
      { name: "Butter Croissant", desc: "Classic, flaky, baked fresh daily.", price: "$4.50" },
      { name: "Almond Croissant", desc: "Filled with almond frangipane.", price: "$5.50" },
      { name: "Cardamom Bun", desc: "Sweet dough laced with freshly ground cardamom.", price: "$4.75", badges: ["VG"] },
      { name: "Olive Oil Cake", desc: "Moist, dense, with a hint of lemon.", price: "$5.00" },
    ]
  }
];

export default function Menu() {
  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6">The Menu</h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Quality is our cornerstone. We source our beans ethically and roast them to highlight their natural characteristics.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sticky Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="sticky top-32">
              <h3 className="text-sm tracking-widest uppercase text-accent mb-6">Categories</h3>
              <ul className="flex md:flex-col flex-wrap gap-4 md:gap-4 text-muted-foreground">
                {menuData.map((section, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#${section.category.toLowerCase().replace(/ & | /g, "-")}`}
                      className="hover:text-foreground transition-colors font-medium text-lg md:text-base font-display md:font-body"
                    >
                      {section.category}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 bg-card rounded-2xl border border-border/50 hidden md:block">
                <h4 className="font-semibold mb-3">Dietary Notes</h4>
                <ul className="text-sm space-y-2 text-muted-foreground flex flex-col">
                  <li className="flex items-center gap-2"><span className="text-xs font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">VG</span> Vegan</li>
                  <li className="flex items-center gap-2"><span className="text-xs font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">GF</span> Gluten Free</li>
                  <li className="flex items-center gap-2"><span className="text-xs font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">DF</span> Dairy Free</li>
                </ul>
                <p className="text-xs mt-4 text-muted-foreground/70 italic">Oat, almond, and macadamia milk available upon request.</p>
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 max-w-3xl">
            {menuData.map((section, idx) => (
              <motion.div 
                key={idx}
                id={section.category.toLowerCase().replace(/ & | /g, "-")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
                className="mb-20 scroll-mt-32"
              >
                <div className="flex items-baseline justify-between border-b border-border pb-4 mb-8">
                  <h2 className="text-3xl md:text-4xl font-display">{section.category}</h2>
                </div>
                
                <div className="flex flex-col gap-8">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-xl font-medium text-foreground flex items-center gap-3">
                          {item.name}
                          {item.badges && (
                            <span className="flex gap-1">
                              {item.badges.map(b => (
                                <span key={b} className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                                  {b}
                                </span>
                              ))}
                            </span>
                          )}
                        </h4>
                        <div className="flex-1 mx-4 border-b border-dashed border-border/60 group-hover:border-accent/40 transition-colors relative top-[-4px]"></div>
                        <span className="text-lg text-foreground">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground font-light text-sm md:text-base pr-12">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
