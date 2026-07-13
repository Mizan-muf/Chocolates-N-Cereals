import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { initialSiteVisualConfig } from "@/data/siteVisuals";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="site-shell py-12 md:py-16">
      <Link href="/blogs" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        Back to blog
      </Link>
      <article className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="section-divider-image h-[240px]">
              <Image
                src={initialSiteVisualConfig.heroBackgrounds.blogDetail.src}
                alt={initialSiteVisualConfig.heroBackgrounds.blogDetail.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.12em] text-muted">{post.tag}</p>
            <h1 className="mt-2 font-serif text-4xl text-cocoa">{post.title}</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <div className="mt-5 space-y-4 text-muted">
              {post.content.map((paragraph, index) => (
                <p key={`${post.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="page-fill-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Reading Guide</p>
              <p className="mt-3 text-sm text-muted">
                Focus on practical habits you can repeat daily, and adjust based on your routine, schedule, and taste preferences.
              </p>
            </div>
            <div className="page-fill-panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Related Path</p>
              <p className="mt-3 text-sm text-muted">
                Explore products that align with this article from the product catalog and quiz-based suggestions.
              </p>
              <Link href="/products" className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-4" })}>
                Browse products
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
