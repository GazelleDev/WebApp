import {
  PageTransition,
  fadeUpVariant,
  heroCopyVariant,
  staggerContainer,
  tightRevealViewport,
} from "@/components/ui/PageTransition";
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
    ],
  },
  {
    category: "Filter & Pour",
    items: [
      { name: "Pour Over", desc: "Rotating selection of single-origin beans. Please ask your barista.", price: "$6.00+" },
      { name: "Batch Brew", desc: "Our daily drip coffee.", price: "$3.50" },
      { name: "Cold Brew", desc: "Slow-steeped for 18 hours. Smooth and bold.", price: "$5.00" },
    ],
  },
  {
    category: "Tea & Botanical",
    items: [
      { name: "Ceremonial Matcha", desc: "Whisked with water or your choice of milk.", price: "$6.50", badges: ["DF", "VG"] },
      { name: "Hojicha Latte", desc: "Roasted green tea with steamed milk.", price: "$6.00" },
      { name: "Loose Leaf Tea", desc: "Earl Grey, Jasmine, Chamomile, or Peppermint.", price: "$4.50" },
      { name: "Golden Milk", desc: "Turmeric, ginger, black pepper, and honey.", price: "$5.50", badges: ["GF"] },
    ],
  },
  {
    category: "Pastries",
    items: [
      { name: "Butter Croissant", desc: "Classic, flaky, baked fresh daily.", price: "$4.50" },
      { name: "Almond Croissant", desc: "Filled with almond frangipane.", price: "$5.50" },
      { name: "Cardamom Bun", desc: "Sweet dough laced with freshly ground cardamom.", price: "$4.75", badges: ["VG"] },
      { name: "Olive Oil Cake", desc: "Moist, dense, with a hint of lemon.", price: "$5.00" },
    ],
  },
];

const dietaryNotes = [
  { code: "VG", label: "Vegan" },
  { code: "GF", label: "Gluten Free" },
  { code: "DF", label: "Dairy Free" },
];

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/ & | /g, "-");
}

export default function Menu() {
  return (
    <PageTransition className="min-h-screen bg-background px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroCopyVariant}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/28 bg-white/45 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
            Gazelle Menu
          </div>
          <h1 className="mt-7 text-5xl font-display leading-[0.94] text-foreground md:text-7xl">
            The Menu
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            A focused offering built around espresso, matcha, tea, and pastry. The menu stays intentionally narrow so each item can feel considered.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-14 xl:grid-cols-[18.5rem_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[2.1rem] border border-border/70 bg-card/58 p-6 shadow-[0_18px_48px_rgba(36,35,39,0.06)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-accent">
                Categories
              </p>

              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-2">
                {menuData.map((section, index) => (
                  <li key={section.category}>
                    <a
                      href={`#${slugifyCategory(section.category)}`}
                      className="inline-flex items-center gap-3 rounded-[1.15rem] border border-border/45 bg-white/30 px-4 py-3 text-[0.98rem] font-medium tracking-[0.01em] text-foreground/88 transition-all hover:border-[#9F7965]/28 hover:bg-white/50 hover:text-foreground lg:flex lg:w-full lg:justify-between lg:px-4 lg:py-3.5"
                    >
                      <span>{section.category}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#9F7965]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-9 rounded-[1.6rem] border border-white/45 bg-white/40 p-5">
                <h3 className="text-sm font-semibold text-foreground">Dietary Notes</h3>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  {dietaryNotes.map((note) => (
                    <li key={note.code} className="flex items-center gap-2">
                      <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                        {note.code}
                      </span>
                      {note.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs italic text-muted-foreground/70">
                  Oat, almond, and macadamia milk available upon request.
                </p>
              </div>
            </div>
          </aside>

          <div className="max-w-4xl">
            {menuData.map((section) => (
              <motion.section
                key={section.category}
                id={slugifyCategory(section.category)}
                initial="hidden"
                whileInView="visible"
                viewport={tightRevealViewport}
                variants={fadeUpVariant}
                className="mb-8 scroll-mt-32 rounded-[2.4rem] border border-border/70 bg-white/34 p-7 shadow-[0_18px_48px_rgba(36,35,39,0.06)] sm:mb-10 sm:p-9"
              >
                <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                      {section.items.length} Items
                    </p>
                    <h2 className="mt-3 text-3xl font-display text-foreground md:text-4xl">
                      {section.category}
                    </h2>
                  </div>
                  <span className="hidden rounded-full border border-border/60 bg-white/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#9F7965] md:inline-flex">
                    Gazelle
                  </span>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={tightRevealViewport}
                  className="mt-4 divide-y divide-border/45"
                >
                  {section.items.map((item) => (
                    <motion.article
                      key={item.name}
                      variants={fadeUpVariant}
                      className="group rounded-[1.6rem] px-2 py-5 transition-colors hover:bg-white/28 sm:px-4 sm:py-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[1.15rem] font-medium text-foreground md:text-[1.25rem]">
                              {item.name}
                            </h3>
                            {item.badges && (
                              <span className="flex gap-1">
                                {item.badges.map((badge) => (
                                  <span
                                    key={badge}
                                    className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </span>
                            )}
                          </div>

                          <p className="mt-2 max-w-[34rem] pr-0 text-[0.95rem] font-light leading-relaxed text-muted-foreground md:text-base">
                            {item.desc}
                          </p>
                        </div>

                        <div className="hidden flex-1 self-center border-b border-dashed border-border/60 transition-colors group-hover:border-accent/40 md:block" />

                        <span className="shrink-0 rounded-full border border-border/55 bg-card/52 px-3 py-1 text-[0.95rem] font-medium tracking-[0.03em] text-[#9F7965] md:text-base">
                          {item.price}
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
