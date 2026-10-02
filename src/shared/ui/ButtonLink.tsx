import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-[4px] px-5 py-1.5 text-base font-medium leading-[2.0] transition-colors duration-150 text-center select-none";

  const styles =
    variant === "primary"
      ? "bg-ink text-canvas hover:bg-charcoal active:bg-ink-deep border border-transparent"
      : "bg-canvas text-ink border border-hairline-strong hover:bg-surface-soft active:bg-surface-card";

  const combinedClass = `${base} ${styles} ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
