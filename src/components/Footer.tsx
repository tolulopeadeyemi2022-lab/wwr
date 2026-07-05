import Link from "next/link";
import { PiggyBank, Twitter, Facebook } from "lucide-react";
import { categories, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-600 text-white">
                <PiggyBank size={16} />
              </span>
              <span className="font-serif text-base font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-ink-300">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.links.twitter}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-ink-200 transition hover:bg-forest-600 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
              <a
                href={siteConfig.links.facebook}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-ink-200 transition hover:bg-forest-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Topics
            </p>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="text-sm text-ink-300 hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Site
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-ink-300 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="text-sm text-ink-300 hover:text-white">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-900 pt-6 sm:flex-row">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-ink-400">
            <Link href="/legal/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/legal/affiliate-disclosure" className="hover:text-white">
              Affiliate Disclosure
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
            <Link href="/legal/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-ink-500">
          Wealth Within Reach provides general educational content and does
          not constitute personalized financial, investment, tax, or legal
          advice. Always consider consulting a licensed professional about
          your specific situation.
        </p>
      </div>
    </footer>
  );
}
