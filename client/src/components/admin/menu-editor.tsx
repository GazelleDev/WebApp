import { useEffect, useMemo, useState } from "react";
import type { AdminMenuDocument } from "@shared/content";
import { useUpdateAdminMenu } from "@/hooks/use-admin";
import { useToast } from "@/hooks/use-toast";
import { useUnsavedWarning } from "@/hooks/use-unsaved-warning";
import {
  AdminField,
  AdminGrid,
  AdminInput,
  AdminPrimaryButton,
  AdminSecondaryButton,
  AdminSectionCard,
  AdminStatusPill,
  AdminSubCard,
  AdminTextarea,
  AdminToggle,
} from "./fields";

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

type MenuEditorProps = {
  record: {
    menu: AdminMenuDocument;
    updatedAt: string | null;
  };
};

export function MenuEditor({ record }: MenuEditorProps) {
  const { toast } = useToast();
  const mutation = useUpdateAdminMenu();
  const [menu, setMenu] = useState(record.menu);

  useEffect(() => {
    setMenu(record.menu);
  }, [record.menu, record.updatedAt]);

  const isDirty = useMemo(
    () => JSON.stringify(menu) !== JSON.stringify(record.menu),
    [menu, record.menu],
  );

  useUnsavedWarning(isDirty);

  const updateCategory = (
    categoryIndex: number,
    updater: (category: AdminMenuDocument["categories"][number]) => AdminMenuDocument["categories"][number],
  ) => {
    setMenu((current) => ({
      ...current,
      categories: current.categories.map((category, index) =>
        index === categoryIndex ? updater(category) : category,
      ),
    }));
  };

  const handleSave = () => {
    mutation.mutate(menu, {
      onSuccess: () => {
        toast({
          title: "Menu updated",
          description: "The public menu is now showing the latest saved structure.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Menu save failed",
          description: error.message,
        });
      },
    });
  };

  return (
    <AdminSectionCard
      id="menu"
      title="Menu"
      description="Update the menu page copy, dietary notes, categories, and items. Save publishes changes immediately."
      actions={
        <>
          <AdminStatusPill tone={isDirty ? "dirty" : "saved"}>
            {isDirty ? "Unsaved changes" : "Saved"}
          </AdminStatusPill>
          <AdminPrimaryButton type="button" onClick={handleSave} disabled={!isDirty || mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save menu"}
          </AdminPrimaryButton>
        </>
      }
    >
      <AdminGrid>
        <AdminField label="Hero Eyebrow">
          <AdminInput
            value={menu.page.heroEyebrow}
            onChange={(event) =>
              setMenu((current) => ({
                ...current,
                page: { ...current.page, heroEyebrow: event.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="Hero Title">
          <AdminInput
            value={menu.page.title}
            onChange={(event) =>
              setMenu((current) => ({
                ...current,
                page: { ...current.page, title: event.target.value },
              }))
            }
          />
        </AdminField>
      </AdminGrid>

      <AdminField label="Hero Body">
        <AdminTextarea
          value={menu.page.body}
          onChange={(event) =>
            setMenu((current) => ({
              ...current,
              page: { ...current.page, body: event.target.value },
            }))
          }
        />
      </AdminField>

      <AdminGrid>
        <AdminField label="Categories Heading">
          <AdminInput
            value={menu.page.categoriesHeading}
            onChange={(event) =>
              setMenu((current) => ({
                ...current,
                page: { ...current.page, categoriesHeading: event.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="Dietary Heading">
          <AdminInput
            value={menu.page.dietaryHeading}
            onChange={(event) =>
              setMenu((current) => ({
                ...current,
                page: { ...current.page, dietaryHeading: event.target.value },
              }))
            }
          />
        </AdminField>
      </AdminGrid>

      <AdminField label="Dietary Helper Text">
        <AdminInput
          value={menu.page.dietaryHelperText}
          onChange={(event) =>
            setMenu((current) => ({
              ...current,
              page: { ...current.page, dietaryHelperText: event.target.value },
            }))
          }
        />
      </AdminField>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Dietary Notes</h3>
          <AdminSecondaryButton
            type="button"
            onClick={() =>
              setMenu((current) => ({
                ...current,
                page: {
                  ...current.page,
                  dietaryNotes: [...current.page.dietaryNotes, { code: "NEW", label: "New note" }],
                },
              }))
            }
          >
            Add note
          </AdminSecondaryButton>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {menu.page.dietaryNotes.map((note, index) => (
            <AdminSubCard key={`${note.code}-${index}`}>
              <div className="grid gap-3 md:grid-cols-[7rem_1fr]">
                <AdminField label="Code">
                  <AdminInput
                    value={note.code}
                    onChange={(event) =>
                      setMenu((current) => ({
                        ...current,
                        page: {
                          ...current.page,
                          dietaryNotes: current.page.dietaryNotes.map((currentNote, currentIndex) =>
                            currentIndex === index
                              ? { ...currentNote, code: event.target.value.toUpperCase() }
                              : currentNote,
                          ),
                        },
                      }))
                    }
                  />
                </AdminField>
                <AdminField label="Label">
                  <AdminInput
                    value={note.label}
                    onChange={(event) =>
                      setMenu((current) => ({
                        ...current,
                        page: {
                          ...current.page,
                          dietaryNotes: current.page.dietaryNotes.map((currentNote, currentIndex) =>
                            currentIndex === index
                              ? { ...currentNote, label: event.target.value }
                              : currentNote,
                          ),
                        },
                      }))
                    }
                  />
                </AdminField>
              </div>
              <div className="mt-3 flex justify-end">
                <AdminSecondaryButton
                  type="button"
                  onClick={() =>
                    setMenu((current) => ({
                      ...current,
                      page: {
                        ...current.page,
                        dietaryNotes: current.page.dietaryNotes.filter((_, currentIndex) => currentIndex !== index),
                      },
                    }))
                  }
                >
                  Remove
                </AdminSecondaryButton>
              </div>
            </AdminSubCard>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9F7965]">Categories</h3>
          <AdminSecondaryButton
            type="button"
            onClick={() =>
              setMenu((current) => ({
                ...current,
                categories: [
                  ...current.categories,
                  {
                    title: "New Category",
                    visible: true,
                    items: [],
                  },
                ],
              }))
            }
          >
            Add category
          </AdminSecondaryButton>
        </div>

        {menu.categories.map((category, categoryIndex) => (
          <AdminSubCard key={`${category.title}-${categoryIndex}`}>
            <div className="flex flex-col gap-4 border-b border-[#ead9cf] pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 space-y-4">
                <AdminGrid>
                  <AdminField label="Category Title">
                    <AdminInput
                      value={category.title}
                      onChange={(event) =>
                        updateCategory(categoryIndex, (currentCategory) => ({
                          ...currentCategory,
                          title: event.target.value,
                        }))
                      }
                    />
                  </AdminField>
                  <AdminField label="Visibility">
                    <div className="pt-2">
                      <AdminToggle
                        checked={category.visible}
                        onChange={(checked) =>
                          updateCategory(categoryIndex, (currentCategory) => ({
                            ...currentCategory,
                            visible: checked,
                          }))
                        }
                        label={category.visible ? "Visible" : "Hidden"}
                      />
                    </div>
                  </AdminField>
                </AdminGrid>
              </div>

              <div className="flex flex-wrap gap-2">
                <AdminSecondaryButton
                  type="button"
                  onClick={() =>
                    setMenu((current) => ({
                      ...current,
                      categories: moveArrayItem(current.categories, categoryIndex, -1),
                    }))
                  }
                  disabled={categoryIndex === 0}
                >
                  Move up
                </AdminSecondaryButton>
                <AdminSecondaryButton
                  type="button"
                  onClick={() =>
                    setMenu((current) => ({
                      ...current,
                      categories: moveArrayItem(current.categories, categoryIndex, 1),
                    }))
                  }
                  disabled={categoryIndex === menu.categories.length - 1}
                >
                  Move down
                </AdminSecondaryButton>
                <AdminSecondaryButton
                  type="button"
                  onClick={() => {
                    if (!window.confirm(`Delete the "${category.title}" category and all of its items?`)) {
                      return;
                    }

                    setMenu((current) => ({
                      ...current,
                      categories: current.categories.filter((_, index) => index !== categoryIndex),
                    }));
                  }}
                >
                  Delete
                </AdminSecondaryButton>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#242327]">Items</h4>
                <AdminSecondaryButton
                  type="button"
                  onClick={() =>
                    updateCategory(categoryIndex, (currentCategory) => ({
                      ...currentCategory,
                      items: [
                        ...currentCategory.items,
                        {
                          name: "New Item",
                          description: "Describe the offering.",
                          priceLabel: "$0.00",
                          badgeCodes: [],
                          visible: true,
                        },
                      ],
                    }))
                  }
                >
                  Add item
                </AdminSecondaryButton>
              </div>

              {category.items.length === 0 ? (
                <p className="text-sm text-[#7c6d64]">No items in this category yet.</p>
              ) : null}

              {category.items.map((item, itemIndex) => (
                <AdminSubCard key={`${item.name}-${itemIndex}`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-[#242327]">Item {itemIndex + 1}</div>
                      <div className="flex flex-wrap gap-2">
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: moveArrayItem(currentCategory.items, itemIndex, -1),
                            }))
                          }
                          disabled={itemIndex === 0}
                        >
                          Up
                        </AdminSecondaryButton>
                        <AdminSecondaryButton
                          type="button"
                          onClick={() =>
                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: moveArrayItem(currentCategory.items, itemIndex, 1),
                            }))
                          }
                          disabled={itemIndex === category.items.length - 1}
                        >
                          Down
                        </AdminSecondaryButton>
                        <AdminSecondaryButton
                          type="button"
                          onClick={() => {
                            if (!window.confirm(`Delete "${item.name}"?`)) {
                              return;
                            }

                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: currentCategory.items.filter((_, currentIndex) => currentIndex !== itemIndex),
                            }));
                          }}
                        >
                          Delete
                        </AdminSecondaryButton>
                      </div>
                    </div>

                    <AdminGrid>
                      <AdminField label="Item Name">
                        <AdminInput
                          value={item.name}
                          onChange={(event) =>
                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: currentCategory.items.map((currentItem, currentIndex) =>
                                currentIndex === itemIndex
                                  ? { ...currentItem, name: event.target.value }
                                  : currentItem,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label="Price Label">
                        <AdminInput
                          value={item.priceLabel}
                          onChange={(event) =>
                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: currentCategory.items.map((currentItem, currentIndex) =>
                                currentIndex === itemIndex
                                  ? { ...currentItem, priceLabel: event.target.value }
                                  : currentItem,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                    </AdminGrid>

                    <AdminField label="Description">
                      <AdminTextarea
                        value={item.description}
                        onChange={(event) =>
                          updateCategory(categoryIndex, (currentCategory) => ({
                            ...currentCategory,
                            items: currentCategory.items.map((currentItem, currentIndex) =>
                              currentIndex === itemIndex
                                ? { ...currentItem, description: event.target.value }
                                : currentItem,
                            ),
                          }))
                        }
                      />
                    </AdminField>

                    <AdminGrid>
                      <AdminField label="Badge Codes" hint="Comma-separated, for example VG, GF">
                        <AdminInput
                          value={item.badgeCodes.join(", ")}
                          onChange={(event) =>
                            updateCategory(categoryIndex, (currentCategory) => ({
                              ...currentCategory,
                              items: currentCategory.items.map((currentItem, currentIndex) =>
                                currentIndex === itemIndex
                                  ? {
                                      ...currentItem,
                                      badgeCodes: event.target.value
                                        .split(",")
                                        .map((badge) => badge.trim().toUpperCase())
                                        .filter(Boolean),
                                    }
                                  : currentItem,
                              ),
                            }))
                          }
                        />
                      </AdminField>
                      <AdminField label="Move To Category">
                        <select
                          value={String(categoryIndex)}
                          onChange={(event) => {
                            const nextCategoryIndex = Number(event.target.value);

                            if (nextCategoryIndex === categoryIndex) {
                              return;
                            }

                            setMenu((current) => {
                              const itemToMove = current.categories[categoryIndex].items[itemIndex];

                              return {
                                ...current,
                                categories: current.categories.map((currentCategory, currentCategoryIndex) => {
                                  if (currentCategoryIndex === categoryIndex) {
                                    return {
                                      ...currentCategory,
                                      items: currentCategory.items.filter((_, currentIndex) => currentIndex !== itemIndex),
                                    };
                                  }

                                  if (currentCategoryIndex === nextCategoryIndex) {
                                    return {
                                      ...currentCategory,
                                      items: [...currentCategory.items, itemToMove],
                                    };
                                  }

                                  return currentCategory;
                                }),
                              };
                            });
                          }}
                          className="w-full rounded-[1rem] border border-[#d9c4b5] bg-[#fcf8f5] px-4 py-3 text-sm text-[#242327] outline-none transition-colors focus:border-[#9F7965]"
                        >
                          {menu.categories.map((optionCategory, optionIndex) => (
                            <option key={`${optionCategory.title}-${optionIndex}`} value={optionIndex}>
                              {optionCategory.title}
                            </option>
                          ))}
                        </select>
                      </AdminField>
                    </AdminGrid>

                    <AdminToggle
                      checked={item.visible}
                      onChange={(checked) =>
                        updateCategory(categoryIndex, (currentCategory) => ({
                          ...currentCategory,
                          items: currentCategory.items.map((currentItem, currentIndex) =>
                            currentIndex === itemIndex
                              ? { ...currentItem, visible: checked }
                              : currentItem,
                          ),
                        }))
                      }
                      label={item.visible ? "Visible" : "Hidden"}
                    />
                  </div>
                </AdminSubCard>
              ))}
            </div>
          </AdminSubCard>
        ))}
      </div>
    </AdminSectionCard>
  );
}
