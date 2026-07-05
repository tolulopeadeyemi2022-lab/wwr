import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getPostsByCategory } from "@/lib/posts";
import { categories, getCategoryBySlug, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `${siteConfig.url}/${category.slug}` },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div>
      <section className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
            Category
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-ink-600">{category.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-ink-600">
            New articles for this category are on the way. Check back soon.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <NewsletterForm />
      </section>
    </div>
  );
}
