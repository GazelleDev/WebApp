import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { usePublicContent } from "@/hooks/use-public-content";
import {
  PageTransition,
  fadeUpVariant,
  heroCopyVariant,
  heroVisualVariant,
} from "@/components/ui/PageTransition";

export default function Location() {
  const { data } = usePublicContent();
  const content = data?.locationPage;
  const siteSettings = data?.siteSettings;
  const addressLines = siteSettings?.addressLines ?? ["1240 Heritage Avenue", "Suite 101", "Metropolis, NY 10012"];
  const parkingNotes = siteSettings?.parkingNotes ?? [
    "Street parking available on Heritage Ave.",
    "Complimentary 1-hour parking in the rear lot for guests.",
  ];
  const hours = siteSettings?.hours ?? [
    { days: "Monday - Friday", time: "7:00 AM - 6:00 PM" },
    { days: "Saturday", time: "8:00 AM - 6:00 PM" },
    { days: "Sunday", time: "8:00 AM - 4:00 PM" },
  ];
  const phoneNumber = siteSettings?.phone ?? "(555) 123-4567";
  const emailAddress = siteSettings?.generalEmail ?? "hello@gazellecoffee.com";
  const mapQuery = encodeURIComponent(siteSettings?.locationMapQuery ?? addressLines.join(", "));
  const mapHref = `https://maps.google.com/?q=${mapQuery}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <PageTransition className="min-h-dvh bg-background pb-24 pt-32">
      <div className="px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[92rem]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9F7965]/28 bg-white/45 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-[#9F7965]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
              {content?.heroEyebrow ?? "Visit Gazelle"}
            </div>
            <h1 className="mt-7 text-5xl font-display leading-[0.94] text-foreground md:text-7xl">
              {content?.heroTitle ?? "Location details"}
              <br />
              <span className="italic text-[#9F7965]">{content?.heroAccent ?? "for layout review."}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              {content?.heroBody ?? "The page below uses placeholder address and service information so the location experience can be designed with complete content."}
            </p>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroCopyVariant}
              className="rounded-[3rem] border border-[#9F7965]/28 bg-card/78 p-8 shadow-[0_28px_80px_rgba(36,35,39,0.10)] sm:p-10"
            >
              <div className="flex flex-col gap-11">
                <section>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                    <MapPin className="h-5 w-5" />
                    <span>{content?.locationLabel ?? "Location"}</span>
                  </div>

                  <div className="mt-8 space-y-2">
                    <p className="text-[2.2rem] font-medium leading-tight text-foreground">
                      {addressLines[0]}
                    </p>
                    <p className="text-[2rem] leading-tight text-[#7f6a5e]">
                      {addressLines[1]}
                    </p>
                    <p className="text-[2rem] leading-tight text-[#7f6a5e]">
                      {addressLines[2]}
                    </p>
                  </div>

                  <div className="mt-8 rounded-[1.7rem] border border-white/45 bg-white/42 p-5">
                    <p className="text-[1.05rem] font-semibold text-foreground">
                      {content?.parkingLabel ?? "Parking Notes"}:
                    </p>
                    <div className="mt-3 space-y-1 text-[1.05rem] leading-relaxed text-muted-foreground">
                      {parkingNotes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="h-px bg-border/60" />

                <section>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                    <Clock3 className="h-5 w-5" />
                    <span>{content?.hoursLabel ?? "Hours"}</span>
                  </div>

                  <div className="mt-8 space-y-6">
                    {hours.map((entry) => (
                      <div key={entry.days} className="flex items-baseline justify-between gap-6">
                        <span className="text-[1.1rem] font-medium text-foreground md:text-[1.25rem]">
                          {entry.days}
                        </span>
                        <span className="text-right text-[1.1rem] text-[#7f6a5e] md:text-[1.25rem]">
                          {entry.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="h-px bg-border/60" />

                <section>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#C0987E]">
                    <Phone className="h-5 w-5" />
                    <span>{content?.contactLabel ?? "Contact"}</span>
                  </div>

                  <div className="mt-8 space-y-5">
                    <a
                      href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-4 text-[1.1rem] text-foreground transition-colors hover:text-[#9F7965] md:text-[1.2rem]"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9F7965]/20 bg-white/35 text-[#C0987E]">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>{phoneNumber}</span>
                    </a>

                    <a
                      href={`mailto:${emailAddress}`}
                      className="flex items-center gap-4 text-[1.1rem] text-foreground transition-colors hover:text-[#9F7965] md:text-[1.2rem]"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9F7965]/20 bg-white/35 text-[#C0987E]">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>{emailAddress}</span>
                    </a>
                  </div>
                </section>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroVisualVariant}
              className="relative min-h-[42rem] overflow-hidden rounded-[3rem] border border-[#9F7965]/28 bg-[#d8d0c8] shadow-[0_30px_90px_rgba(36,35,39,0.14)]"
            >
              <iframe
                title="Gazelle placeholder map"
                src={mapEmbedUrl}
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,236,230,0.18),transparent_28%),linear-gradient(180deg,rgba(36,35,39,0.02),rgba(36,35,39,0.16))]" />

              <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#242327]/12 bg-[#242327] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#f4ece6] shadow-[0_12px_28px_rgba(36,35,39,0.22)] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C0987E]" />
                {content?.mapPreviewLabel ?? "Map Preview"}
              </div>

              <div className="absolute inset-x-6 bottom-8 flex justify-center">
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-[#242327]/12 bg-[#242327] px-8 py-4 text-sm uppercase tracking-[0.18em] text-[#f4ece6] shadow-[0_14px_32px_rgba(36,35,39,0.22)] backdrop-blur-sm transition-colors hover:border-[#C0987E] hover:text-[#C0987E]"
                >
                  <Navigation className="h-5 w-5 text-[#C0987E]" />
                  {content?.mapButtonLabel ?? "Open in Maps"}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
