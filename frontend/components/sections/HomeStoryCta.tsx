"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { PatternPanel } from "@/components/sections/PatternPanel";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { buttonVariants } from "@/components/ui/Button";

export function HomeStoryCta({ className }: { className?: string }) {
  const { siteVisualConfig } = useSiteContent();

  return (
    <section className={className}>
      <div className="px-0 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="site-shell">
          <MotionReveal>
            <PatternPanel className="bg-surface-2">
              <div className="pointer-events-none absolute top-4 right-4 z-10 h-20 w-32 overflow-hidden rounded-xl border border-border/70 md:top-6 md:right-6 md:h-24 md:w-40">
                <Image
                  src={siteVisualConfig.sectionDividers.featuredToStory.src}
                  alt={siteVisualConfig.sectionDividers.featuredToStory.alt}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover object-center opacity-90"
                />
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Our Story</p>
                  <h2 className="mt-2 text-balance font-serif text-3xl leading-tight text-cocoa md:text-5xl">
                    Crafted for mindful routines and joyful cravings.
                  </h2>
                  <p className="mt-5 max-w-2xl text-muted">
                    We blend nutrition-forward cereals with rich cocoa creations so your pantry can be practical and indulgent at once. Every batch is prepared for freshness, with delivery focused on Udaipur for quality control.
                  </p>
                  <div className="mt-5 inline-flex items-start gap-3 rounded-xl border border-border bg-white/75 p-4">
                    <Quote className="mt-1 h-4 w-4 text-accent" aria-hidden />
                    <p className="text-sm text-muted">
                      &ldquo;What we make should taste comforting, feel nourishing, and fit real daily routines.&rdquo;
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-white/85 p-5 shadow-soft backdrop-blur-sm md:p-6">
                  <p className="font-serif text-2xl text-cocoa">Start with our top picks</p>
                  <p className="mt-2 text-sm text-muted">
                    Shop what&apos;s fresh this week or explore simple nutrition tips on the blog.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/products" className={buttonVariants({ variant: "primary", size: "lg" })}>
                      Shop Udaipur
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                    <Link href="/blogs" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                      Read the Blog
                    </Link>
                  </div>
                </div>
              </div>
            </PatternPanel>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
