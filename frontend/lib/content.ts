import { initialBlogPosts } from "@/data/blogs";
import { initialHomepageDisplayConfig } from "@/data/homepageDisplay";
import { initialProducts } from "@/data/products";
import type {
  BlogPost,
  CustomConcept,
  HomepageConfigSanitizeResult,
  HomepageDisplayConfig,
  Product,
  QuizAnswers,
} from "@/types/content";

export function getAllProducts(): Product[] {
  return initialProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return initialProducts.find((product) => product.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return initialBlogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return initialBlogPosts.find((post) => post.slug === slug);
}

export function getDefaultHomepageDisplayConfig(): HomepageDisplayConfig {
  return initialHomepageDisplayConfig;
}

export function sanitizeHomepageConfig(
  products: Product[],
  config: HomepageDisplayConfig,
): HomepageConfigSanitizeResult {
  const validProductIds = new Set(products.map((product) => product.id));
  const warnings: string[] = [];

  const uniqueFresh = Array.from(new Set(config.freshPickProductIds));
  const uniqueFeatured = Array.from(new Set(config.featuredProductIds));

  const freshPickProductIds = uniqueFresh.filter((id) => validProductIds.has(id));
  const featuredProductIds = uniqueFeatured.filter((id) =>
    validProductIds.has(id),
  );
  const featuredImageOverrides = Object.fromEntries(
    Object.entries(config.featuredImageOverrides ?? {}).filter(
      ([id, value]) => validProductIds.has(id) && value.trim().length > 0,
    ),
  );

  if (freshPickProductIds.length !== uniqueFresh.length) {
    warnings.push(
      "Some Fresh Picks references were removed because products no longer exist.",
    );
  }

  if (featuredProductIds.length !== uniqueFeatured.length) {
    warnings.push(
      "Some Featured Picks references were removed because products no longer exist.",
    );
  }

  if (
    Object.keys(featuredImageOverrides).length !==
    Object.keys(config.featuredImageOverrides ?? {}).length
  ) {
    warnings.push(
      "Some Featured Picks image overrides were removed because products no longer exist.",
    );
  }

  return {
    config: {
      freshPickProductIds,
      featuredProductIds,
      featuredImageOverrides,
    },
    warnings,
  };
}

export function getHomepageFreshPicks(
  products: Product[],
  config: HomepageDisplayConfig,
): Product[] {
  const byId = new Map(products.map((product) => [product.id, product]));

  const fromConfig = config.freshPickProductIds
    .map((id) => byId.get(id))
    .filter((product): product is Product => Boolean(product));

  if (fromConfig.length >= 3) {
    return fromConfig.slice(0, 3);
  }

  const used = new Set(fromConfig.map((product) => product.id));
  const activeFallback = products.filter(
    (product) => product.status === "active" && !used.has(product.id),
  );
  const archivedFallback = products.filter(
    (product) => product.status === "archived" && !used.has(product.id),
  );

  return [...fromConfig, ...activeFallback, ...archivedFallback].slice(0, 3);
}

export function getHomepageFeatured(
  products: Product[],
  config: HomepageDisplayConfig,
): Product[] {
  const byId = new Map(products.map((product) => [product.id, product]));

  const fromConfig = config.featuredProductIds
    .map((id) => byId.get(id))
    .filter((product): product is Product => Boolean(product));

  if (fromConfig.length > 0) {
    return fromConfig.slice(0, 6);
  }

  const activeFeatured = products.filter(
    (product) => product.isFeatured && product.status === "active",
  );
  const archivedFeatured = products.filter(
    (product) => product.isFeatured && product.status === "archived",
  );

  return [...activeFeatured, ...archivedFeatured].slice(0, 6);
}

export function getTopQuizRecommendations(
  products: Product[],
  answers: QuizAnswers,
  limit = 3,
): Product[] {
  const scored = products
    .filter((product) => product.status === "active")
    .map((product) => {
      let score = 0;
      const normalizedText = `${product.name} ${product.description} ${product.longDescription} ${product.category} ${product.tags.join(" ")}`.toLowerCase();

      if (answers.goal === "energy" && /(energy|fiber|oat|granola|trail|breakfast)/.test(normalizedText)) {
        score += 3;
      }
      if (answers.goal === "indulgence" && /(dark|chocolate|cocoa|indulgent|sweet)/.test(normalizedText)) {
        score += 3;
      }
      if (answers.goal === "balanced" && /(clean|seed|mix|balanced|light)/.test(normalizedText)) {
        score += 3;
      }

      if (answers.flavor === "chocolate-forward" && /(chocolate|cocoa|dark)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.flavor === "nutty" && /(nut|almond|hazelnut|seed)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.flavor === "light" && /(light|clean|fresh|oat)/.test(normalizedText)) {
        score += 2;
      }

      if (answers.dietPreference === "high-fiber" && /(fiber|oat|granola|seed)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.dietPreference === "low-sugar" && /(low sugar|jaggery|clean)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.timeOfDay === "morning" && /(morning|breakfast|cereal|granola|oat)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.timeOfDay === "midday" && /(snack|trail|mix|crunch)/.test(normalizedText)) {
        score += 2;
      }
      if (answers.timeOfDay === "evening" && /(dark|chocolate|indulgent|bite)/.test(normalizedText)) {
        score += 2;
      }

      return { product, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.product);
}

export function buildCustomConcepts(answers: QuizAnswers): CustomConcept[] {
  const goalMap = {
    energy: "Power",
    indulgence: "Velvet",
    balanced: "Harmony",
  } as const;

  const flavorMap = {
    "chocolate-forward": "Cocoa",
    nutty: "Nut",
    light: "Light",
  } as const;

  const conceptA: CustomConcept = {
    id: `concept-${goalMap[answers.goal].toLowerCase()}-${flavorMap[answers.flavor].toLowerCase()}`,
    title: `${goalMap[answers.goal]} ${flavorMap[answers.flavor]} Blend`,
    description: `A custom batch designed for ${answers.timeOfDay} routines with a ${answers.flavor.replace("-", " ")} profile and ${answers.dietPreference.replace("-", " ")} focus.`,
    tags: [answers.goal, answers.flavor, answers.dietPreference],
  };

  const conceptB: CustomConcept = {
    id: `concept-signature-${answers.timeOfDay}`,
    title: `Signature ${answers.timeOfDay[0].toUpperCase()}${answers.timeOfDay.slice(1)} Crunch`,
    description: `Tailored texture and sweetness balance for ${answers.timeOfDay} cravings, blending your ${answers.goal} preference with pantry-friendly ingredients.`,
    tags: [answers.timeOfDay, answers.goal, "custom"],
  };

  return [conceptA, conceptB];
}
