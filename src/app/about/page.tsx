import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Wealth Within Reach",
  description:
    "Learn about the mission behind Wealth Within Reach and why we write practical, honest personal finance content.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
        About Us
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">
        We write for the person at the kitchen table, not the finance industry.
      </h1>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          Wealth Within Reach started with a simple observation: most personal
          finance content is written to impress other finance writers, not to
          actually help the person reading it. We wanted to build something
          different.
        </p>
        <p>
          We publish practical guidance on budgeting, saving, investing, debt
          payoff, and building long-term wealth. No hype. No guaranteed
          overnight results. Just the kind of advice a knowledgeable friend
          would give you if they had spent years learning how money really
          works.
        </p>
        <h2>Our Mission</h2>
        <p>
          Help everyday people build wealth, improve their money management
          skills, and achieve financial independence, one practical decision
          at a time.
        </p>
        <h2>What We Believe</h2>
        <ul>
          <li>Money is personal. Behind every budget is someone&apos;s family.</li>
          <li>Progress matters more than perfection.</li>
          <li>Discipline beats motivation almost every time.</li>
          <li>
            Trust takes years to build and seconds to lose, so we never
            recommend a product solely because it pays a commission.
          </li>
        </ul>
        <h2>Editorial Standards</h2>
        <p>
          Every article on this site is written to answer one question well:
          what would genuinely help someone make a better financial decision
          today? If a piece doesn&apos;t clear that bar, it doesn&apos;t get
          published.
        </p>
      </div>
    </div>
  );
}
