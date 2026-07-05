import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, Calendar } from "lucide-react";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { getCategoryBySlug, siteConfig } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { mdxComponents } from "@/components/MDXComponents";
import NewsletterForm from "@/components/NewsletterForm";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url,
      images: [{ url: post.featuredImage, width: 1200, height: 750 }],
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);
  const related = getRelatedPosts(post, 3);

  const jsonLd = articleJsonLd(post);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    ...(category
      ? [{ name: category.name, url: `${siteConfig.url}/${category.slug}` }]
      : []),
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ]);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
          <Link href="/" className="hover:text-forest-700">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/${category.slug}`} className="hover:text-forest-700">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-ink-700">{post.title}</span>
        </nav>

        {category && (
          <Link
            href={`/${category.slug}`}
            className="w-fit rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
          >
            {category.name}
          </Link>
        )}

        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-500">
          <span className="font-medium text-ink-700">{post.author}</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>

        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-100">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="prose prose-ink max-w-none prose-headings:font-serif">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-12">
          <NewsletterForm variant="compact" />
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-ink-900">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PostCard key={r.slug} post={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
