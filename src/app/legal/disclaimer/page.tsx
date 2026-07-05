import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Financial disclaimer for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/legal/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink-900">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: July 2026</p>

      <div className="prose prose-ink mt-8 max-w-none">
        <p>
          The information provided on {siteConfig.url} is for general
          educational and informational purposes only. It is not intended as,
          and should not be interpreted as, personalized financial,
          investment, tax, or legal advice.
        </p>

        <h2>No Professional Relationship</h2>
        <p>
          Reading content on this site does not create a
          financial-advisor-client relationship between you and{" "}
          {siteConfig.name}. Always consult a licensed financial advisor, tax
          professional, or attorney regarding your specific circumstances
          before making financial decisions.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We work to keep information accurate and current, but financial
          regulations, tax laws, interest rates, and products change
          frequently. We cannot guarantee that every detail remains accurate
          at the time you read it.
        </p>

        <h2>No Guaranteed Results</h2>
        <p>
          Any examples, case studies, or hypothetical scenarios described on
          this site are for illustrative purposes only. Past performance of
          any investment or strategy does not guarantee future results.
        </p>

        <h2>Your Responsibility</h2>
        <p>
          You are solely responsible for evaluating the accuracy,
          completeness, and usefulness of any information on this site before
          relying on it for a financial decision.
        </p>
      </div>
    </div>
  );
}
