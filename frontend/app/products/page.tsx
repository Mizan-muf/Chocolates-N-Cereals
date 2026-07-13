"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ProductsPage() {
  const { products, siteVisualConfig } = useSiteContent();
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <main className="site-shell py-12 md:py-16">
      <section className="page-fill-panel relative mb-8 overflow-hidden p-6 md:p-8">
        <Image
          src={siteVisualConfig.heroBackgrounds.products.src}
          alt={siteVisualConfig.heroBackgrounds.products.alt}
          fill
          sizes="92vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f3eaf5] via-[#f8f3ead9] to-[#f8f3eaa3]" />
        <div className="relative">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Catalog</p>
              <h1 className="mt-2 font-serif text-4xl text-cocoa">Products</h1>
              <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
                Built for practical routines with ingredients that feel clean and flavors that still feel rewarding.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/quiz" className={buttonVariants({ variant: "secondary", size: "md" })}>
                Take Quiz
              </Link>
              <Link href="/admin/products" className={buttonVariants({ variant: "ghost", size: "md" })}>
                Open Product Admin
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cocoa"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            interactive={product.status === "active"}
            className={product.status === "archived" ? "h-full opacity-70" : "h-full"}
          >
            {product.imageDataUrl ? (
              <Image
                src={product.imageDataUrl}
                alt={product.name}
                width={520}
                height={220}
                className="h-36 w-full rounded-lg border border-border object-cover"
              />
            ) : (
              <div className="h-36 rounded-lg border border-border bg-gradient-to-br from-accentSoft to-cocoaSoft" />
            )}
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted">{product.category}</p>
            <h2 className="mt-2 font-serif text-2xl text-cocoa">{product.name}</h2>
            <p className="mt-2 text-sm text-muted">{product.description}</p>
            {product.status === "archived" && (
              <p className="mt-3 inline-flex rounded-full border border-border bg-black/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-cocoa">
                Out of stock
              </p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-cocoa">{product.priceLabel}</p>
              <Link href={`/products/${product.slug}`} className={buttonVariants({ variant: "primary", size: "sm" })}>
                Details
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="page-fill-panel p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Ingredient Focus</p>
          <h2 className="mt-2 font-serif text-3xl text-cocoa">Clean pantry energy</h2>
          <p className="mt-3 text-sm text-muted">
            Oats, seeds, nuts, and cocoa-forward blends support steady snacking and breakfast routines without unnecessary fillers.
          </p>
        </div>
        <div className="page-fill-panel p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Routine Ideas</p>
          <h2 className="mt-2 font-serif text-3xl text-cocoa">Pair by time of day</h2>
          <p className="mt-3 text-sm text-muted">
            Choose cereals for mornings, balanced seed mixes for midday, and richer cocoa options for evening cravings.
          </p>
        </div>
      </section>
    </main>
  );
}
