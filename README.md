# Wealth Within Reach

A fast, SEO-optimized personal finance blog built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX. Content is stored as Markdown/MDX files in the repository, so there's no CMS or database to manage.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Content:** MDX files in `content/posts`, parsed with `gray-matter` and rendered with `next-mdx-remote`
- **Icons:** lucide-react
- **Hosting:** GitHub → Vercel

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project Structure

```
content/
  posts/                 # Every article lives here as a .mdx file
src/
  app/
    page.tsx             # Homepage
    [category]/page.tsx  # Category landing pages (money-management, investing, etc.)
    blog/[slug]/page.tsx # Single article page
    resources/           # Free downloadable tools page
    about/, contact/     # Static pages
    legal/                # Privacy Policy, Terms, Affiliate Disclosure, Disclaimer, Cookie Policy
    sitemap.ts           # Auto-generated sitemap.xml
    robots.ts            # Auto-generated robots.txt
    rss.xml/route.ts     # Auto-generated RSS feed
  components/            # Header, Footer, PostCard, NewsletterForm, MDX overrides
  lib/
    posts.ts             # Reads and parses MDX content
    site.ts              # Site config + category definitions
    seo.ts               # JSON-LD helpers (Article, Breadcrumb, FAQ schema)
public/
  images/posts/          # Featured images (replace placeholders with real images)
  downloads/             # Free downloadable CSV templates (replace with your own)
```

## Writing a New Article

Create a new `.mdx` file in `content/posts/`, e.g. `content/posts/my-new-article.mdx`:

```mdx
---
title: "Your Article Title"
slug: "your-article-title"
metaDescription: "17-20 word meta description including your focus keyword."
featuredImage: "/images/posts/your-image.svg"
featuredImageAlt: "Descriptive alt text"
category: "money-management"   # must match a slug in src/lib/site.ts
tags: ["tag one", "tag two"]
author: "Wealth Within Reach"
publishDate: "2026-07-01"
updatedDate: "2026-07-01"       # optional
featured: false                 # true = shows in homepage "Featured" section
relatedPosts: ["other-post-slug"]  # optional explicit related posts
---

Your article content in Markdown/MDX. Use `## H2` and `### H3` headings,
tables, bullet lists, and the custom `<Callout type="info|warning|success" title="...">`
component for callout boxes.
```

The site automatically picks up new files on the next build. No database, no admin panel.

### Available categories

Defined in `src/lib/site.ts`: `money-management`, `investing`, `make-more-money`, `debt-credit`, `financial-independence`. Add a new category by adding an entry to the `categories` array in that file.

## SEO Features (already wired up)

- Static generation (SSG) for every page
- Auto-generated `sitemap.xml`, `robots.txt`, and `rss.xml`
- Per-page metadata: title, meta description, canonical URL, Open Graph, Twitter Card
- `Article` and `BreadcrumbList` JSON-LD structured data on every post (see `src/lib/seo.ts`; a `faqJsonLd` helper is also available if you add an FAQ section)
- Clean URL structure: `/category-slug` and `/blog/post-slug`

## Newsletter Integration

`NewsletterForm` (in `src/components/NewsletterForm.tsx`) currently posts to a placeholder `#` action. To connect a real provider:

1. Sign up for MailerLite, ConvertKit, or Beehiiv.
2. Create an embedded form and copy its form action URL and field names.
3. Update `siteConfig.newsletter.formAction` in `src/lib/site.ts`, and adjust the `name="email"` input if your provider expects a different field name.

## Free Resources / Downloads

Placeholder CSV templates live in `public/downloads/`. Replace `monthly-budget-planner.csv`, `savings-tracker.csv`, and `expense-tracker.csv` with your own polished templates (PDF, XLSX, or Google Sheets links all work, just update the `file` paths in `src/app/resources/page.tsx`).

## Images

Starter articles ship with simple SVG placeholder graphics in `public/images/posts/`. Replace them with real photography, illustrations, or graphics before launch (WebP recommended for photos; keep the same file paths or update the `featuredImage` field in each post's frontmatter).

## Analytics

Add these when ready, no code changes required beyond dropping in the scripts:

- **Vercel Analytics:** enable in your Vercel project dashboard, or `npm install @vercel/analytics` and add `<Analytics />` to `src/app/layout.tsx`.
- **Google Analytics 4 / Google Search Console:** add your GA4 measurement script to `src/app/layout.tsx`, and verify domain ownership in Search Console using the DNS or HTML-file method.
- **Microsoft Clarity:** add the Clarity tracking script the same way.

## Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Wealth Within Reach"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wealth-within-reach.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. Framework preset: **Next.js** (auto-detected).
3. Add an environment variable `NEXT_PUBLIC_SITE_URL` set to your deployed URL (e.g. `https://wealthwithinreach.vercel.app`, or your custom domain once connected).
4. Click **Deploy**.

Every push to `main` automatically redeploys.

### 3. Connect a Custom Domain (later)

In your Vercel project settings, go to **Domains** and add your domain. Update `NEXT_PUBLIC_SITE_URL` to match once connected, since it's used to build canonical URLs, Open Graph tags, and the sitemap.

## What's Out of Scope in Version 1

Per the project brief, the following are intentionally excluded for now and can be added later: user accounts, comments, paid membership, native e-commerce checkout, a headless CMS, interactive financial calculators, and a mobile app.

## Editorial Guidelines

Every article on this site should follow the tone, structure, and SEO rules in the project's editorial guide: write directly to the reader, never use em dashes, keep sentences under ~25 words, vary sentence rhythm, include real numbers and examples, and end every article with a clear next action. See the original writing brief for the full standard.
