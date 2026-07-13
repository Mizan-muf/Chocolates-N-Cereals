"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { HomeCategories } from "@/components/sections/HomeCategories";
import { HomeFeatured } from "@/components/sections/HomeFeatured";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeStoryCta } from "@/components/sections/HomeStoryCta";
import { HomeTicker } from "@/components/sections/HomeTicker";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export default function Home() {
  const { siteVisualConfig } = useSiteContent();
  const [activeZone, setActiveZone] = useState(0);
  const heroZoneRef = useRef<HTMLElement | null>(null);
  const featuredZoneRef = useRef<HTMLElement | null>(null);
  const storyZoneRef = useRef<HTMLElement | null>(null);

  const zones = useMemo(() => siteVisualConfig.pageZones.home, [siteVisualConfig.pageZones.home]);

  useEffect(() => {
    const nodes = [heroZoneRef.current, featuredZoneRef.current, storyZoneRef.current].filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let topEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          if (!topEntry || entry.intersectionRatio > topEntry.intersectionRatio) {
            topEntry = entry;
          }
        }
        if (!topEntry) {
          return;
        }

        const index = nodes.findIndex((node) => node === topEntry?.target);
        if (index >= 0) {
          setActiveZone(index);
        }
      },
      {
        threshold: [0.35, 0.5, 0.65],
      },
    );

    for (const node of nodes) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 -z-20">
        {zones.map((zone, index) => (
          <div
            key={zone.src}
            className={`zone-image ${activeZone === index ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${zone.src})` }}
            aria-label={zone.alt}
          />
        ))}
        <div className="zone-scrim" />
      </div>

      <section ref={heroZoneRef} className="scroll-zone">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-page-texture opacity-80" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-25" />
        <HomeHero />
        <HomeTicker />
        <HomeCategories />
        <div className="site-shell section-divider-image mt-6 mb-2 h-[150px] md:h-[190px]">
          <Image
            src={siteVisualConfig.sectionDividers.heroToFeatured.src}
            alt={siteVisualConfig.sectionDividers.heroToFeatured.alt}
            fill
            className="object-cover object-center"
            sizes="99vw"
          />
        </div>
      </section>

      <section ref={featuredZoneRef} className="scroll-zone">
        <HomeFeatured />
        <div className="site-shell section-divider-image mt-2 mb-2 h-[150px] md:h-[190px]">
          <Image
            src={siteVisualConfig.sectionDividers.featuredToStory.src}
            alt={siteVisualConfig.sectionDividers.featuredToStory.alt}
            fill
            className="object-cover object-center"
            sizes="99vw"
          />
        </div>
      </section>

      <section ref={storyZoneRef} className="scroll-zone">
        <HomeStoryCta />
      </section>
    </main>
  );
}
