import { useEffect, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useLocation } from "wouter";
import type {
  ContentDocumentKey,
  ContentDocumentRecord,
  ContentDocumentPayloadMap,
} from "@shared/content";
import { LogOut } from "lucide-react";
import {
  useAdminContentDocuments,
  useAdminLogout,
  useAdminMenuDocument,
  useAdminSession,
  useUpdateAdminContentDocument,
} from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import { useUnsavedWarning } from "@/hooks/use-unsaved-warning";
import {
  AdminField,
  AdminGrid,
  AdminInput,
  AdminPageShell,
  AdminPrimaryButton,
  AdminSecondaryButton,
  AdminSectionCard,
  AdminStatusPill,
  AdminSubCard,
  AdminTextarea,
} from "@/components/admin/fields";
import { MenuEditor } from "@/components/admin/menu-editor";

type DocumentEditorProps<K extends ContentDocumentKey> = {
  id: string;
  documentKey: K;
  title: string;
  description: string;
  record: ContentDocumentRecord<K>;
  children: (
    value: ContentDocumentPayloadMap[K],
    setValue: Dispatch<SetStateAction<ContentDocumentPayloadMap[K]>>,
  ) => ReactNode;
};

function DocumentEditorSection<K extends ContentDocumentKey>({
  id,
  documentKey,
  title,
  description,
  record,
  children,
}: DocumentEditorProps<K>) {
  const { toast } = useToast();
  const mutation = useUpdateAdminContentDocument(documentKey);
  const [value, setValue] = useState<ContentDocumentPayloadMap[K]>(record.payload);

  useEffect(() => {
    setValue(record.payload);
  }, [record.payload, record.updatedAt]);

  const isDirty = useMemo(
    () => JSON.stringify(value) !== JSON.stringify(record.payload),
    [value, record.payload],
  );

  useUnsavedWarning(isDirty);

  return (
    <AdminSectionCard
      id={id}
      title={title}
      description={description}
      actions={
        <>
          <AdminStatusPill tone={isDirty ? "dirty" : "saved"}>
            {isDirty ? "Unsaved changes" : "Saved"}
          </AdminStatusPill>
          <AdminPrimaryButton
            type="button"
            disabled={!isDirty || mutation.isPending}
            onClick={() =>
              mutation.mutate(value, {
                onSuccess: () => {
                  toast({
                    title: `${title} updated`,
                    description: "Changes are now live on the public site.",
                  });
                },
                onError: (error) => {
                  toast({
                    variant: "destructive",
                    title: `${title} save failed`,
                    description: error.message,
                  });
                },
              })
            }
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </AdminPrimaryButton>
        </>
      }
    >
      {children(value, setValue)}
    </AdminSectionCard>
  );
}

function moveArrayItem<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(index, 1);
  nextItems.splice(nextIndex, 0, item);
  return nextItems;
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const sessionQuery = useAdminSession();
  const contentQuery = useAdminContentDocuments();
  const menuQuery = useAdminMenuDocument();
  const logoutMutation = useAdminLogout();

  useEffect(() => {
    if (sessionQuery.data && !sessionQuery.data.authenticated) {
      navigate("/admin/login");
    }
  }, [navigate, sessionQuery.data]);

  if (sessionQuery.isLoading || contentQuery.isLoading || menuQuery.isLoading) {
    return (
      <AdminPageShell>
        <div className="rounded-[2rem] border border-[#9F7965]/20 bg-white/85 p-8 text-[#6e5e55] shadow-[0_18px_50px_rgba(36,35,39,0.08)]">
          Loading admin workspace...
        </div>
      </AdminPageShell>
    );
  }

  if (sessionQuery.error || contentQuery.error || menuQuery.error) {
    const message =
      sessionQuery.error?.message ||
      contentQuery.error?.message ||
      menuQuery.error?.message ||
      "Something went wrong.";

    return (
      <AdminPageShell>
        <AdminSectionCard title="Admin unavailable" description={message}>
          <p className="text-sm leading-relaxed text-[#6e5e55]">
            Make sure `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are configured, then run
            ` npm run admin:seed ` before signing in.
          </p>
        </AdminSectionCard>
      </AdminPageShell>
    );
  }

  if (!sessionQuery.data?.authenticated || !contentQuery.data || !menuQuery.data) {
    return null;
  }

  const documents = contentQuery.data.documents;

  const sectionLinks = [
    { id: "site-settings", label: "Site Settings" },
    { id: "home-page", label: "Home" },
    { id: "about-page", label: "About" },
    { id: "location-page", label: "Location" },
    { id: "gallery-page", label: "Gallery" },
    { id: "contact-page", label: "Contact" },
    { id: "footer-content", label: "Footer" },
    { id: "privacy-page", label: "Privacy" },
    { id: "menu", label: "Menu" },
  ];

  return (
    <AdminPageShell>
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[2rem] border border-[#9F7965]/20 bg-[#242327] p-5 text-[#f4ece6] shadow-[0_18px_48px_rgba(36,35,39,0.18)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#C0987E]">Gazelle Admin</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Owner content workspace
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#eaded6]">
              Signed in as {sessionQuery.data.user?.email}. Save any section to publish it immediately.
            </p>

            <nav className="mt-6 space-y-2">
              {sectionLinks.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-[#C0987E]/50 hover:text-[#C0987E]"
                >
                  {section.label}
                </a>
              ))}
            </nav>

            <AdminSecondaryButton
              type="button"
              className="mt-6 w-full border-white/10 bg-white/5 text-[#f4ece6] hover:border-[#C0987E]/40 hover:text-[#C0987E]"
              onClick={() =>
                logoutMutation.mutate(undefined, {
                  onSuccess: () => {
                    toast({
                      title: "Signed out",
                      description: "The admin session has been closed.",
                    });
                    navigate("/admin/login");
                  },
                  onError: (error) => {
                    toast({
                      variant: "destructive",
                      title: "Sign-out failed",
                      description: error.message,
                    });
                  },
                })
              }
              disabled={logoutMutation.isPending}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logoutMutation.isPending ? "Signing out..." : "Sign out"}
            </AdminSecondaryButton>
          </div>
        </aside>

        <div className="space-y-6">
          <DocumentEditorSection
            id="site-settings"
            documentKey="site-settings"
            title="Site Settings"
            description="Global business details used across the location, contact, footer, and navbar."
            record={documents["site-settings"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Store Name">
                    <AdminInput
                      value={value.storeName}
                      onChange={(event) => setValue((current) => ({ ...current, storeName: event.target.value }))}
                    />
                  </AdminField>
                  <AdminField label="Navbar Status Label">
                    <AdminInput
                      value={value.navbarStatusLabel}
                      onChange={(event) =>
                        setValue((current) => ({ ...current, navbarStatusLabel: event.target.value }))
                      }
                    />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="General Email">
                    <AdminInput
                      type="email"
                      value={value.generalEmail}
                      onChange={(event) =>
                        setValue((current) => ({ ...current, generalEmail: event.target.value }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Press Email">
                    <AdminInput
                      type="email"
                      value={value.pressEmail}
                      onChange={(event) =>
                        setValue((current) => ({ ...current, pressEmail: event.target.value }))
                      }
                    />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="Phone">
                    <AdminInput
                      value={value.phone}
                      onChange={(event) => setValue((current) => ({ ...current, phone: event.target.value }))}
                    />
                  </AdminField>
                  <AdminField label="Map Query">
                    <AdminInput
                      value={value.locationMapQuery}
                      onChange={(event) =>
                        setValue((current) => ({ ...current, locationMapQuery: event.target.value }))
                      }
                    />
                  </AdminField>
                </AdminGrid>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Address</h3>
                  {value.addressLines.map((line, index) => (
                    <AdminField key={`address-line-${index}`} label={`Address Line ${index + 1}`}>
                      <AdminInput
                        value={line}
                        onChange={(event) =>
                          setValue((current) => ({
                            ...current,
                            addressLines: current.addressLines.map((currentLine, currentIndex) =>
                              currentIndex === index ? event.target.value : currentLine,
                            ),
                          }))
                        }
                      />
                    </AdminField>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">
                      Parking Notes
                    </h3>
                    <AdminSecondaryButton
                      type="button"
                      onClick={() =>
                        setValue((current) => ({
                          ...current,
                          parkingNotes: [...current.parkingNotes, "New parking note"],
                        }))
                      }
                    >
                      Add note
                    </AdminSecondaryButton>
                  </div>
                  {value.parkingNotes.map((note, index) => (
                    <AdminSubCard key={`parking-note-${index}`}>
                      <AdminTextarea
                        value={note}
                        onChange={(event) =>
                          setValue((current) => ({
                            ...current,
                            parkingNotes: current.parkingNotes.map((currentNote, currentIndex) =>
                              currentIndex === index ? event.target.value : currentNote,
                            ),
                          }))
                        }
                      />
                      <div className="mt-3 flex justify-end">
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            setValue((current) => ({
                              ...current,
                              parkingNotes: current.parkingNotes.filter((_, currentIndex) => currentIndex !== index),
                            }))
                          }
                        >
                          Remove
                        </AdminSecondaryButton>
                      </div>
                    </AdminSubCard>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Hours</h3>
                    <AdminSecondaryButton
                      type="button"
                      onClick={() =>
                        setValue((current) => ({
                          ...current,
                          hours: [...current.hours, { days: "New Day Range", time: "9:00 AM - 5:00 PM" }],
                        }))
                      }
                    >
                      Add hours row
                    </AdminSecondaryButton>
                  </div>
                  {value.hours.map((entry, index) => (
                    <AdminSubCard key={`hours-${index}`}>
                      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                        <AdminField label="Days">
                          <AdminInput
                            value={entry.days}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                hours: current.hours.map((currentEntry, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentEntry, days: event.target.value }
                                    : currentEntry,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="Time">
                          <AdminInput
                            value={entry.time}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                hours: current.hours.map((currentEntry, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentEntry, time: event.target.value }
                                    : currentEntry,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <div className="flex items-end">
                          <AdminSecondaryButton
                            type="button"
                            onClick={() =>
                              setValue((current) => ({
                                ...current,
                                hours: current.hours.filter((_, currentIndex) => currentIndex !== index),
                              }))
                            }
                          >
                            Remove
                          </AdminSecondaryButton>
                        </div>
                      </div>
                    </AdminSubCard>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">
                      Social Links
                    </h3>
                    <AdminSecondaryButton
                      type="button"
                      onClick={() =>
                        setValue((current) => ({
                          ...current,
                          socialLinks: [...current.socialLinks, { label: "Instagram", url: "https://instagram.com/" }],
                        }))
                      }
                    >
                      Add link
                    </AdminSecondaryButton>
                  </div>
                  {value.socialLinks.map((link, index) => (
                    <AdminSubCard key={`${link.label}-${index}`}>
                      <div className="grid gap-3 md:grid-cols-[14rem_1fr_auto]">
                        <AdminField label="Label">
                          <AdminInput
                            value={link.label}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                socialLinks: current.socialLinks.map((currentLink, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentLink, label: event.target.value }
                                    : currentLink,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="URL">
                          <AdminInput
                            value={link.url}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                socialLinks: current.socialLinks.map((currentLink, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentLink, url: event.target.value }
                                    : currentLink,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <div className="flex items-end">
                          <AdminSecondaryButton
                            type="button"
                            onClick={() =>
                              setValue((current) => ({
                                ...current,
                                socialLinks: current.socialLinks.filter((_, currentIndex) => currentIndex !== index),
                              }))
                            }
                          >
                            Remove
                          </AdminSecondaryButton>
                        </div>
                      </div>
                    </AdminSubCard>
                  ))}
                </div>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="home-page"
            documentKey="home-page"
            title="Home Page"
            description="Control the homepage story, hero copy, signature content, and closing flagship section."
            record={documents["home-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Hero Eyebrow">
                    <AdminInput value={value.heroEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Hero Title">
                    <AdminInput value={value.heroTitle} onChange={(event) => setValue((current) => ({ ...current, heroTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Hero Accent">
                    <AdminInput value={value.heroAccent} onChange={(event) => setValue((current) => ({ ...current, heroAccent: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Primary CTA Label">
                    <AdminInput value={value.primaryCtaLabel} onChange={(event) => setValue((current) => ({ ...current, primaryCtaLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Hero Body">
                  <AdminTextarea value={value.heroBody} onChange={(event) => setValue((current) => ({ ...current, heroBody: event.target.value }))} />
                </AdminField>
                <AdminField label="Secondary CTA Label">
                  <AdminInput value={value.secondaryCtaLabel} onChange={(event) => setValue((current) => ({ ...current, secondaryCtaLabel: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Studio Signals</h3>
                  {value.studioSignals.map((signal, index) => (
                    <AdminSubCard key={`${signal.label}-${index}`}>
                      <AdminGrid>
                        <AdminField label="Label">
                          <AdminInput
                            value={signal.label}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                studioSignals: current.studioSignals.map((currentSignal, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentSignal, label: event.target.value }
                                    : currentSignal,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="Value">
                          <AdminInput
                            value={signal.value}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                studioSignals: current.studioSignals.map((currentSignal, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentSignal, value: event.target.value }
                                    : currentSignal,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                      </AdminGrid>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminGrid>
                  <AdminField label="Hero Visual Eyebrow">
                    <AdminInput value={value.heroVisualEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroVisualEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Interior Eyebrow">
                    <AdminInput value={value.heroInteriorEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroInteriorEyebrow: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Interior Title">
                  <AdminTextarea value={value.heroInteriorTitle} onChange={(event) => setValue((current) => ({ ...current, heroInteriorTitle: event.target.value }))} className="min-h-[6rem]" />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Flagship Eyebrow">
                    <AdminInput value={value.heroFlagshipEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroFlagshipEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Flagship Body">
                    <AdminTextarea value={value.heroFlagshipBody} onChange={(event) => setValue((current) => ({ ...current, heroFlagshipBody: event.target.value }))} className="min-h-[6rem]" />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="Signature Intro Eyebrow">
                    <AdminInput value={value.signatureIntroEyebrow} onChange={(event) => setValue((current) => ({ ...current, signatureIntroEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Signature Intro Title">
                    <AdminInput value={value.signatureIntroTitle} onChange={(event) => setValue((current) => ({ ...current, signatureIntroTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Signature Intro Body">
                  <AdminTextarea value={value.signatureIntroBody} onChange={(event) => setValue((current) => ({ ...current, signatureIntroBody: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Menu Direction</h3>
                  {value.menuDirection.map((item, index) => (
                    <AdminSubCard key={`${item.title}-${index}`}>
                      <AdminField label={`Direction ${index + 1} Title`}>
                        <AdminInput
                          value={item.title}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              menuDirection: current.menuDirection.map((currentItem, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentItem, title: event.target.value }
                                  : currentItem,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label={`Direction ${index + 1} Description`}>
                        <AdminTextarea
                          value={item.desc}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              menuDirection: current.menuDirection.map((currentItem, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentItem, desc: event.target.value }
                                  : currentItem,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminField label="Menu Direction CTA Label">
                  <AdminInput value={value.menuDirectionCtaLabel} onChange={(event) => setValue((current) => ({ ...current, menuDirectionCtaLabel: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Signature Offerings</h3>
                  {value.signatureOfferings.map((offering, index) => (
                    <AdminSubCard key={`${offering.title}-${index}`}>
                      <AdminGrid>
                        <AdminField label="Tag">
                          <AdminInput
                            value={offering.tag}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                signatureOfferings: current.signatureOfferings.map((currentOffering, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentOffering, tag: event.target.value }
                                    : currentOffering,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="Title">
                          <AdminInput
                            value={offering.title}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                signatureOfferings: current.signatureOfferings.map((currentOffering, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentOffering, title: event.target.value }
                                    : currentOffering,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                      </AdminGrid>
                      <AdminField label="Description">
                        <AdminTextarea
                          value={offering.desc}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              signatureOfferings: current.signatureOfferings.map((currentOffering, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentOffering, desc: event.target.value }
                                  : currentOffering,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label="Supporting Note">
                        <AdminInput
                          value={offering.note}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              signatureOfferings: current.signatureOfferings.map((currentOffering, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentOffering, note: event.target.value }
                                  : currentOffering,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminGrid>
                  <AdminField label="Signature Position Eyebrow">
                    <AdminInput value={value.signaturePositionEyebrow} onChange={(event) => setValue((current) => ({ ...current, signaturePositionEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Signature Position Body">
                    <AdminTextarea value={value.signaturePositionBody} onChange={(event) => setValue((current) => ({ ...current, signaturePositionBody: event.target.value }))} className="min-h-[6rem]" />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="Atmosphere Image Eyebrow">
                    <AdminInput value={value.atmosphereImageEyebrow} onChange={(event) => setValue((current) => ({ ...current, atmosphereImageEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Atmosphere Image Title">
                    <AdminTextarea value={value.atmosphereImageTitle} onChange={(event) => setValue((current) => ({ ...current, atmosphereImageTitle: event.target.value }))} className="min-h-[6rem]" />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Atmosphere Eyebrow">
                    <AdminInput value={value.atmosphereEyebrow} onChange={(event) => setValue((current) => ({ ...current, atmosphereEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Atmosphere Title">
                    <AdminInput value={value.atmosphereTitle} onChange={(event) => setValue((current) => ({ ...current, atmosphereTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Atmosphere Body">
                  <AdminTextarea value={value.atmosphereBody} onChange={(event) => setValue((current) => ({ ...current, atmosphereBody: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Atmosphere Traits</h3>
                  {value.atmosphereTraits.map((trait, index) => (
                    <AdminSubCard key={`${trait.title}-${index}`}>
                      <AdminField label={`Trait ${index + 1} Title`}>
                        <AdminInput
                          value={trait.title}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              atmosphereTraits: current.atmosphereTraits.map((currentTrait, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentTrait, title: event.target.value }
                                  : currentTrait,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label={`Trait ${index + 1} Description`}>
                        <AdminTextarea
                          value={trait.desc}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              atmosphereTraits: current.atmosphereTraits.map((currentTrait, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentTrait, desc: event.target.value }
                                  : currentTrait,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminGrid>
                  <AdminField label="Atmosphere CTA Label">
                    <AdminInput value={value.atmosphereCtaLabel} onChange={(event) => setValue((current) => ({ ...current, atmosphereCtaLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Flagship Title">
                    <AdminInput value={value.flagshipTitle} onChange={(event) => setValue((current) => ({ ...current, flagshipTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Flagship Body">
                  <AdminTextarea value={value.flagshipBody} onChange={(event) => setValue((current) => ({ ...current, flagshipBody: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Flagship Status Label">
                    <AdminInput value={value.flagshipStatusLabel} onChange={(event) => setValue((current) => ({ ...current, flagshipStatusLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Flagship CTA Label">
                    <AdminInput value={value.flagshipCtaLabel} onChange={(event) => setValue((current) => ({ ...current, flagshipCtaLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="about-page"
            documentKey="about-page"
            title="About Page"
            description="Control the About page story, principles, and supporting section labels."
            record={documents["about-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Hero Eyebrow">
                    <AdminInput value={value.heroEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Hero Title">
                    <AdminInput value={value.heroTitle} onChange={(event) => setValue((current) => ({ ...current, heroTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Hero Accent">
                    <AdminInput value={value.heroAccent} onChange={(event) => setValue((current) => ({ ...current, heroAccent: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Primary CTA Label">
                    <AdminInput value={value.primaryCtaLabel} onChange={(event) => setValue((current) => ({ ...current, primaryCtaLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Hero Body">
                  <AdminTextarea value={value.heroBody} onChange={(event) => setValue((current) => ({ ...current, heroBody: event.target.value }))} />
                </AdminField>
                <AdminField label="Hero Secondary Body">
                  <AdminTextarea value={value.heroSecondaryBody} onChange={(event) => setValue((current) => ({ ...current, heroSecondaryBody: event.target.value }))} />
                </AdminField>
                <AdminField label="Secondary CTA Label">
                  <AdminInput value={value.secondaryCtaLabel} onChange={(event) => setValue((current) => ({ ...current, secondaryCtaLabel: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Story Blocks</h3>
                  {value.storyBlocks.map((block, index) => (
                    <AdminSubCard key={`${block.title}-${index}`}>
                      <AdminField label={`Block ${index + 1} Title`}>
                        <AdminInput
                          value={block.title}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              storyBlocks: current.storyBlocks.map((currentBlock, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentBlock, title: event.target.value }
                                  : currentBlock,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label={`Block ${index + 1} Description`}>
                        <AdminTextarea
                          value={block.desc}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              storyBlocks: current.storyBlocks.map((currentBlock, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentBlock, desc: event.target.value }
                                  : currentBlock,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminGrid>
                  <AdminField label="Spatial Eyebrow">
                    <AdminInput value={value.spatialEyebrow} onChange={(event) => setValue((current) => ({ ...current, spatialEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Design Eyebrow">
                    <AdminInput value={value.designEyebrow} onChange={(event) => setValue((current) => ({ ...current, designEyebrow: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Design Title">
                  <AdminTextarea value={value.designTitle} onChange={(event) => setValue((current) => ({ ...current, designTitle: event.target.value }))} className="min-h-[6rem]" />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Entry Eyebrow">
                    <AdminInput value={value.entryEyebrow} onChange={(event) => setValue((current) => ({ ...current, entryEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Entry Title">
                    <AdminTextarea value={value.entryTitle} onChange={(event) => setValue((current) => ({ ...current, entryTitle: event.target.value }))} className="min-h-[6rem]" />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="Why Eyebrow">
                    <AdminInput value={value.whyEyebrow} onChange={(event) => setValue((current) => ({ ...current, whyEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Why Title">
                    <AdminInput value={value.whyTitle} onChange={(event) => setValue((current) => ({ ...current, whyTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Why Body">
                  <AdminTextarea value={value.whyBody} onChange={(event) => setValue((current) => ({ ...current, whyBody: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Current State Eyebrow">
                    <AdminInput value={value.currentStateEyebrow} onChange={(event) => setValue((current) => ({ ...current, currentStateEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Current State Body">
                    <AdminTextarea value={value.currentStateBody} onChange={(event) => setValue((current) => ({ ...current, currentStateBody: event.target.value }))} className="min-h-[6rem]" />
                  </AdminField>
                </AdminGrid>

                <AdminGrid>
                  <AdminField label="Principles Eyebrow">
                    <AdminInput value={value.principlesEyebrow} onChange={(event) => setValue((current) => ({ ...current, principlesEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Principles Title">
                    <AdminInput value={value.principlesTitle} onChange={(event) => setValue((current) => ({ ...current, principlesTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Principles Body">
                  <AdminTextarea value={value.principlesBody} onChange={(event) => setValue((current) => ({ ...current, principlesBody: event.target.value }))} />
                </AdminField>
                <AdminField label="Principles CTA Label">
                  <AdminInput value={value.principlesCtaLabel} onChange={(event) => setValue((current) => ({ ...current, principlesCtaLabel: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Principles</h3>
                  {value.principles.map((principle, index) => (
                    <AdminSubCard key={`${principle.label}-${index}`}>
                      <AdminGrid>
                        <AdminField label="Label">
                          <AdminInput
                            value={principle.label}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                principles: current.principles.map((currentPrinciple, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentPrinciple, label: event.target.value }
                                    : currentPrinciple,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="Title">
                          <AdminInput
                            value={principle.title}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                principles: current.principles.map((currentPrinciple, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentPrinciple, title: event.target.value }
                                    : currentPrinciple,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                      </AdminGrid>
                      <AdminField label="Description">
                        <AdminTextarea
                          value={principle.desc}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              principles: current.principles.map((currentPrinciple, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentPrinciple, desc: event.target.value }
                                  : currentPrinciple,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="location-page"
            documentKey="location-page"
            title="Location Page"
            description="Update the location page intro and section labels. Address, parking, hours, and contact values come from Site Settings."
            record={documents["location-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Hero Eyebrow">
                    <AdminInput value={value.heroEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Hero Title">
                    <AdminInput value={value.heroTitle} onChange={(event) => setValue((current) => ({ ...current, heroTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Hero Accent">
                    <AdminInput value={value.heroAccent} onChange={(event) => setValue((current) => ({ ...current, heroAccent: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Map Preview Label">
                    <AdminInput value={value.mapPreviewLabel} onChange={(event) => setValue((current) => ({ ...current, mapPreviewLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Hero Body">
                  <AdminTextarea value={value.heroBody} onChange={(event) => setValue((current) => ({ ...current, heroBody: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Location Label">
                    <AdminInput value={value.locationLabel} onChange={(event) => setValue((current) => ({ ...current, locationLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Parking Label">
                    <AdminInput value={value.parkingLabel} onChange={(event) => setValue((current) => ({ ...current, parkingLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Hours Label">
                    <AdminInput value={value.hoursLabel} onChange={(event) => setValue((current) => ({ ...current, hoursLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Contact Label">
                    <AdminInput value={value.contactLabel} onChange={(event) => setValue((current) => ({ ...current, contactLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Map Button Label">
                  <AdminInput value={value.mapButtonLabel} onChange={(event) => setValue((current) => ({ ...current, mapButtonLabel: event.target.value }))} />
                </AdminField>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="gallery-page"
            documentKey="gallery-page"
            title="Gallery Page"
            description="Control the gallery intro, signals, and captions for the fixed gallery image set."
            record={documents["gallery-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Hero Eyebrow">
                    <AdminInput value={value.heroEyebrow} onChange={(event) => setValue((current) => ({ ...current, heroEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Hero Title">
                    <AdminInput value={value.heroTitle} onChange={(event) => setValue((current) => ({ ...current, heroTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Hero Accent">
                    <AdminInput value={value.heroAccent} onChange={(event) => setValue((current) => ({ ...current, heroAccent: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Primary CTA Label">
                    <AdminInput value={value.primaryCtaLabel} onChange={(event) => setValue((current) => ({ ...current, primaryCtaLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Hero Body">
                  <AdminTextarea value={value.heroBody} onChange={(event) => setValue((current) => ({ ...current, heroBody: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Gallery Signals</h3>
                  {value.gallerySignals.map((signal, index) => (
                    <AdminSubCard key={`${signal.label}-${index}`}>
                      <AdminGrid>
                        <AdminField label="Label">
                          <AdminInput
                            value={signal.label}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                gallerySignals: current.gallerySignals.map((currentSignal, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentSignal, label: event.target.value }
                                    : currentSignal,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                        <AdminField label="Value">
                          <AdminInput
                            value={signal.value}
                            onChange={(event) =>
                              setValue((current) => ({
                                ...current,
                                gallerySignals: current.gallerySignals.map((currentSignal, currentIndex) =>
                                  currentIndex === index
                                    ? { ...currentSignal, value: event.target.value }
                                    : currentSignal,
                                ),
                              }))
                            }
                          />
                        </AdminField>
                      </AdminGrid>
                    </AdminSubCard>
                  ))}
                </div>

                <AdminGrid>
                  <AdminField label="Featured Frame Label">
                    <AdminInput value={value.featuredFrameLabel} onChange={(event) => setValue((current) => ({ ...current, featuredFrameLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Service Detail Label">
                    <AdminInput value={value.serviceDetailLabel} onChange={(event) => setValue((current) => ({ ...current, serviceDetailLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Visual Tone Label">
                    <AdminInput value={value.visualToneLabel} onChange={(event) => setValue((current) => ({ ...current, visualToneLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Visual Tone Title">
                    <AdminInput value={value.visualToneTitle} onChange={(event) => setValue((current) => ({ ...current, visualToneTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Open Frame Label">
                    <AdminInput value={value.openFrameLabel} onChange={(event) => setValue((current) => ({ ...current, openFrameLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Curated Frames Label">
                    <AdminInput value={value.curatedFramesLabel} onChange={(event) => setValue((current) => ({ ...current, curatedFramesLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Expanded Frame Label">
                  <AdminInput value={value.expandedFrameLabel} onChange={(event) => setValue((current) => ({ ...current, expandedFrameLabel: event.target.value }))} />
                </AdminField>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Frame Captions</h3>
                  {value.frames.map((frame, index) => (
                    <AdminSubCard key={`${frame.title}-${index}`}>
                      <AdminField label={`Frame ${index + 1} Title`}>
                        <AdminInput
                          value={frame.title}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              frames: current.frames.map((currentFrame, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentFrame, title: event.target.value }
                                  : currentFrame,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label={`Frame ${index + 1} Note`}>
                        <AdminTextarea
                          value={frame.note}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              frames: current.frames.map((currentFrame, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentFrame, note: event.target.value }
                                  : currentFrame,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminSubCard>
                  ))}
                </div>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="contact-page"
            documentKey="contact-page"
            title="Contact Page"
            description="Control the contact page copy, labels, placeholders, and form messaging."
            record={documents["contact-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Title">
                    <AdminInput value={value.title} onChange={(event) => setValue((current) => ({ ...current, title: event.target.value }))} />
                  </AdminField>
                  <AdminField label="General Label">
                    <AdminInput value={value.generalLabel} onChange={(event) => setValue((current) => ({ ...current, generalLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Body">
                  <AdminTextarea value={value.body} onChange={(event) => setValue((current) => ({ ...current, body: event.target.value }))} />
                </AdminField>
                <AdminField label="Press Label">
                  <AdminInput value={value.pressLabel} onChange={(event) => setValue((current) => ({ ...current, pressLabel: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Name Label">
                    <AdminInput value={value.formNameLabel} onChange={(event) => setValue((current) => ({ ...current, formNameLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Name Placeholder">
                    <AdminInput value={value.formNamePlaceholder} onChange={(event) => setValue((current) => ({ ...current, formNamePlaceholder: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Email Label">
                    <AdminInput value={value.formEmailLabel} onChange={(event) => setValue((current) => ({ ...current, formEmailLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Email Placeholder">
                    <AdminInput value={value.formEmailPlaceholder} onChange={(event) => setValue((current) => ({ ...current, formEmailPlaceholder: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Message Label">
                    <AdminInput value={value.formMessageLabel} onChange={(event) => setValue((current) => ({ ...current, formMessageLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Submit Label">
                    <AdminInput value={value.submitLabel} onChange={(event) => setValue((current) => ({ ...current, submitLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Message Placeholder">
                  <AdminTextarea value={value.formMessagePlaceholder} onChange={(event) => setValue((current) => ({ ...current, formMessagePlaceholder: event.target.value }))} className="min-h-[6rem]" />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Submitting Label">
                    <AdminInput value={value.submittingLabel} onChange={(event) => setValue((current) => ({ ...current, submittingLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Success Title">
                    <AdminInput value={value.successTitle} onChange={(event) => setValue((current) => ({ ...current, successTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Success Description">
                  <AdminInput value={value.successDescription} onChange={(event) => setValue((current) => ({ ...current, successDescription: event.target.value }))} />
                </AdminField>
                <AdminField label="Error Title">
                  <AdminInput value={value.errorTitle} onChange={(event) => setValue((current) => ({ ...current, errorTitle: event.target.value }))} />
                </AdminField>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="footer-content"
            documentKey="footer-content"
            title="Footer"
            description="Update the footer summary, CTA labels, newsletter copy, and the small legal/status labels."
            record={documents["footer-content"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Eyebrow">
                    <AdminInput value={value.eyebrow} onChange={(event) => setValue((current) => ({ ...current, eyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Email CTA Label">
                    <AdminInput value={value.emailCtaLabel} onChange={(event) => setValue((current) => ({ ...current, emailCtaLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Brand Description">
                  <AdminTextarea value={value.brandDescription} onChange={(event) => setValue((current) => ({ ...current, brandDescription: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Contact CTA Label">
                    <AdminInput value={value.contactCtaLabel} onChange={(event) => setValue((current) => ({ ...current, contactCtaLabel: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Flagship Info Label">
                    <AdminInput value={value.flagshipInfoLabel} onChange={(event) => setValue((current) => ({ ...current, flagshipInfoLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Explore Heading">
                    <AdminInput value={value.exploreHeading} onChange={(event) => setValue((current) => ({ ...current, exploreHeading: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Info Heading">
                    <AdminInput value={value.infoHeading} onChange={(event) => setValue((current) => ({ ...current, infoHeading: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminGrid>
                  <AdminField label="Newsletter Eyebrow">
                    <AdminInput value={value.newsletterEyebrow} onChange={(event) => setValue((current) => ({ ...current, newsletterEyebrow: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Newsletter Title">
                    <AdminInput value={value.newsletterTitle} onChange={(event) => setValue((current) => ({ ...current, newsletterTitle: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Newsletter Description">
                  <AdminTextarea value={value.newsletterDescription} onChange={(event) => setValue((current) => ({ ...current, newsletterDescription: event.target.value }))} />
                </AdminField>
                <AdminGrid>
                  <AdminField label="Newsletter Placeholder">
                    <AdminInput value={value.newsletterPlaceholder} onChange={(event) => setValue((current) => ({ ...current, newsletterPlaceholder: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Newsletter Disclaimer">
                    <AdminInput value={value.newsletterDisclaimer} onChange={(event) => setValue((current) => ({ ...current, newsletterDisclaimer: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <AdminField label="Legal Status Label">
                  <AdminInput value={value.legalStatusLabel} onChange={(event) => setValue((current) => ({ ...current, legalStatusLabel: event.target.value }))} />
                </AdminField>
              </>
            )}
          </DocumentEditorSection>

          <DocumentEditorSection
            id="privacy-page"
            documentKey="privacy-page"
            title="Privacy"
            description="Edit the privacy page title, date label, and section copy."
            record={documents["privacy-page"]}
          >
            {(value, setValue) => (
              <>
                <AdminGrid>
                  <AdminField label="Title">
                    <AdminInput value={value.title} onChange={(event) => setValue((current) => ({ ...current, title: event.target.value }))} />
                  </AdminField>
                  <AdminField label="Last Updated Label">
                    <AdminInput value={value.lastUpdatedLabel} onChange={(event) => setValue((current) => ({ ...current, lastUpdatedLabel: event.target.value }))} />
                  </AdminField>
                </AdminGrid>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Sections</h3>
                    <AdminSecondaryButton
                      type="button"
                      onClick={() =>
                        setValue((current) => ({
                          ...current,
                          sections: [...current.sections, { heading: "New Section", body: "Add policy copy here." }],
                        }))
                      }
                    >
                      Add section
                    </AdminSecondaryButton>
                  </div>
                  {value.sections.map((section, index) => (
                    <AdminSubCard key={`${section.heading}-${index}`}>
                      <AdminField label={`Section ${index + 1} Heading`}>
                        <AdminInput
                          value={section.heading}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              sections: current.sections.map((currentSection, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentSection, heading: event.target.value }
                                  : currentSection,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label={`Section ${index + 1} Body`}>
                        <AdminTextarea
                          value={section.body}
                          onChange={(event) =>
                            setValue((current) => ({
                              ...current,
                              sections: current.sections.map((currentSection, currentIndex) =>
                                currentIndex === index
                                  ? { ...currentSection, body: event.target.value }
                                  : currentSection,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <div className="mt-3 flex flex-wrap justify-end gap-2">
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            setValue((current) => ({
                              ...current,
                              sections: moveArrayItem(current.sections, index, -1),
                            }))
                          }
                          disabled={index === 0}
                        >
                          Move up
                        </AdminSecondaryButton>
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            setValue((current) => ({
                              ...current,
                              sections: moveArrayItem(current.sections, index, 1),
                            }))
                          }
                          disabled={index === value.sections.length - 1}
                        >
                          Move down
                        </AdminSecondaryButton>
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            setValue((current) => ({
                              ...current,
                              sections: current.sections.filter((_, currentIndex) => currentIndex !== index),
                            }))
                          }
                        >
                          Remove
                        </AdminSecondaryButton>
                      </div>
                    </AdminSubCard>
                  ))}
                </div>
              </>
            )}
          </DocumentEditorSection>

          <MenuEditor record={menuQuery.data} />
        </div>
      </div>
    </AdminPageShell>
  );
}
