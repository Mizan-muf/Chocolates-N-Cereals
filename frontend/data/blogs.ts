import type { BlogPost } from "@/types/content";

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-breakfast-timing-guide",
    slug: "breakfast-timing-guide",
    title: "A practical breakfast timing guide for busy mornings",
    excerpt:
      "Simple ways to pace breakfast and snacks when your mornings are packed.",
    publishedAt: "2026-02-01",
    tag: "Nutrition",
    content: [
      "If your mornings move fast, consistency matters more than perfection. Keep a short list of breakfast options that take under five minutes.",
      "Start with fiber and protein first, then add something you genuinely enjoy. This keeps energy more stable and helps avoid mid-morning crashes.",
      "Prepare one shelf in your pantry as your morning station: cereals, nuts, seed mix, and portioned add-ons.",
    ],
  },
  {
    id: "blog-cocoa-snack-pairings",
    slug: "cocoa-snack-pairings",
    title: "How to pair cocoa snacks with your workday routine",
    excerpt:
      "Build small snack rituals that feel rewarding without overdoing sugar.",
    publishedAt: "2026-01-20",
    tag: "Lifestyle",
    content: [
      "Cocoa snacks work best in small portions around natural break points in your day. Pair them with nuts or fruit for better satiety.",
      "Use intentional portions instead of open packets. This keeps your snack predictable and helps avoid distracted eating.",
      "Late afternoon cravings are normal. A measured cocoa snack can be part of a balanced routine when paired with water and a short walk.",
    ],
  },
  {
    id: "blog-clean-label-cereal-checklist",
    slug: "clean-label-cereal-checklist",
    title: "A clean-label cereal checklist you can use in 30 seconds",
    excerpt: "A quick framework to evaluate cereal labels without overthinking.",
    publishedAt: "2026-01-09",
    tag: "Buying Guide",
    content: [
      "Read ingredient order first. If your top ingredients are whole grains and nuts, you are usually on a better track.",
      "Then check added sugar in context of serving size. Compare products at the same serving size for a fair comparison.",
      "Finally, ask if it fits your real routine. The best cereal is the one you will use consistently.",
    ],
  },
];
