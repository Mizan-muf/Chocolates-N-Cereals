export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  priceLabel: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  status: "active" | "archived";
  imageDataUrl?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tag: string;
  content: string[];
};

export type HomepageDisplayConfig = {
  freshPickProductIds: string[];
  featuredProductIds: string[];
  featuredImageOverrides: Record<string, string>;
};

export type VisualAsset = {
  src: string;
  alt: string;
};

export type SiteVisualConfig = {
  pageZones: {
    home: VisualAsset[];
  };
  productFallbacks: VisualAsset[];
  sectionDividers: {
    heroInline: VisualAsset;
    heroToFeatured: VisualAsset;
    featuredToStory: VisualAsset;
  };
  heroBackgrounds: {
    homeHero: VisualAsset;
    products: VisualAsset;
    blogs: VisualAsset;
    admin: VisualAsset;
    productDetail: VisualAsset;
    blogDetail: VisualAsset;
  };
  altText: Record<string, string>;
};

export type HomepageConfigSanitizeResult = {
  config: HomepageDisplayConfig;
  warnings: string[];
};

export type QuizGoal = "energy" | "indulgence" | "balanced";
export type QuizFlavor = "chocolate-forward" | "nutty" | "light";
export type QuizDietPreference = "high-fiber" | "low-sugar" | "no-preference";
export type QuizTimeOfDay = "morning" | "midday" | "evening";

export type QuizAnswers = {
  goal: QuizGoal;
  flavor: QuizFlavor;
  dietPreference: QuizDietPreference;
  timeOfDay: QuizTimeOfDay;
};

export type CustomConcept = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type CustomRequest = {
  id: string;
  createdAt: string;
  answers: QuizAnswers;
  recommendedProductIds: string[];
  concepts: CustomConcept[];
  status: "open" | "archived";
};
