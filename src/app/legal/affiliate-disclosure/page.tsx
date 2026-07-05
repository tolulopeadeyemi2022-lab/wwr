import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `Affiliate Disclosure for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/legal/affiliate-disclosure` },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink-900">
        Affiliate Disclosure
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: July 2026</p>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          {siteConfig.name} may participate in affiliate marketing programs,
          which means we may earn a commission if you click a link and make a
          purchase or sign up for a service, at no additional cost to you.
        </p>

        <h2>Our Editorial Standard</h2>
        <p>
          We never recommend a product, service, or financial tool solely
          because it pays a commission. Every recommendation must pass one
          test: would we recommend this if there were no affiliate program at
          all? If the answer is no, we don&apos;t recommend it.
        </p>

        <h2>How to Identify Affiliate Links</h2>
        <p>
          Where required, affiliate links and sponsored content will be
          clearly disclosed within the relevant article, typically near the
          product mention or comparison table.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about a specific recommendation or affiliate
          relationship, reach out through our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
