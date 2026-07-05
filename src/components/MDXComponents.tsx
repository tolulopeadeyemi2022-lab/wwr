import Link from "next/link";
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

function slugify(children: React.ReactNode): string {
  return String(children)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function Heading({
  level,
  children,
}: {
  level: 2 | 3;
  children?: React.ReactNode;
}) {
  const id = slugify(children);
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="group scroll-mt-24">
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </Tag>
  );
}

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      wrap: "border-ink-200 bg-ink-50",
      icon: <Info size={18} className="text-ink-600" />,
    },
    warning: {
      wrap: "border-amber-200 bg-amber-50",
      icon: <AlertTriangle size={18} className="text-amber-600" />,
    },
    success: {
      wrap: "border-forest-200 bg-forest-50",
      icon: <CheckCircle2 size={18} className="text-forest-600" />,
    },
  }[type];

  return (
    <div className={`not-prose my-6 rounded-xl border p-4 sm:p-5 ${styles.wrap}`}>
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{styles.icon}</div>
        <div>
          {title && (
            <p className="mb-1 font-semibold text-ink-900">{title}</p>
          )}
          <div className="text-sm leading-relaxed text-ink-700 [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const mdxComponents: MDXComponentsType = {
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: (props) => (
    <span className="not-prose my-6 block overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt || ""} className="w-full" loading="lazy" />
    </span>
  ),
  table: (props) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-ink-100">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-ink-100 bg-ink-50 px-4 py-2.5 text-left font-semibold text-ink-900"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-ink-100 px-4 py-2.5 text-ink-700" {...props} />
  ),
  Callout,
};
