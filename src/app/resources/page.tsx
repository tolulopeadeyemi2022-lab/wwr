import type { Metadata } from "next";
import { Download, FileSpreadsheet, PiggyBank, Target } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Financial Resources & Templates",
  description:
    "Download free budgeting templates, savings trackers, and expense trackers to help you manage money with more confidence.",
  alternates: { canonical: `${siteConfig.url}/resources` },
};

const resources = [
  {
    title: "Monthly Budget Planner",
    description:
      "A simple spreadsheet using the 50/30/20 framework to plan every dollar before the month begins.",
    icon: FileSpreadsheet,
    file: "/downloads/monthly-budget-planner.csv",
  },
  {
    title: "Savings Tracker",
    description:
      "Track progress toward your emergency fund or any savings goal with a visual, easy-to-update tracker.",
    icon: PiggyBank,
    file: "/downloads/savings-tracker.csv",
  },
  {
    title: "Expense Tracker",
    description:
      "Log daily spending by category so you can see exactly where your money goes each month.",
    icon: Target,
    file: "/downloads/expense-tracker.csv",
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="border-b border-ink-100 bg-ink-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-forest-700">
            Free Resources
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">
            Financial Tools Worth Actually Using
          </h1>
          <p className="mt-3 max-w-2xl text-ink-600">
            Every template here is free, no email required for the basic
            version, though subscribing gets you future tools first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                <r.icon size={20} />
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-ink-900">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-600">
                {r.description}
              </p>
              <a
                href={r.file}
                download
                className="mt-4 flex w-fit items-center gap-2 rounded-lg bg-forest-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700"
              >
                <Download size={15} />
                Download
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-500">
          Note: sample downloads are placeholders in this starter project.
          Replace the files in <code>/public/downloads</code> with your own
          templates before launch.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <NewsletterForm />
      </section>
    </div>
  );
}
