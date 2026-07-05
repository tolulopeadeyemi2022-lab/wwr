import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { categories } from "@/lib/site";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPosts(3);
  const latest = allPosts.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-forest-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
              Personal finance, minus the jargon
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
              Build wealth with money advice you can actually use.
            </h1>
            <p className="mt-5 text-lg text-ink-600">
              Wealth Within Reach helps everyday people budget better, pay off
              debt, start investing, and build lasting financial security.
              No get-rich-quick promises. Just practical steps that work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/money-management"
                className="rounded-lg bg-forest-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700"
              >
                Start With Money Management
              </Link>
              <Link
                href="/resources"
                className="rounded-lg border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 transition hover:border-forest-300 hover:text-forest-700"
              >
                Get Free Financial Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
              Featured Articles
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="border-y border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
            Popular Categories
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-ink-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-forest-200 hover:shadow-md"
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink-900 group-hover:text-forest-700">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{c.description}</p>
                </div>
                <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-forest-700">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest posts */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
              Latest Posts
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <NewsletterForm />
      </section>
    </div>
  );
}
