import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { initialSiteVisualConfig } from "@/data/siteVisuals";
import { getAllBlogPosts } from "@/lib/content";

export default function BlogsPage() {
  const posts = getAllBlogPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <main className="site-shell py-12 md:py-16">
      <section className="page-fill-panel relative mb-8 overflow-hidden p-6 md:p-8">
        <Image
          src={initialSiteVisualConfig.heroBackgrounds.blogs.src}
          alt={initialSiteVisualConfig.heroBackgrounds.blogs.alt}
          fill
          sizes="92vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f3eaf5] via-[#f8f3ead9] to-[#f8f3eaad]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Editorial</p>
          <h1 className="mt-2 font-serif text-4xl text-cocoa">Blog</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
            Practical, wellness-minded reads on routines, ingredients, and flavor-first choices for everyday living.
          </p>
        </div>
      </section>

      {featuredPost && (
        <section className="page-fill-panel mb-8 p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Featured Article</p>
          <h2 className="mt-2 font-serif text-3xl text-cocoa">{featuredPost.title}</h2>
          <p className="mt-2 text-sm text-muted">{featuredPost.excerpt}</p>
          <div className="mt-4">
            <Link href={`/blogs/${featuredPost.slug}`} className="text-sm font-semibold text-accent hover:underline">
              Read featured article
            </Link>
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restPosts.map((post) => (
          <Card key={post.id} interactive className="h-full">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">{post.tag}</p>
            <h2 className="mt-2 font-serif text-2xl text-cocoa">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <div className="mt-4">
              <Link href={`/blogs/${post.slug}`} className="text-sm font-semibold text-accent hover:underline">
                Read article
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
