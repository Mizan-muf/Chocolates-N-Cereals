"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { fadeUp, scaleIn, softParallax, staggerChildren } from "@/components/motion/motionVariants";
import { getHomepageFreshPicks } from "@/lib/content";

const trustItems = [
  { label: "Udaipur-only delivery", icon: ShieldCheck },
  { label: "Fresh batches", icon: Leaf },
  { label: "Small-batch goodness", icon: Sparkles },
];

const stats = [
  { value: "25+", label: "Rotating weekly batches" },
  { value: "4.9/5", label: "Repeat customer rating" },
  { value: "7 Days", label: "Typical Udaipur dispatch" },
];

export function HomeHero({ className }: { className?: string }) {
  const { products, homepageConfig, siteVisualConfig } = useSiteContent();
  const freshPicks = getHomepageFreshPicks(products, homepageConfig);

  return (
    <section className={className}>
      <div className="px-0 pt-12 pb-10 md:pt-16 md:pb-14">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
          className="site-shell"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-mesh p-8 shadow-soft md:p-12">
            <Image
              src={siteVisualConfig.heroBackgrounds.homeHero.src}
              alt={siteVisualConfig.heroBackgrounds.homeHero.alt}
              fill
              sizes="99vw"
              className="object-cover opacity-30"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#ffffffcc] via-[#f8f3eae3] to-[#f8f3ead6]" />
            <motion.div variants={softParallax} className="pointer-events-none absolute -top-14 -right-14 h-52 w-52 rounded-full bg-accent/15 blur-3xl animate-float-slow" />
            <motion.div variants={softParallax} className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-cocoa/15 blur-3xl animate-drift" />
            <div className="pointer-events-none absolute inset-0 opacity-80 motif-overlay" aria-hidden />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <motion.div variants={fadeUp(20)}>
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  <Star className="h-3.5 w-3.5 text-accent" aria-hidden />
                  Nourish Your Day
                </p>
                <div className="section-divider-image mt-4 h-[140px] w-full max-w-2xl md:h-[170px]">
                  <Image
                    src={siteVisualConfig.sectionDividers.heroInline.src}
                    alt={siteVisualConfig.sectionDividers.heroInline.alt}
                    fill
                    sizes="(max-width: 768px) 99vw, 620px"
                    className="object-cover object-center"
                  />
                </div>
                <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.04] text-cocoa md:text-6xl">
                  Better mornings begin with
                  <span className="text-accent"> chocolates </span>
                  and cereals made with intention.
                </h1>
                <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
                  A calm editorial palette meets energetic nutrition vibes. Crafted in Udaipur for people who want everyday fuel that still tastes indulgent.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/products" className={buttonVariants({ variant: "primary", size: "lg" })}>
                    Shop Udaipur
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/quiz" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                    Take Product Quiz
                  </Link>
                  <Link href="/blogs" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                    Read the Blog
                  </Link>
                </div>
                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {stats.map((item) => (
                    <li key={item.label} className="rounded-xl border border-border bg-white/75 p-3 backdrop-blur-sm">
                      <p className="font-serif text-2xl text-cocoa">{item.value}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted">{item.label}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={scaleIn} className="rounded-2xl border border-border bg-white/85 p-6 backdrop-blur-sm md:p-7">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-2xl text-cocoa">Today&apos;s fresh picks</p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-accentSoft px-2.5 py-1 text-xs font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent pulse-soft" />
                    Live Batch
                  </span>
                </div>
                <ul className="mt-5 space-y-4">
                  {freshPicks.map((pick) => (
                    <li key={pick.id} className="rounded-xl border border-border bg-white/80 p-3">
                      <p className="text-sm font-semibold text-cocoa">{pick.name}</p>
                      <p className="text-sm text-muted">{pick.description}</p>
                      {pick.status === "archived" && (
                        <p className="mt-2 inline-flex rounded-full border border-border bg-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cocoa">
                          Out of stock
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.ul
              variants={fadeUp(12)}
              className="relative mt-8 grid gap-3 rounded-xl border border-border bg-white/80 p-3 md:grid-cols-3"
            >
              {trustItems.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-cocoa">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
