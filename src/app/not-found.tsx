import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-600">
        <Compass size={26} />
      </span>
      <h1 className="mt-6 font-serif text-3xl font-bold text-ink-900">
        This page took a wrong turn.
      </h1>
      <p className="mt-3 text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist, or it may have
        moved. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
