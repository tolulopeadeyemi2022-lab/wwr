import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/legal/terms` },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink-900">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: July 2026</p>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          By accessing {siteConfig.url}, you agree to be bound by these Terms
          &amp; Conditions. If you do not agree, please discontinue use of
          the site.
        </p>

        <h2>Use of Content</h2>
        <p>
          All articles, graphics, templates, and other materials on this site
          are provided for informational and educational purposes only.
          Content may not be reproduced, distributed, or republished without
          prior written permission.
        </p>

        <h2>Not Financial Advice</h2>
        <p>
          Content published on {siteConfig.name} is general in nature and
          does not constitute personalized financial, investment, tax, or
          legal advice. See our <a href="/legal/disclaimer">Disclaimer</a>{" "}
          for more information.
        </p>

        <h2>User Conduct</h2>
        <p>
          You agree not to use this site for unlawful purposes, to
          distribute malware, or to attempt unauthorized access to our
          systems.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites, including
          affiliate partners. We are not responsible for the content or
          practices of external sites.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          {siteConfig.name} is not liable for any financial decisions made
          based on content published on this site. Use of any information is
          at your own risk.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may revise these Terms at any time. Continued use of the site
          constitutes acceptance of the revised Terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about these Terms can be directed through our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
