import { siteConfig } from "@/lib/site";

export default function NewsletterForm({
  variant = "default",
}: {
  variant?: "default" | "compact" | "inline";
}) {
  if (variant === "compact") {
    return (
      <form
        action={siteConfig.newsletter.formAction}
        method="post"
        className="flex flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-forest-100 bg-forest-50 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
        Free weekly newsletter
      </p>
      <h3 className="mt-2 font-serif text-xl font-bold text-ink-900 sm:text-2xl">
        One practical money idea, every week.
      </h3>
      <p className="mt-2 text-sm text-ink-600">
        No spam, no hype, no &quot;secret&quot; strategies. Just the kind of
        advice you would want if you were building wealth from scratch.
      </p>
      <form
        action={siteConfig.newsletter.formAction}
        method="post"
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700"
        >
          Subscribe free
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-500">
        Join readers who are done guessing with their money. Unsubscribe
        anytime.
      </p>
    </div>
  );
}
