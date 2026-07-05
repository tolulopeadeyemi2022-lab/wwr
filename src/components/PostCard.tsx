import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug } from "@/lib/site";
import type { PostSummary } from "@/lib/posts";

export default function PostCard({ post }: { post: PostSummary }) {
  const category = getCategoryBySlug(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink-900/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-100">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {category && (
          <span className="w-fit rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-700">
            {category.name}
          </span>
        )}
        <h3 className="font-serif text-lg font-bold leading-snug text-ink-900 group-hover:text-forest-700">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-ink-400">
          <span>{post.readingTime}</span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}
