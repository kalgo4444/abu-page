"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/entities/profile/model";
import { Container } from "@/shared/ui/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/social", label: "Social" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-ink transition-colors hover:text-ink-deep"
          onClick={() => setOpen(false)}
        >
          <span className="text-mute font-normal">[·]</span>
          <span>ABU</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 text-base">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition-colors duration-150 py-1 ${
                    isActive
                      ? "text-ink font-bold border-b-2 border-ink"
                      : "text-mute hover:text-ink font-normal"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <a
            href={profile.links.email}
            className="inline-flex h-[36px] items-center justify-center rounded-[4px] bg-ink px-4 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-charcoal active:bg-ink-deep"
          >
            [+] Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={profile.links.email}
            className="inline-flex h-9 items-center justify-center rounded-[4px] bg-ink px-3 text-xs font-medium text-canvas"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 min-w-[54px] items-center justify-center rounded-[4px] border border-hairline-strong bg-canvas px-2.5 text-xs font-medium text-ink transition-colors hover:bg-surface-soft active:bg-surface-card"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? "[close]" : "[menu]"}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {open ? (
        <div className="border-t border-hairline bg-canvas px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex h-11 items-center px-3 rounded-[4px] text-base transition-colors ${
                    isActive
                      ? "bg-surface-card font-bold text-ink"
                      : "text-body hover:bg-surface-soft hover:text-ink font-normal"
                  }`}
                >
                  <span className="mr-2 text-mute">
                    {isActive ? "[x]" : "[+]"}
                  </span>
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
