"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { buttonVariants } from "@/components/ui/Button";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { products, siteVisualConfig } = useSiteContent();
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return (
      <main className="site-shell py-12 md:py-16">
        <Link href="/products" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Back to products
        </Link>
        <p className="mt-6 text-muted">Product not found.</p>
      </main>
    );
  }

  const related = products
    .filter((item) => item.id !== product.id && item.status === "active")
    .slice(0, 3);

  return (
    <main className="site-shell py-12 md:py-16">
      <Link href="/products" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        Back to products
      </Link>
      <article className={product.status === "archived" ? "mt-6 rounded-2xl border border-border bg-surface p-6 opacity-75 shadow-soft md:p-8" : "mt-6 rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8"}>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            {product.imageDataUrl ? (
              <Image
                src={product.imageDataUrl}
                alt={product.name}
                width={1000}
                height={360}
                className="h-52 w-full rounded-lg border border-border object-cover"
              />
            ) : (
              <div className="relative h-52 overflow-hidden rounded-lg border border-border">
                <Image
                  src={siteVisualConfig.heroBackgrounds.productDetail.src}
                  alt={siteVisualConfig.heroBackgrounds.productDetail.alt}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 1024px) 92vw, 62vw"
                />
              </div>
            )}
            <p className="mt-5 text-xs uppercase tracking-[0.12em] text-muted">{product.category}</p>
            <h1 className="mt-2 font-serif text-4xl text-cocoa">{product.name}</h1>
            <p className="mt-3 text-xl font-semibold text-cocoa">{product.priceLabel}</p>
            {product.status === "archived" && (
              <p className="mt-4 inline-flex rounded-full border border-border bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cocoa">
                Out of stock
              </p>
            )}
            <p className="mt-5 text-muted">{product.longDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="page-fill-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Wellness Context</p>
              <h2 className="mt-2 font-serif text-2xl text-cocoa">Balanced daily choice</h2>
              <p className="mt-3 text-sm text-muted">
                Designed to fit everyday routines with thoughtful ingredient balance and satisfying texture.
              </p>
            </div>
            <div className="page-fill-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Pairing Suggestion</p>
              <p className="mt-3 text-sm text-muted">
                Pair with fruit bowls, yogurt, or light beverages depending on the time of day and your preferred flavor profile.
              </p>
            </div>
          </aside>
        </div>
      </article>

      <section className="mt-8">
        <h2 className="font-serif text-3xl text-cocoa">You may also like</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <div key={item.id} className="page-fill-panel p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-muted">{item.category}</p>
              <h3 className="mt-2 font-serif text-2xl text-cocoa">{item.name}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              <Link href={`/products/${item.slug}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-4" })}>
                View product
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
