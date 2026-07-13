"use client";

import clsx from "clsx";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { buttonVariants } from "@/components/ui/Button";
import { sanitizeHomepageConfig } from "@/lib/content";
import type {
  CustomRequest,
  HomepageDisplayConfig,
  Product,
} from "@/types/content";

type Tab = "products" | "homepage" | "custom";

type EditableProductDraft = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  priceLabel: string;
  category: string;
  tags: string;
  isFeatured: boolean;
  status: Product["status"];
  imageDataUrl: string;
};

function toDraft(product: Product): EditableProductDraft {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    longDescription: product.longDescription,
    priceLabel: product.priceLabel,
    category: product.category,
    tags: product.tags.join(", "),
    isFeatured: product.isFeatured,
    status: product.status,
    imageDataUrl: product.imageDataUrl ?? "",
  };
}

function fromDraft(draft: EditableProductDraft): Product {
  return {
    id: draft.id,
    slug: draft.slug,
    name: draft.name,
    description: draft.description,
    longDescription: draft.longDescription,
    priceLabel: draft.priceLabel,
    category: draft.category,
    tags: draft.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    isFeatured: draft.isFeatured,
    status: draft.status,
    imageDataUrl: draft.imageDataUrl || undefined,
  };
}

function moveItem(ids: string[], index: number, direction: -1 | 1): string[] {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= ids.length) {
    return ids;
  }

  const next = [...ids];
  const [item] = next.splice(index, 1);
  next.splice(targetIndex, 0, item);
  return next;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function RequestStatusBadge({ status }: { status: CustomRequest["status"] }) {
  return (
    <span
      className={clsx(
        "rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        status === "open"
          ? "bg-accentSoft text-accent"
          : "bg-gray-200 text-gray-600",
      )}
    >
      {status}
    </span>
  );
}

export default function AdminProductsPage() {
  const {
    products,
    homepageConfig,
    siteVisualConfig,
    homepageWarnings,
    customRequests,
    setHomepageWarnings,
    addProduct,
    updateProduct,
    setProductStatus,
    setHomepageConfig,
    setCustomRequestStatus,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditableProductDraft | null>(null);
  const [localConfig, setLocalConfig] = useState<HomepageDisplayConfig>(homepageConfig);
  const [localErrors, setLocalErrors] = useState<string[]>([]);

  const availableProducts = useMemo(
    () => products.map((product) => ({ id: product.id, name: product.name })),
    [products],
  );

  const startCreate = () => {
    setEditingId("new");
    setDraft({
      id: `prod-${Date.now()}`,
      slug: "",
      name: "",
      description: "",
      longDescription: "",
      priceLabel: "INR ",
      category: "Dark Chocolate",
      tags: "",
      isFeatured: false,
      status: "active",
      imageDataUrl: "",
    });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setDraft(toDraft(product));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveProduct = () => {
    if (!draft) {
      return;
    }

    const product = fromDraft(draft);

    if (!product.slug || !product.name || !product.description || !product.longDescription) {
      return;
    }

    if (editingId === "new") {
      addProduct(product);
    } else {
      updateProduct(product);
    }

    cancelEdit();
  };

  const currentWarnings = [...homepageWarnings, ...localErrors];

  const setArchived = (productId: string) => {
    setProductStatus(productId, "archived");
    setLocalConfig((prev) => {
      const nextProducts = products.map((product) =>
        product.id === productId ? { ...product, status: "archived" as const } : product,
      );
      const sanitized = sanitizeHomepageConfig(nextProducts, prev);
      if (sanitized.warnings.length > 0) {
        setHomepageWarnings(sanitized.warnings);
      }
      return sanitized.config;
    });
  };

  const setActive = (productId: string) => {
    setProductStatus(productId, "active");
  };

  const updateFreshIds = (ids: string[]) => {
    setLocalConfig((prev) => ({ ...prev, freshPickProductIds: ids }));
  };

  const updateFeaturedIds = (ids: string[]) => {
    setLocalConfig((prev) => ({ ...prev, featuredProductIds: ids }));
  };

  const updateFeaturedImageOverride = (productId: string, value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      featuredImageOverrides: {
        ...prev.featuredImageOverrides,
        [productId]: value,
      },
    }));
  };

  const removeFeaturedImageOverride = (productId: string) => {
    setLocalConfig((prev) => {
      const next = { ...prev.featuredImageOverrides };
      delete next[productId];
      return {
        ...prev,
        featuredImageOverrides: next,
      };
    });
  };

  const toggleSelected = (current: string[], productId: string, maxCount: number) => {
    if (current.includes(productId)) {
      return current.filter((id) => id !== productId);
    }

    if (current.length >= maxCount) {
      return current;
    }

    return [...current, productId];
  };

  const saveHomepageConfig = () => {
    const errors: string[] = [];
    if (localConfig.freshPickProductIds.length !== 3) {
      errors.push("Fresh Picks must contain exactly 3 products.");
    }

    if (localConfig.featuredProductIds.length < 1 || localConfig.featuredProductIds.length > 6) {
      errors.push("Featured Picks must contain between 1 and 6 products.");
    }

    if (errors.length > 0) {
      setLocalErrors(errors);
      return;
    }

    setLocalErrors([]);
    setHomepageConfig(localConfig);
  };

  const openRequests = customRequests.filter((request) => request.status === "open");
  const archivedRequests = customRequests.filter((request) => request.status === "archived");

  return (
    <main className="site-shell py-12 md:py-16">
      <div className="page-fill-panel relative mb-8 overflow-hidden p-5 md:p-7">
        <Image
          src={siteVisualConfig.heroBackgrounds.admin.src}
          alt={siteVisualConfig.heroBackgrounds.admin.alt}
          fill
          sizes="92vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f3eaf2] via-[#f8f3eac9] to-[#f8f3ea99]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Admin</p>
          <h1 className="mt-2 font-serif text-4xl text-cocoa">Product & Homepage Display</h1>
          <p className="mt-2 text-sm text-muted">
            Local demo editor only. Changes are in-memory and reset on refresh.
          </p>
        </div>
      </div>

      {currentWarnings.length > 0 && (
        <div className="mb-6 rounded-xl border border-border bg-accentSoft p-4 text-sm text-cocoa">
          {currentWarnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={clsx(
            buttonVariants({ variant: "ghost", size: "md" }),
            activeTab === "products" && "bg-accentSoft",
          )}
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("homepage")}
          className={clsx(
            buttonVariants({ variant: "ghost", size: "md" }),
            activeTab === "homepage" && "bg-accentSoft",
          )}
        >
          Homepage Display
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={clsx(
            buttonVariants({ variant: "ghost", size: "md" }),
            activeTab === "custom" && "bg-accentSoft",
          )}
        >
          Custom Requests
        </button>
      </div>

      {activeTab === "products" && (
        <section className="space-y-4">
          <div>
            <button type="button" onClick={startCreate} className={buttonVariants({ variant: "primary", size: "md" })}>
              Add Product
            </button>
          </div>

          {draft && (
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input className="rounded-lg border border-border p-2" placeholder="ID" value={draft.id} onChange={(event) => setDraft((prev) => (prev ? { ...prev, id: event.target.value } : prev))} />
                <input className="rounded-lg border border-border p-2" placeholder="Slug" value={draft.slug} onChange={(event) => setDraft((prev) => (prev ? { ...prev, slug: event.target.value } : prev))} />
                <input className="rounded-lg border border-border p-2" placeholder="Name" value={draft.name} onChange={(event) => setDraft((prev) => (prev ? { ...prev, name: event.target.value } : prev))} />
                <input className="rounded-lg border border-border p-2" placeholder="Category" value={draft.category} onChange={(event) => setDraft((prev) => (prev ? { ...prev, category: event.target.value } : prev))} />
                <input className="rounded-lg border border-border p-2" placeholder="Price Label" value={draft.priceLabel} onChange={(event) => setDraft((prev) => (prev ? { ...prev, priceLabel: event.target.value } : prev))} />
                <input className="rounded-lg border border-border p-2" placeholder="Tags (comma-separated)" value={draft.tags} onChange={(event) => setDraft((prev) => (prev ? { ...prev, tags: event.target.value } : prev))} />
              </div>
              <textarea className="mt-3 w-full rounded-lg border border-border p-2" placeholder="Short description" value={draft.description} onChange={(event) => setDraft((prev) => (prev ? { ...prev, description: event.target.value } : prev))} />
              <textarea className="mt-3 w-full rounded-lg border border-border p-2" placeholder="Long description" value={draft.longDescription} onChange={(event) => setDraft((prev) => (prev ? { ...prev, longDescription: event.target.value } : prev))} />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm text-muted">
                  <input type="checkbox" checked={draft.isFeatured} onChange={(event) => setDraft((prev) => (prev ? { ...prev, isFeatured: event.target.checked } : prev))} />
                  Featured fallback product
                </label>
                <label className="flex items-center gap-2 text-sm text-muted">
                  <span>Status</span>
                  <select
                    className="rounded-lg border border-border p-2"
                    value={draft.status}
                    onChange={(event) =>
                      setDraft((prev) =>
                        prev
                          ? { ...prev, status: event.target.value as Product["status"] }
                          : prev,
                      )
                    }
                  >
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
              </div>
              <div className="mt-3 rounded-lg border border-border p-3">
                <p className="text-sm font-semibold text-cocoa">Product image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block text-sm"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      return;
                    }
                    const dataUrl = await fileToDataUrl(file);
                    setDraft((prev) => (prev ? { ...prev, imageDataUrl: dataUrl } : prev));
                  }}
                />
                {draft.imageDataUrl && (
                  <div className="mt-3 space-y-2">
                    <Image
                      src={draft.imageDataUrl}
                      alt="Product preview"
                      width={240}
                      height={150}
                      className="rounded-md border border-border object-cover"
                    />
                    <button
                      type="button"
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                      onClick={() => setDraft((prev) => (prev ? { ...prev, imageDataUrl: "" } : prev))}
                    >
                      Remove image
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={saveProduct} className={buttonVariants({ variant: "primary", size: "sm" })}>
                  Save
                </button>
                <button type="button" onClick={cancelEdit} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {product.imageDataUrl ? (
                      <Image
                        src={product.imageDataUrl}
                        alt={product.name}
                        width={72}
                        height={48}
                        className="rounded-md border border-border object-cover"
                      />
                    ) : (
                      <div className="h-12 w-[72px] rounded-md border border-border bg-accentSoft" />
                    )}
                    <div>
                      <p className="font-semibold text-cocoa">{product.name}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted">{product.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => startEdit(product)} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                      Edit
                    </button>
                    {product.status === "active" ? (
                      <button type="button" onClick={() => setArchived(product.id)} className={buttonVariants({ variant: "secondary", size: "sm" })}>
                        Archive
                      </button>
                    ) : (
                      <button type="button" onClick={() => setActive(product.id)} className={buttonVariants({ variant: "primary", size: "sm" })}>
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "homepage" && (
        <section className="space-y-6">
          <div className="page-fill-panel p-4">
            <p className="font-semibold text-cocoa">Section Image Preview</p>
            <p className="mt-1 text-sm text-muted">Read-only preview of active visual manifest assets.</p>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {[
                siteVisualConfig.sectionDividers.heroInline,
                siteVisualConfig.sectionDividers.heroToFeatured,
                siteVisualConfig.sectionDividers.featuredToStory,
              ].map((asset) => (
                <div key={asset.src} className="rounded-lg border border-border bg-white p-3">
                  <div className="relative h-24 overflow-hidden rounded-md border border-border">
                    <Image src={asset.src} alt={asset.alt} fill className="object-cover" />
                  </div>
                  <p className="mt-2 text-xs text-muted">{asset.alt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold text-cocoa">Fresh Picks (exactly 3)</p>
            <p className="mt-1 text-sm text-muted">Select 3 products and reorder manually.</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {availableProducts.map((product) => {
                const selected = localConfig.freshPickProductIds.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={clsx(
                      "rounded-lg border p-2 text-left text-sm",
                      selected
                        ? "border-accent bg-accentSoft text-cocoa"
                        : "border-border bg-white text-muted",
                    )}
                    onClick={() =>
                      updateFreshIds(
                        toggleSelected(localConfig.freshPickProductIds, product.id, 3),
                      )
                    }
                  >
                    {product.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-2">
              {localConfig.freshPickProductIds.map((id, index) => {
                const label = availableProducts.find((product) => product.id === id)?.name ?? id;
                return (
                  <div key={id} className="flex items-center justify-between rounded-lg border border-border bg-white p-2">
                    <span className="text-sm text-cocoa">{label}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                        onClick={() =>
                          updateFreshIds(
                            moveItem(localConfig.freshPickProductIds, index, -1),
                          )
                        }
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                        onClick={() =>
                          updateFreshIds(
                            moveItem(localConfig.freshPickProductIds, index, 1),
                          )
                        }
                      >
                        Down
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold text-cocoa">Featured Picks (1 to 6)</p>
            <p className="mt-1 text-sm text-muted">Select up to 6 products and reorder manually.</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {availableProducts.map((product) => {
                const selected = localConfig.featuredProductIds.includes(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    className={clsx(
                      "rounded-lg border p-2 text-left text-sm",
                      selected
                        ? "border-accent bg-accentSoft text-cocoa"
                        : "border-border bg-white text-muted",
                    )}
                    onClick={() =>
                      updateFeaturedIds(
                        toggleSelected(localConfig.featuredProductIds, product.id, 6),
                      )
                    }
                  >
                    {product.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-2">
              {localConfig.featuredProductIds.map((id, index) => {
                const label = availableProducts.find((product) => product.id === id)?.name ?? id;
                const override = localConfig.featuredImageOverrides[id];
                return (
                  <div key={id} className="rounded-lg border border-border bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cocoa">{label}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className={buttonVariants({ variant: "ghost", size: "sm" })}
                          onClick={() =>
                            updateFeaturedIds(
                              moveItem(localConfig.featuredProductIds, index, -1),
                            )
                          }
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className={buttonVariants({ variant: "ghost", size: "sm" })}
                          onClick={() =>
                            updateFeaturedIds(
                              moveItem(localConfig.featuredProductIds, index, 1),
                            )
                          }
                        >
                          Down
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Optional featured image override
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-2 block text-sm"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) {
                            return;
                          }
                          const dataUrl = await fileToDataUrl(file);
                          updateFeaturedImageOverride(id, dataUrl);
                        }}
                      />
                      {override && (
                        <div className="mt-2 space-y-2">
                          <Image
                            src={override}
                            alt={`${label} override`}
                            width={220}
                            height={140}
                            className="rounded-md border border-border object-cover"
                          />
                          <button
                            type="button"
                            className={buttonVariants({ variant: "ghost", size: "sm" })}
                            onClick={() => removeFeaturedImageOverride(id)}
                          >
                            Remove override
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <button type="button" onClick={saveHomepageConfig} className={buttonVariants({ variant: "primary", size: "md" })}>
              Save Homepage Display
            </button>
          </div>
        </section>
      )}

      {activeTab === "custom" && (
        <section className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-cocoa">Open Requests</h2>
            <div className="mt-3 space-y-3">
              {openRequests.length === 0 && (
                <p className="text-sm text-muted">No open requests yet.</p>
              )}
              {openRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-cocoa">{request.id}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <RequestStatusBadge status={request.status} />
                      <button
                        type="button"
                        className={buttonVariants({ variant: "secondary", size: "sm" })}
                        onClick={() => setCustomRequestStatus(request.id, "archived")}
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    Goal: {request.answers.goal} | Flavor: {request.answers.flavor} | Diet:{" "}
                    {request.answers.dietPreference} | Time: {request.answers.timeOfDay}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Recommended products: {request.recommendedProductIds.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-cocoa">Archived Requests</h2>
            <div className="mt-3 space-y-3">
              {archivedRequests.length === 0 && (
                <p className="text-sm text-muted">No archived requests yet.</p>
              )}
              {archivedRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-border bg-surface p-4 opacity-80">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-cocoa">{request.id}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <RequestStatusBadge status={request.status} />
                      <button
                        type="button"
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                        onClick={() => setCustomRequestStatus(request.id, "open")}
                      >
                        Reopen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
