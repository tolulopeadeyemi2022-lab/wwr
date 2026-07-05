"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PiggyBank } from "lucide-react";
import { categories, siteConfig } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600 text-white">
            <PiggyBank size={18} strokeWidth={2.25} />
          </span>
          <span className="font-serif text-lg font-bold text-ink-900">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="text-sm font-medium text-ink-600 transition hover:text-forest-700"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/resources"
            className="text-sm font-medium text-ink-600 transition hover:text-forest-700"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-ink-600 transition hover:text-forest-700"
          >
            About
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/#newsletter"
            className="rounded-lg bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700"
          >
            Get free tips
          </Link>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-100 px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/resources"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              Resources
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
