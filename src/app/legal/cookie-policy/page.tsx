import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/legal/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink-900">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: July 2026</p>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          This Cookie Policy explains how {siteConfig.name} uses cookies and
          similar tracking technologies when you visit {siteConfig.url}.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device that help
          websites remember information about your visit.
        </p>

        <h2>How We Use Cookies</h2>
        <ul>
          <li>
            <strong>Analytics cookies:</strong> Tools like Google Analytics
            and Microsoft Clarity help us understand how visitors use our
            site so we can improve our content.
          </li>
          <li>
            <strong>Functional cookies:</strong> These remember basic site
            preferences to improve your browsing experience.
          </li>
          <li>
            <strong>Affiliate tracking cookies:</strong> Used to track
            referrals to affiliate partners, which may earn us a commission
            as described in our{" "}
            <a href="/legal/affiliate-disclosure">Affiliate Disclosure</a>.
          </li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>
          Most browsers allow you to control cookies through their settings.
          You can typically block or delete cookies, though doing so may
          affect certain site functionality.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy periodically to reflect changes in
          the tools we use. Updates will be posted on this page.
        </p>
      </div>
    </div>
  );
}
