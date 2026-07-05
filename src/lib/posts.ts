import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  slug: string;
  metaDescription: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  updatedDate?: string;
  featured?: boolean;
  relatedPosts?: string[];
};

export type PostSummary = PostFrontmatter & {
  readingTime: string;
  excerpt: string;
};

export type Post = PostSummary & {
  content: string;
};

function getMdxFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllPosts(): PostSummary[] {
  const files = getMdxFiles();

  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    const excerpt =
      data.metaDescription ||
      content.trim().split("\n").find((line) => line.trim().length > 0)?.slice(0, 160) ||
      "";

    return {
      ...(data as PostFrontmatter),
      readingTime: stats.text,
      excerpt,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = getMdxFiles();
  const filename = files.find((f) => f.replace(/\.mdx$/, "") === slug);
  if (!filename) return undefined;

  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const excerpt = data.metaDescription || "";

  return {
    ...(data as PostFrontmatter),
    readingTime: stats.text,
    excerpt,
    content,
  };
}

export function getPostsByCategory(categorySlug: string): PostSummary[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getFeaturedPosts(limit = 3): PostSummary[] {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  return (featured.length > 0 ? featured : posts).slice(0, limit);
}

export function getRelatedPosts(post: Post, limit = 3): PostSummary[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);

  if (post.relatedPosts && post.relatedPosts.length > 0) {
    const explicit = all.filter((p) => post.relatedPosts?.includes(p.slug));
    if (explicit.length > 0) return explicit.slice(0, limit);
  }

  const sameCategory = all.filter((p) => p.category === post.category);
  return sameCategory.slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map((f) => f.replace(/\.mdx$/, ""));
}
