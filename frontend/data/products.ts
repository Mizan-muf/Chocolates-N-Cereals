import type { Product } from "@/types/content";

export const initialProducts: Product[] = [
  {
    id: "prod-hazelnut-midnight-bites",
    slug: "hazelnut-midnight-bites",
    name: "Hazelnut Midnight Bites",
    description: "Dark roast cocoa with toasted hazelnut crunch.",
    longDescription:
      "An indulgent dark chocolate bite built for evening cravings. Each small-batch square blends deep cocoa with roasted hazelnut pieces for a rich finish.",
    priceLabel: "INR 349",
    category: "Dark Chocolate",
    tags: ["Best Seller", "Nutty"],
    isFeatured: true,
    status: "active",
  },
  {
    id: "prod-almond-oat-cereal-clusters",
    slug: "almond-oat-cereal-clusters",
    name: "Almond Oat Cereal Clusters",
    description: "High-fiber morning bowl with light jaggery notes.",
    longDescription:
      "A breakfast-forward cereal blend of toasted oats, almond crunch, and gentle sweetness. Designed to keep mornings steady without feeling heavy.",
    priceLabel: "INR 299",
    category: "Breakfast Cereals",
    tags: ["Fresh Batch", "High Fiber"],
    isFeatured: true,
    status: "active",
  },
  {
    id: "prod-seeded-crunch-mix",
    slug: "seeded-crunch-mix",
    name: "Seeded Crunch Mix",
    description: "Pumpkin and sunflower blend for all-day snacking.",
    longDescription:
      "A balanced savory-sweet mix for desk breaks and post-workout refuels. Packed with roasted seeds and gentle spice warmth.",
    priceLabel: "INR 259",
    category: "Clean Ingredients",
    tags: ["Low Sugar", "Snack"],
    isFeatured: true,
    status: "active",
  },
  {
    id: "prod-cocoa-trail-mix",
    slug: "cocoa-trail-mix",
    name: "Cocoa Trail Mix",
    description: "Dark chocolate shards, roasted seeds, and almond nibs.",
    longDescription:
      "A crunchy trail mix engineered for quick energy. Dark cocoa accents and roasted nuts make it equally good for workdays and travel packs.",
    priceLabel: "INR 329",
    category: "Dark Chocolate",
    tags: ["Energy", "Crunchy"],
    isFeatured: false,
    status: "active",
  },
  {
    id: "prod-morning-glow-granola",
    slug: "morning-glow-granola",
    name: "Morning Glow Granola",
    description: "Crunchy oats, dried berries, and toasted coconut flakes.",
    longDescription:
      "A pantry staple granola with berry notes and coconut texture. Built to pair well with milk, yogurt, or fruit bowls.",
    priceLabel: "INR 319",
    category: "Breakfast Cereals",
    tags: ["Granola", "Breakfast"],
    isFeatured: false,
    status: "active",
  },
  {
    id: "prod-millet-crunch-squares",
    slug: "millet-crunch-squares",
    name: "Millet Crunch Squares",
    description: "Lightly sweetened bites with peanut and cocoa drizzle.",
    longDescription:
      "Crisp millet squares held together with light jaggery sweetness and topped with a cocoa drizzle. A practical snack that still feels indulgent.",
    priceLabel: "INR 279",
    category: "Clean Ingredients",
    tags: ["Millet", "Low Sugar"],
    isFeatured: false,
    status: "active",
  },
];
