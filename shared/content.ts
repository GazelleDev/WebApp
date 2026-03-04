import { z } from "zod";

const nonEmptyText = (message: string, max = 5000) =>
  z.string().trim().min(1, message).max(max, "Value is too long");

const shortLabel = (message: string, max = 120) => nonEmptyText(message, max);
const mediumText = (message: string, max = 300) => nonEmptyText(message, max);
const longText = (message: string, max = 2000) => nonEmptyText(message, max);

const linkPathSchema = z.string().trim().min(1).max(200);
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address")
  .max(320, "Email address is too long");

const infoPairSchema = z.object({
  label: shortLabel("Label is required"),
  value: shortLabel("Value is required", 180),
});

const noteSchema = z.object({
  title: shortLabel("Title is required", 160),
  desc: longText("Description is required", 600),
});

const offeringSchema = z.object({
  title: shortLabel("Title is required", 180),
  desc: longText("Description is required", 600),
  tag: shortLabel("Tag is required", 120),
  note: shortLabel("Note is required", 160),
});

const socialLinkSchema = z.object({
  label: shortLabel("Label is required", 80),
  url: linkPathSchema,
});

const hoursEntrySchema = z.object({
  days: shortLabel("Days label is required", 120),
  time: shortLabel("Hours are required", 120),
});

const locationLineSchema = shortLabel("Address line is required", 180);

export const siteSettingsContentSchema = z.object({
  storeName: shortLabel("Store name is required", 80),
  generalEmail: emailSchema,
  pressEmail: emailSchema,
  phone: shortLabel("Phone is required", 40),
  addressLines: z.array(locationLineSchema).min(3).max(3),
  parkingNotes: z.array(mediumText("Parking note is required", 240)).min(1).max(4),
  hours: z.array(hoursEntrySchema).min(1).max(7),
  navbarStatusLabel: shortLabel("Navbar status label is required", 80),
  locationMapQuery: mediumText("Map query is required", 240),
  socialLinks: z.array(socialLinkSchema).max(6),
});

export const homePageContentSchema = z.object({
  heroEyebrow: shortLabel("Hero eyebrow is required", 80),
  heroTitle: shortLabel("Hero title is required", 160),
  heroAccent: shortLabel("Hero accent is required", 160),
  heroBody: longText("Hero body is required", 500),
  primaryCtaLabel: shortLabel("Primary CTA label is required", 80),
  secondaryCtaLabel: shortLabel("Secondary CTA label is required", 80),
  studioSignals: z.array(infoPairSchema).length(3),
  heroVisualEyebrow: shortLabel("Hero visual eyebrow is required", 80),
  heroFeaturedEyebrow: shortLabel("Hero featured eyebrow is required", 80),
  heroFeaturedTitle: shortLabel("Hero featured title is required", 180),
  heroInteriorEyebrow: shortLabel("Hero interior eyebrow is required", 80),
  heroInteriorTitle: mediumText("Hero interior title is required", 220),
  heroFlagshipEyebrow: shortLabel("Hero flagship eyebrow is required", 80),
  heroFlagshipBody: longText("Hero flagship body is required", 320),
  signatureIntroEyebrow: shortLabel("Signature eyebrow is required", 80),
  signatureIntroTitle: mediumText("Signature title is required", 220),
  signatureIntroBody: longText("Signature body is required", 360),
  menuDirection: z.array(noteSchema).length(3),
  menuDirectionCtaLabel: shortLabel("Menu CTA label is required", 80),
  signatureOfferings: z.array(offeringSchema).length(3),
  signaturePositionEyebrow: shortLabel("Signature position eyebrow is required", 80),
  signaturePositionBody: longText("Signature position body is required", 240),
  atmosphereImageEyebrow: shortLabel("Atmosphere eyebrow is required", 80),
  atmosphereImageTitle: mediumText("Atmosphere image title is required", 220),
  atmosphereEyebrow: shortLabel("Atmosphere eyebrow is required", 80),
  atmosphereTitle: mediumText("Atmosphere title is required", 220),
  atmosphereBody: longText("Atmosphere body is required", 320),
  atmosphereTraits: z.array(noteSchema).length(3),
  atmosphereCtaLabel: shortLabel("Atmosphere CTA label is required", 80),
  flagshipTitle: shortLabel("Flagship title is required", 120),
  flagshipBody: longText("Flagship body is required", 360),
  flagshipStatusLabel: mediumText("Flagship status label is required", 180),
  flagshipCtaLabel: shortLabel("Flagship CTA label is required", 80),
});

export const aboutPageContentSchema = z.object({
  heroEyebrow: shortLabel("Hero eyebrow is required", 80),
  heroTitle: shortLabel("Hero title is required", 180),
  heroAccent: shortLabel("Hero accent is required", 180),
  heroBody: longText("Hero body is required", 500),
  heroSecondaryBody: longText("Secondary hero body is required", 500),
  primaryCtaLabel: shortLabel("Primary CTA label is required", 80),
  secondaryCtaLabel: shortLabel("Secondary CTA label is required", 80),
  storyBlocks: z.array(noteSchema).length(3),
  spatialEyebrow: shortLabel("Spatial eyebrow is required", 80),
  designEyebrow: shortLabel("Design eyebrow is required", 80),
  designTitle: mediumText("Design title is required", 220),
  entryEyebrow: shortLabel("Entry eyebrow is required", 80),
  entryTitle: mediumText("Entry title is required", 220),
  whyEyebrow: shortLabel("Why eyebrow is required", 80),
  whyTitle: mediumText("Why title is required", 180),
  whyBody: longText("Why body is required", 420),
  currentStateEyebrow: shortLabel("Current state eyebrow is required", 80),
  currentStateBody: longText("Current state body is required", 280),
  principlesEyebrow: shortLabel("Principles eyebrow is required", 80),
  principlesTitle: mediumText("Principles title is required", 220),
  principlesBody: longText("Principles body is required", 360),
  principlesCtaLabel: shortLabel("Principles CTA label is required", 80),
  principles: z.array(z.object({
    label: shortLabel("Label is required", 20),
    title: shortLabel("Title is required", 180),
    desc: longText("Description is required", 420),
  })).length(3),
});

export const locationPageContentSchema = z.object({
  heroEyebrow: shortLabel("Hero eyebrow is required", 80),
  heroTitle: shortLabel("Hero title is required", 180),
  heroAccent: shortLabel("Hero accent is required", 180),
  heroBody: longText("Hero body is required", 360),
  locationLabel: shortLabel("Location label is required", 80),
  parkingLabel: shortLabel("Parking label is required", 80),
  hoursLabel: shortLabel("Hours label is required", 80),
  contactLabel: shortLabel("Contact label is required", 80),
  mapPreviewLabel: shortLabel("Map preview label is required", 80),
  mapButtonLabel: shortLabel("Map button label is required", 80),
});

export const galleryPageContentSchema = z.object({
  heroEyebrow: shortLabel("Hero eyebrow is required", 80),
  heroTitle: shortLabel("Hero title is required", 180),
  heroAccent: shortLabel("Hero accent is required", 180),
  heroBody: longText("Hero body is required", 360),
  primaryCtaLabel: shortLabel("Primary CTA label is required", 80),
  gallerySignals: z.array(infoPairSchema).length(3),
  featuredFrameLabel: shortLabel("Featured frame label is required", 80),
  serviceDetailLabel: shortLabel("Service detail label is required", 80),
  visualToneLabel: shortLabel("Visual tone label is required", 80),
  visualToneTitle: mediumText("Visual tone title is required", 180),
  openFrameLabel: shortLabel("Open frame label is required", 80),
  curatedFramesLabel: shortLabel("Curated frames label is required", 80),
  expandedFrameLabel: shortLabel("Expanded frame label is required", 80),
  frames: z.array(z.object({
    title: shortLabel("Frame title is required", 160),
    note: longText("Frame note is required", 320),
  })).length(11),
});

export const contactPageContentSchema = z.object({
  title: shortLabel("Title is required", 120),
  body: longText("Body is required", 360),
  generalLabel: shortLabel("General label is required", 80),
  pressLabel: shortLabel("Press label is required", 120),
  formNameLabel: shortLabel("Name label is required", 80),
  formNamePlaceholder: shortLabel("Name placeholder is required", 80),
  formEmailLabel: shortLabel("Email label is required", 80),
  formEmailPlaceholder: shortLabel("Email placeholder is required", 120),
  formMessageLabel: shortLabel("Message label is required", 80),
  formMessagePlaceholder: mediumText("Message placeholder is required", 180),
  submitLabel: shortLabel("Submit label is required", 80),
  submittingLabel: shortLabel("Submitting label is required", 80),
  successTitle: shortLabel("Success title is required", 80),
  successDescription: mediumText("Success description is required", 180),
  errorTitle: shortLabel("Error title is required", 80),
});

export const footerContentSchema = z.object({
  eyebrow: shortLabel("Footer eyebrow is required", 80),
  brandDescription: longText("Footer description is required", 320),
  emailCtaLabel: shortLabel("Email CTA label is required", 80),
  contactCtaLabel: shortLabel("Contact CTA label is required", 80),
  exploreHeading: shortLabel("Explore heading is required", 80),
  infoHeading: shortLabel("Info heading is required", 80),
  flagshipInfoLabel: shortLabel("Flagship info label is required", 120),
  newsletterEyebrow: shortLabel("Newsletter eyebrow is required", 80),
  newsletterTitle: shortLabel("Newsletter title is required", 120),
  newsletterDescription: longText("Newsletter description is required", 240),
  newsletterPlaceholder: shortLabel("Newsletter placeholder is required", 80),
  newsletterDisclaimer: shortLabel("Newsletter disclaimer is required", 120),
  legalStatusLabel: shortLabel("Legal status label is required", 120),
});

export const privacySectionSchema = z.object({
  heading: shortLabel("Heading is required", 160),
  body: longText("Body is required", 1000),
});

export const privacyPageContentSchema = z.object({
  title: shortLabel("Title is required", 120),
  lastUpdatedLabel: shortLabel("Last updated label is required", 120),
  sections: z.array(privacySectionSchema).min(1).max(12),
});

export const menuPageContentSchema = z.object({
  heroEyebrow: shortLabel("Hero eyebrow is required", 80),
  title: shortLabel("Title is required", 120),
  body: longText("Body is required", 320),
  categoriesHeading: shortLabel("Categories heading is required", 80),
  dietaryHeading: shortLabel("Dietary heading is required", 80),
  dietaryHelperText: mediumText("Dietary helper text is required", 180),
  dietaryNotes: z.array(z.object({
    code: shortLabel("Dietary code is required", 20),
    label: shortLabel("Dietary label is required", 80),
  })).min(1).max(12),
});

export const contentDocumentSchemas = {
  "site-settings": siteSettingsContentSchema,
  "home-page": homePageContentSchema,
  "about-page": aboutPageContentSchema,
  "location-page": locationPageContentSchema,
  "gallery-page": galleryPageContentSchema,
  "contact-page": contactPageContentSchema,
  "footer-content": footerContentSchema,
  "privacy-page": privacyPageContentSchema,
  "menu-page": menuPageContentSchema,
} as const;

export const contentDocumentKeySchema = z.enum([
  "site-settings",
  "home-page",
  "about-page",
  "location-page",
  "gallery-page",
  "contact-page",
  "footer-content",
  "privacy-page",
  "menu-page",
]);

export type ContentDocumentKey = z.infer<typeof contentDocumentKeySchema>;

export type SiteSettingsContent = z.infer<typeof siteSettingsContentSchema>;
export type HomePageContent = z.infer<typeof homePageContentSchema>;
export type AboutPageContent = z.infer<typeof aboutPageContentSchema>;
export type LocationPageContent = z.infer<typeof locationPageContentSchema>;
export type GalleryPageContent = z.infer<typeof galleryPageContentSchema>;
export type ContactPageContent = z.infer<typeof contactPageContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type PrivacyPageContent = z.infer<typeof privacyPageContentSchema>;
export type MenuPageContent = z.infer<typeof menuPageContentSchema>;

export type ContentDocumentPayloadMap = {
  "site-settings": SiteSettingsContent;
  "home-page": HomePageContent;
  "about-page": AboutPageContent;
  "location-page": LocationPageContent;
  "gallery-page": GalleryPageContent;
  "contact-page": ContactPageContent;
  "footer-content": FooterContent;
  "privacy-page": PrivacyPageContent;
  "menu-page": MenuPageContent;
};

export type ContentDocumentPayload = ContentDocumentPayloadMap[ContentDocumentKey];

export const menuItemInputSchema = z.object({
  id: z.string().trim().min(1).max(64).optional(),
  name: shortLabel("Menu item name is required", 120),
  description: longText("Menu item description is required", 320),
  priceLabel: shortLabel("Price label is required", 40),
  badgeCodes: z.array(shortLabel("Badge code is required", 12)).max(8),
  visible: z.boolean(),
});

export const menuCategoryInputSchema = z.object({
  id: z.string().trim().min(1).max(64).optional(),
  title: shortLabel("Category title is required", 120),
  visible: z.boolean(),
  items: z.array(menuItemInputSchema).max(100),
});

export const adminMenuDocumentSchema = z.object({
  page: menuPageContentSchema,
  categories: z.array(menuCategoryInputSchema).min(1).max(20),
});

export type MenuItemInput = z.infer<typeof menuItemInputSchema>;
export type MenuCategoryInput = z.infer<typeof menuCategoryInputSchema>;
export type AdminMenuDocument = z.infer<typeof adminMenuDocumentSchema>;

export const publicContentBootstrapSchema = z.object({
  siteSettings: siteSettingsContentSchema,
  homePage: homePageContentSchema,
  aboutPage: aboutPageContentSchema,
  locationPage: locationPageContentSchema,
  galleryPage: galleryPageContentSchema,
  contactPage: contactPageContentSchema,
  footerContent: footerContentSchema,
  privacyPage: privacyPageContentSchema,
  menu: adminMenuDocumentSchema,
});

export type PublicContentBootstrap = z.infer<typeof publicContentBootstrapSchema>;

export const adminLoginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters").max(200, "Password is too long"),
});

export const adminUserSchema = z.object({
  id: z.number().int().positive(),
  email: emailSchema,
});

export const adminSessionResponseSchema = z.object({
  authenticated: z.boolean(),
  user: adminUserSchema.nullable(),
});

export type AdminLoginRequest = z.infer<typeof adminLoginRequestSchema>;
export type AdminSessionResponse = z.infer<typeof adminSessionResponseSchema>;

export const documentUpdateRequestSchema = z.object({
  payload: z.unknown(),
});

export const contentDocumentRecordResponseSchemas = {
  "site-settings": z.object({
    payload: siteSettingsContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "home-page": z.object({
    payload: homePageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "about-page": z.object({
    payload: aboutPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "location-page": z.object({
    payload: locationPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "gallery-page": z.object({
    payload: galleryPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "contact-page": z.object({
    payload: contactPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "footer-content": z.object({
    payload: footerContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "privacy-page": z.object({
    payload: privacyPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
  "menu-page": z.object({
    payload: menuPageContentSchema,
    updatedAt: z.string().nullable(),
  }),
} as const;

export const adminContentDocumentsResponseSchema = z.object({
  documents: z.object({
    "site-settings": contentDocumentRecordResponseSchemas["site-settings"],
    "home-page": contentDocumentRecordResponseSchemas["home-page"],
    "about-page": contentDocumentRecordResponseSchemas["about-page"],
    "location-page": contentDocumentRecordResponseSchemas["location-page"],
    "gallery-page": contentDocumentRecordResponseSchemas["gallery-page"],
    "contact-page": contentDocumentRecordResponseSchemas["contact-page"],
    "footer-content": contentDocumentRecordResponseSchemas["footer-content"],
    "privacy-page": contentDocumentRecordResponseSchemas["privacy-page"],
    "menu-page": contentDocumentRecordResponseSchemas["menu-page"],
  }),
});

export const adminMenuDocumentResponseSchema = z.object({
  menu: adminMenuDocumentSchema,
  updatedAt: z.string().nullable(),
});

export type AdminContentDocumentsResponse = z.infer<typeof adminContentDocumentsResponseSchema>;
export type AdminMenuDocumentResponse = z.infer<typeof adminMenuDocumentResponseSchema>;
export type ContentDocumentRecordMap = {
  [K in ContentDocumentKey]: {
    payload: ContentDocumentPayloadMap[K];
    updatedAt: string | null;
  };
};
export type ContentDocumentRecord<K extends ContentDocumentKey> = ContentDocumentRecordMap[K];

export const defaultContentDocuments: ContentDocumentPayloadMap = {
  "site-settings": {
    storeName: "Gazelle",
    generalEmail: "hello@gazellecoffee.com",
    pressEmail: "press@gazellecoffee.com",
    phone: "(555) 123-4567",
    addressLines: ["1240 Heritage Avenue", "Suite 101", "Metropolis, NY 10012"],
    parkingNotes: [
      "Street parking available on Heritage Ave.",
      "Complimentary 1-hour parking in the rear lot for guests.",
    ],
    hours: [
      { days: "Monday - Friday", time: "7:00 AM - 6:00 PM" },
      { days: "Saturday", time: "8:00 AM - 6:00 PM" },
      { days: "Sunday", time: "8:00 AM - 4:00 PM" },
    ],
    navbarStatusLabel: "In Development",
    locationMapQuery: "1240 Heritage Avenue, Suite 101, Metropolis, NY 10012",
    socialLinks: [],
  },
  "home-page": {
    heroEyebrow: "Gazelle Brand World",
    heroTitle: "A quieter kind",
    heroAccent: "of coffee luxury.",
    heroBody:
      "Gazelle is a hospitality concept shaped around warmth, restraint, and a strong visual identity. The space, menu, and mood are being designed as one continuous experience.",
    primaryCtaLabel: "Explore Menu",
    secondaryCtaLabel: "Read the Story",
    studioSignals: [
      { label: "Current Phase", value: "Brand Preview" },
      { label: "Menu Focus", value: "Espresso, Matcha, Pastry" },
      { label: "Opening Mode", value: "Flagship in Development" },
    ],
    heroVisualEyebrow: "Spatial Preview",
    heroFeaturedEyebrow: "Featured Ritual",
    heroFeaturedTitle: "Matcha, plated with quiet drama.",
    heroInteriorEyebrow: "Interior Direction",
    heroInteriorTitle: "Curves, stone tones, and softened light shape the mood before the first sip.",
    heroFlagshipEyebrow: "Flagship Note",
    heroFlagshipBody:
      "The physical location is still being finalized, but the world it belongs to is already taking shape.",
    signatureIntroEyebrow: "Signature Offerings",
    signatureIntroTitle: "The menu is being shaped like the room itself.",
    signatureIntroBody:
      "Nothing in Gazelle is meant to feel generic. Each core offering supports the atmosphere rather than competing with it.",
    menuDirection: [
      {
        title: "Espresso First",
        desc: "The signature cup leads the tone of the whole menu: polished, dark-fruited, and restrained.",
      },
      {
        title: "Matcha With Ceremony",
        desc: "Service is meant to feel composed and architectural, not decorative for its own sake.",
      },
      {
        title: "Pastry With Warmth",
        desc: "Texture, aroma, and finish should feel as intentional as the room around them.",
      },
    ],
    menuDirectionCtaLabel: "See the full menu",
    signatureOfferings: [
      {
        title: "The Gazelle Espresso",
        desc: "A house ritual built around dark chocolate depth, wild berry lift, and a polished finish.",
        tag: "House Ritual",
        note: "A concentrated house cup designed to anchor the tone of the full menu.",
      },
      {
        title: "Ceremonial Matcha",
        desc: "First-harvest leaves from Uji, whisked with restraint and served with a softer, more architectural mood.",
        tag: "Quiet Intensity",
        note: "Tea service in development",
      },
      {
        title: "Laminated Pastries",
        desc: "Butter-forward, deeply fragrant, and designed to feel as considered as the room around them.",
        tag: "Morning Finish",
        note: "Morning pastry study",
      },
    ],
    signaturePositionEyebrow: "Signature Position",
    signaturePositionBody: "A concentrated house cup designed to anchor the tone of the full menu.",
    atmosphereImageEyebrow: "Spatial Mood",
    atmosphereImageTitle: "Every surface is meant to support a slower emotional tempo.",
    atmosphereEyebrow: "The Atmosphere",
    atmosphereTitle: "Designed for pause, not noise.",
    atmosphereBody:
      "Gazelle is being built as a place where architecture, menu, and pacing all reinforce the same quiet confidence.",
    atmosphereTraits: [
      {
        title: "Architectural calm",
        desc: "Arches, stone tones, and softened edges create a room that feels composed before a single cup is poured.",
      },
      {
        title: "Slow service energy",
        desc: "The experience is meant to feel intentional, not rushed. The pace is part of the identity.",
      },
      {
        title: "Warm material palette",
        desc: "Cream, brass, walnut, and shadow create the contrast that gives Gazelle its tone.",
      },
    ],
    atmosphereCtaLabel: "Read our story",
    flagshipTitle: "Flagship Update",
    flagshipBody:
      "Gazelle's first physical location is still being finalized. Join the list for launch timing, preview events, and opening details.",
    flagshipStatusLabel: "Location details coming soon",
    flagshipCtaLabel: "See the Preview",
  },
  "about-page": {
    heroEyebrow: "Brand Intent",
    heroTitle: "A brand being shaped",
    heroAccent: "with restraint.",
    heroBody:
      "Gazelle began as a desire to build a coffee experience that feels warmer, slower, and more architecturally composed than the usual cafe formula.",
    heroSecondaryBody:
      "This is still a brand in development. What you see here is the philosophy, visual language, and emotional direction that will shape the final physical experience.",
    primaryCtaLabel: "View Atmosphere",
    secondaryCtaLabel: "See Menu Direction",
    storyBlocks: [
      {
        title: "Brand before launch",
        desc: "Gazelle is still in development, so this page is not a founder myth or a completed company history. It is a clear statement of intent for what the brand is trying to become.",
      },
      {
        title: "Experience as one system",
        desc: "The room, the menu, the pacing, and the visual identity are being designed together. The goal is not to make separate things look coordinated, but to make them feel inseparable.",
      },
      {
        title: "Built for a certain mood",
        desc: "Warmth, restraint, and confidence are the qualities driving the project. Gazelle should feel memorable because it is considered, not because it is loud.",
      },
    ],
    spatialEyebrow: "Spatial Language",
    designEyebrow: "Design Direction",
    designTitle: "Gazelle is meant to feel intimate, composed, and quietly cinematic.",
    entryEyebrow: "Entry Mood",
    entryTitle: "Soft thresholds, arches, and a calmer visual tempo.",
    whyEyebrow: "Why It Exists",
    whyTitle: "Not louder. More deliberate.",
    whyBody:
      "Gazelle is being designed for people who want atmosphere, service, and menu choices to feel connected. The identity works only if those parts reinforce one another.",
    currentStateEyebrow: "Current State",
    currentStateBody:
      "A clear visual and experiential direction is in place. The goal now is refinement, not invention from scratch.",
    principlesEyebrow: "What Guides It",
    principlesTitle: "Three principles shape the whole project.",
    principlesBody:
      "The visual identity is only useful if it helps define how Gazelle should feel. These principles are the filter for every design decision.",
    principlesCtaLabel: "Talk to Gazelle",
    principles: [
      {
        label: "01",
        title: "Quiet hospitality",
        desc: "Gazelle is being shaped around a slower emotional tempo. Service, sound, and pacing should feel composed rather than performative.",
      },
      {
        label: "02",
        title: "Architectural warmth",
        desc: "Curves, stone tones, softened edges, and material contrast are part of the identity, not a backdrop added after the fact.",
      },
      {
        label: "03",
        title: "Menu restraint",
        desc: "The menu is meant to feel focused and deliberate. Fewer things, done with clarity, gives the brand a stronger point of view.",
      },
    ],
  },
  "location-page": {
    heroEyebrow: "Visit Gazelle",
    heroTitle: "Location details",
    heroAccent: "for layout review.",
    heroBody:
      "The page below uses placeholder address and service information so the location experience can be designed with complete content.",
    locationLabel: "Location",
    parkingLabel: "Parking Notes",
    hoursLabel: "Hours",
    contactLabel: "Contact",
    mapPreviewLabel: "Map Preview",
    mapButtonLabel: "Open in Maps",
  },
  "gallery-page": {
    heroEyebrow: "Atmosphere Gallery",
    heroTitle: "Spatial studies",
    heroAccent: "for Gazelle.",
    heroBody: "A quieter read of the Gazelle world through light, material, and spatial rhythm.",
    primaryCtaLabel: "See the Location",
    gallerySignals: [
      { label: "Render Count", value: "11 spatial studies" },
      { label: "Tone", value: "Warm, restrained, cinematic" },
      { label: "Focus", value: "Arches, light, material calm" },
    ],
    featuredFrameLabel: "Featured Frame",
    serviceDetailLabel: "Service Detail",
    visualToneLabel: "Visual Tone",
    visualToneTitle: "Quiet, tactile, and cinematic.",
    openFrameLabel: "Open Frame",
    curatedFramesLabel: "Curated Frames",
    expandedFrameLabel: "Expanded Frame",
    frames: [
      {
        title: "Main dining room",
        note: "Long sightlines and softened light establish the room before any service moment begins.",
      },
      {
        title: "Counter study",
        note: "Service architecture is treated as part of the identity, not just back-of-house function.",
      },
      {
        title: "Light and seating",
        note: "The room is meant to feel calm even when it is fully occupied.",
      },
      {
        title: "Material detail",
        note: "Stone, edge softness, and warm contrast give the space its tactile rhythm.",
      },
      {
        title: "Brand wall",
        note: "Identity marks are integrated into the space rather than applied on top of it.",
      },
      {
        title: "Dining perspective",
        note: "A quieter cafe experience depends on spatial pacing as much as menu design.",
      },
      {
        title: "Ceiling rhythm",
        note: "Lighting works here as atmosphere, not visual spectacle.",
      },
      {
        title: "Window edge",
        note: "Perimeter seating is part of the emotional tempo of the room.",
      },
      {
        title: "Arrival sequence",
        note: "The threshold into Gazelle should feel softened, deliberate, and memorable.",
      },
      {
        title: "Service station",
        note: "Operational moments are still designed to feel aligned with the larger mood.",
      },
      {
        title: "Architectural repeat",
        note: "Repeated curves create the calm visual language running through the whole brand world.",
      },
    ],
  },
  "contact-page": {
    title: "Get in Touch",
    body: "Inquiries regarding private events, wholesale partnerships, or general questions are welcome.",
    generalLabel: "General",
    pressLabel: "Press & Partnerships",
    formNameLabel: "Name",
    formNamePlaceholder: "Jane Doe",
    formEmailLabel: "Email",
    formEmailPlaceholder: "jane@example.com",
    formMessageLabel: "Message",
    formMessagePlaceholder: "How can we help you?",
    submitLabel: "Send Message",
    submittingLabel: "Sending...",
    successTitle: "Message Sent",
    successDescription: "We've received your message and will be in touch shortly.",
    errorTitle: "Error",
  },
  "footer-content": {
    eyebrow: "Brand Preview",
    brandDescription:
      "Quiet luxury. Bold coffee. A warm, architectural brand world still being refined before launch.",
    emailCtaLabel: "Email Gazelle",
    contactCtaLabel: "Contact Page",
    exploreHeading: "Explore",
    infoHeading: "Info",
    flagshipInfoLabel: "Flagship details coming soon",
    newsletterEyebrow: "The Dispatch",
    newsletterTitle: "Stay close to the launch.",
    newsletterDescription:
      "Subscribe for opening updates, seasonal menu notes, and future tasting invitations.",
    newsletterPlaceholder: "Email address",
    newsletterDisclaimer: "No spam. Just meaningful updates.",
    legalStatusLabel: "Design phase in progress",
  },
  "privacy-page": {
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated: March 3, 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body:
          "We collect information you provide directly to us when you subscribe to our newsletter or submit the contact form. This may include your name, email address, and the contents of your message.",
      },
      {
        heading: "2. How We Use Information",
        body:
          "We use this information to respond to inquiries, send newsletter updates you requested, and understand interest in the Gazelle concept. We do not sell or rent your personal information to third parties.",
      },
      {
        heading: "3. Communication Preferences",
        body:
          "You may opt out of promotional emails at any time by using the unsubscribe link in those emails or by contacting us directly.",
      },
      {
        heading: "4. Questions",
        body: "If you have privacy questions or want your submitted data removed, email hello@gazellecoffee.com.",
      },
    ],
  },
  "menu-page": {
    heroEyebrow: "Gazelle Menu",
    title: "The Menu",
    body:
      "A focused offering built around espresso, matcha, tea, and pastry. The menu stays intentionally narrow so each item can feel considered.",
    categoriesHeading: "Categories",
    dietaryHeading: "Dietary Notes",
    dietaryHelperText: "Oat, almond, and macadamia milk available upon request.",
    dietaryNotes: [
      { code: "VG", label: "Vegan" },
      { code: "GF", label: "Gluten Free" },
      { code: "DF", label: "Dairy Free" },
    ],
  },
};

export const defaultMenuDocument: AdminMenuDocument = {
  page: defaultContentDocuments["menu-page"],
  categories: [
    {
      title: "Espresso",
      visible: true,
      items: [
        { name: "Espresso", description: "Double shot of our signature Gazelle blend.", priceLabel: "$4.00", badgeCodes: [], visible: true },
        { name: "Macchiato", description: "Double espresso with a dash of steamed milk.", priceLabel: "$4.50", badgeCodes: [], visible: true },
        { name: "Cortado", description: "Equal parts espresso and steamed milk.", priceLabel: "$4.75", badgeCodes: [], visible: true },
        { name: "Flat White", description: "Silky textured milk over a double shot.", priceLabel: "$5.00", badgeCodes: [], visible: true },
        { name: "Cappuccino", description: "Rich espresso topped with deep foam.", priceLabel: "$5.00", badgeCodes: [], visible: true },
        { name: "Latte", description: "Espresso with steamed milk and a light foam layer.", priceLabel: "$5.50", badgeCodes: [], visible: true },
      ],
    },
    {
      title: "Filter & Pour",
      visible: true,
      items: [
        { name: "Pour Over", description: "Rotating selection of single-origin beans. Please ask your barista.", priceLabel: "$6.00+", badgeCodes: [], visible: true },
        { name: "Batch Brew", description: "Our daily drip coffee.", priceLabel: "$3.50", badgeCodes: [], visible: true },
        { name: "Cold Brew", description: "Slow-steeped for 18 hours. Smooth and bold.", priceLabel: "$5.00", badgeCodes: [], visible: true },
      ],
    },
    {
      title: "Tea & Botanical",
      visible: true,
      items: [
        { name: "Ceremonial Matcha", description: "Whisked with water or your choice of milk.", priceLabel: "$6.50", badgeCodes: ["DF", "VG"], visible: true },
        { name: "Hojicha Latte", description: "Roasted green tea with steamed milk.", priceLabel: "$6.00", badgeCodes: [], visible: true },
        { name: "Loose Leaf Tea", description: "Earl Grey, Jasmine, Chamomile, or Peppermint.", priceLabel: "$4.50", badgeCodes: [], visible: true },
        { name: "Golden Milk", description: "Turmeric, ginger, black pepper, and honey.", priceLabel: "$5.50", badgeCodes: ["GF"], visible: true },
      ],
    },
    {
      title: "Pastries",
      visible: true,
      items: [
        { name: "Butter Croissant", description: "Classic, flaky, baked fresh daily.", priceLabel: "$4.50", badgeCodes: [], visible: true },
        { name: "Almond Croissant", description: "Filled with almond frangipane.", priceLabel: "$5.50", badgeCodes: [], visible: true },
        { name: "Cardamom Bun", description: "Sweet dough laced with freshly ground cardamom.", priceLabel: "$4.75", badgeCodes: ["VG"], visible: true },
        { name: "Olive Oil Cake", description: "Moist, dense, with a hint of lemon.", priceLabel: "$5.00", badgeCodes: [], visible: true },
      ],
    },
  ],
};

export function buildDefaultPublicContentBootstrap(): PublicContentBootstrap {
  return {
    siteSettings: defaultContentDocuments["site-settings"],
    homePage: defaultContentDocuments["home-page"],
    aboutPage: defaultContentDocuments["about-page"],
    locationPage: defaultContentDocuments["location-page"],
    galleryPage: defaultContentDocuments["gallery-page"],
    contactPage: defaultContentDocuments["contact-page"],
    footerContent: defaultContentDocuments["footer-content"],
    privacyPage: defaultContentDocuments["privacy-page"],
    menu: defaultMenuDocument,
  };
}
