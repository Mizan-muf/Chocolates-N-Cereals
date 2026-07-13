import type { SiteVisualConfig } from "@/types/content";

export const initialSiteVisualConfig: SiteVisualConfig = {
  pageZones: {
    home: [
      {
        src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2400&h=1500&q=80",
        alt: "Fresh fruits, oats, and wholesome breakfast ingredients on a table",
      },
      {
        src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2400&h=1500&q=80",
        alt: "Colorful healthy bowl with vegetables and seeds",
      },
      {
        src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2400&h=1500&q=80",
        alt: "Natural ingredients arranged in a rustic healthy pantry setup",
      },
    ],
  },
  productFallbacks: [
    {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&h=760&q=80",
      alt: "Bowl of granola and fresh fruits",
    },
    {
      src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&h=760&q=80",
      alt: "Healthy ingredients arranged for daily nutrition",
    },
    {
      src: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&h=760&q=80",
      alt: "Natural breakfast and snack spread",
    },
  ],
  sectionDividers: {
    heroInline: {
      src: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1600&h=520&q=80",
      alt: "Healthy nuts and seeds close-up",
    },
    heroToFeatured: {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=2600&h=760&q=80",
      alt: "Fresh produce and grains laid out for clean eating",
    },
    featuredToStory: {
      src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2600&h=760&q=80",
      alt: "Breakfast table with granola, berries, and healthy snacks",
    },
  },
  heroBackgrounds: {
    homeHero: {
      src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=2600&h=1500&q=80",
      alt: "Wellness food spread with earthy tones",
    },
    products: {
      src: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=2600&h=1400&q=80",
      alt: "Nutrition-forward food arrangement for product showcase",
    },
    blogs: {
      src: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=2600&h=1400&q=80",
      alt: "Healthy lifestyle workspace with food and reading",
    },
    admin: {
      src: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=2600&h=1400&q=80",
      alt: "Ingredients and planning setup on a table",
    },
    productDetail: {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2600&h=1400&q=80",
      alt: "Detailed view of whole-food ingredients and grains",
    },
    blogDetail: {
      src: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=2600&h=1400&q=80",
      alt: "Calm wellness scene with natural food and journal",
    },
  },
  altText: {
    homeZoneA: "Hero backdrop with natural ingredients",
    homeZoneB: "Featured products backdrop with vibrant wellness colors",
    homeZoneC: "Story section backdrop with warm pantry visuals",
  },
};
