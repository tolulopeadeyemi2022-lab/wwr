import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Wealth Within Reach team.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
        Contact
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">
        Let&apos;s talk.
      </h1>
      <p className="mt-3 text-ink-600">
        Questions, feedback, or a topic you&apos;d like us to cover? Send a
        message below.
      </p>

      {/*
        This is a static placeholder form. Wire it up to a service like
        Formspree, Resend, or a custom API route before launch.
      */}
      <form className="mt-8 space-y-4" action="#" method="post">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border border-ink-200 px-4 py-2.5 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700"
        >
          <Mail size={16} />
          Send Message
        </button>
      </form>
    </div>
  );
}
