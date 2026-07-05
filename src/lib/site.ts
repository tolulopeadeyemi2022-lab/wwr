export const siteConfig = {
  name: "Wealth Within Reach",
  shortName: "WWR",
  description:
    "Practical, honest personal finance guidance on budgeting, saving, investing, debt payoff, and building lasting wealth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wealthwithinreach.vercel.app",
  ogImage: "/images/og-default.png",
  author: {
    name: "Wealth Within Reach",
    twitter: "@wealthwithinreach",
  },
  links: {
    twitter: "https://twitter.com/wealthwithinreach",
    facebook: "https://facebook.com/wealthwithinreach",
    pinterest: "https://pinterest.com/wealthwithinreach",
  },
  newsletter: {
    // Swap this for your MailerLite / ConvertKit / Beehiiv form action URL.
    formAction: "#",
  },
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "money-management",
    name: "Money Management",
    description:
      "Budgeting, saving, emergency funds, frugal living, and financial planning that fits real life.",
  },
  {
    slug: "investing",
    name: "Investing",
    description:
      "Beginner investing, index funds, ETFs, stocks, dividend investing, and retirement accounts explained simply.",
  },
  {
    slug: "make-more-money",
    name: "Make More Money",
    description:
      "Side hustles, freelancing, online business, passive income, and entrepreneurship for real people.",
  },
  {
    slug: "debt-credit",
    name: "Debt & Credit",
    description:
      "Paying off debt, credit scores, credit cards, loans, and student loans without the shame spiral.",
  },
  {
    slug: "financial-independence",
    name: "Financial Independence",
    description:
      "FIRE, wealth building, net worth growth, and long-term investing for a life you don't need to retire from.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
