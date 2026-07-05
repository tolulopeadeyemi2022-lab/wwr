import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/legal/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: July 2026</p>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          This Privacy Policy explains how {siteConfig.name} (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
          information when you visit {siteConfig.url}.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect information you voluntarily provide, such as your
          name and email address when you subscribe to our newsletter or
          contact us. We also automatically collect certain information
          through analytics tools, including pages visited, time on site, and
          general location data.
        </p>

        <h2>How We Use Information</h2>
        <ul>
          <li>To deliver newsletter content you&apos;ve requested.</li>
          <li>To respond to inquiries submitted through our contact form.</li>
          <li>To understand site usage and improve our content.</li>
          <li>To measure the performance of our articles and resources.</li>
        </ul>

        <h2>Cookies and Analytics</h2>
        <p>
          We use tools such as Google Analytics, Google Search Console, and
          Vercel Analytics to understand how visitors use our site. These
          tools may use cookies or similar technologies. See our{" "}
          <a href="/legal/cookie-policy">Cookie Policy</a> for details.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services for email marketing, analytics, and
          affiliate tracking. These providers have their own privacy policies
          governing the use of your information.
        </p>

        <h2>Your Choices</h2>
        <p>
          You can unsubscribe from our newsletter at any time using the link
          included in every email. You can also adjust your browser settings
          to limit cookie collection.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect information from
          unauthorized access, but no method of transmission over the
          internet is completely secure.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this Privacy Policy can be directed through our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
