import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-ink text-canvas hover:bg-charcoal active:bg-ink-deep border border-transparent",
  secondary:
    "bg-canvas text-ink border border-hairline-strong hover:bg-surface-soft active:bg-surface-card",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-[4px] px-5 py-1.5 text-base font-medium leading-[2.0] transition-colors duration-150 text-center select-none";
  const combinedClass = `${base} ${variants[variant]}${className ? ` ${className}` : ""}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        className={combinedClass}
        target={isWeb ? "_blank" : undefined}
        rel={isWeb ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClass}>
      {children}
    </Link>
  );
}
