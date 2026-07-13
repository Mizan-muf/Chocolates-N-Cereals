"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { fadeUp, staggerChildren } from "@/components/motion/motionVariants";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getHomepageFeatured } from "@/lib/content";

export function HomeFeatured({ className }: { className?: string }) {
  const { products, homepageConfig, siteVisualConfig } = useSiteContent();
  const featured = getHomepageFeatured(products, homepageConfig);

  return (
    <section className={className}>
      <div className="px-0 py-12 md:py-16">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
            <div className="pointer-events-none absolute top-4 right-4 z-10 h-20 w-32 overflow-hidden rounded-xl border border-border/70 md:top-6 md:right-6 md:h-24 md:w-40">
              <Image
                src={siteVisualConfig.sectionDividers.heroToFeatured.src}
                alt={siteVisualConfig.sectionDividers.heroToFeatured.alt}
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover object-center opacity-90"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-60 motif-overlay" aria-hidden />
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" aria-hidden />
            <div className="relative">
              <MotionReveal>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Featured Picks</p>
                    <h2 className="mt-2 font-serif text-3xl text-cocoa md:text-4xl">Small-batch favorites</h2>
                  </div>
                  <Link href="/products" className={buttonVariants({ variant: "primary", size: "md" })}>
                    Shop all
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </MotionReveal>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerChildren}
                className="grid gap-4 md:grid-cols-3"
              >
                {featured.map((product, index) => (
                  <motion.div key={product.id} variants={fadeUp(14)}>
                    <Card interactive className={product.status === "archived" ? "h-full bg-white/90 opacity-70 backdrop-blur-sm" : "h-full bg-white/90 backdrop-blur-sm"}>
                      <div className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-accentSoft to-cocoaSoft p-3">
                        <div className="relative h-40 overflow-hidden rounded-md md:h-44">
                          {homepageConfig.featuredImageOverrides[product.id] || product.imageDataUrl ? (
                            <Image
                              src={homepageConfig.featuredImageOverrides[product.id] ?? product.imageDataUrl ?? ""}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 95vw, 32vw"
                              className="object-cover object-center"
                            />
                          ) : (
                            <Image
                              src={siteVisualConfig.productFallbacks[index % siteVisualConfig.productFallbacks.length].src}
                              alt={siteVisualConfig.productFallbacks[index % siteVisualConfig.productFallbacks.length].alt}
                              fill
                              sizes="(max-width: 768px) 95vw, 32vw"
                              className="object-cover object-center"
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <p className="inline-flex rounded-full border border-border bg-accentSoft px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                          {product.category}
                        </p>
                        <p className="text-lg font-semibold text-cocoa">{product.priceLabel}</p>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-cocoa">{product.name}</h3>
                      <p className="mt-2 text-sm text-muted">{product.description}</p>
                      {product.status === "archived" && (
                        <p className="mt-3 inline-flex rounded-full border border-border bg-black/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-cocoa">
                          Out of stock
                        </p>
                      )}
                      <div className="mt-6">
                        <Link href={`/products/${product.slug}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                          View details
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
