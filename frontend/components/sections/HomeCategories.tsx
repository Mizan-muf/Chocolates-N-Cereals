"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bean, Leaf, SunMedium } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { fadeUp, staggerChildren } from "@/components/motion/motionVariants";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const categories = [
  {
    title: "Dark Chocolate",
    description: "Bold cocoa layers, balanced sweetness, and small-batch texture.",
    icon: Bean,
  },
  {
    title: "Breakfast Cereals",
    description: "Hearty grains and nut-forward crunch built for clean energy.",
    icon: SunMedium,
  },
  {
    title: "Clean Ingredients",
    description: "No unnecessary fillers, just quality inputs you can trust.",
    icon: Leaf,
  },
];

export function HomeCategories({ className }: { className?: string }) {
  const { siteVisualConfig } = useSiteContent();

  return (
    <section className={className}>
      <div className="px-0 py-12 md:py-16">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/90 p-6 shadow-soft md:p-8">
            <Image
              src={siteVisualConfig.heroBackgrounds.products.src}
              alt={siteVisualConfig.heroBackgrounds.products.alt}
              fill
              sizes="99vw"
              className="object-cover opacity-[0.22]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f8f3eae0] via-[#f8f3ead9] to-[#f8f3eaf2]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] motif-overlay" aria-hidden />

            <MotionReveal>
              <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Our Signature Range</p>
                  <h2 className="mt-2 font-serif text-3xl text-cocoa md:text-4xl">Fuel your day, your way</h2>
                </div>
                <Link href="/products" className={buttonVariants({ variant: "ghost", size: "md" })}>
                  View all products
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </div>
            </MotionReveal>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerChildren}
              className="relative grid gap-4 md:grid-cols-3"
            >
              {categories.map(({ title, description, icon: Icon }) => (
                <motion.div key={title} variants={fadeUp(18)}>
                  <Card interactive className="relative h-full overflow-hidden bg-surface/95">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cocoa via-accent to-accent2" aria-hidden />
                    <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accentSoft">
                      <Icon className="h-5 w-5 text-accent" aria-hidden />
                    </div>
                    <h3 className="font-serif text-2xl text-cocoa">{title}</h3>
                    <p className="mt-3 text-muted">{description}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-accent">Curated for daily routines</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
