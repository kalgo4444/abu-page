import { profile } from "@/entities/profile/model";

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
        {/* Top row: 4-up desktop, 2-up mobile grid with hairline dividers */}
        <div className="grid grid-cols-2 border-b border-hairline md:grid-cols-4">
          {profile.socials.map((s, idx) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className={`flex h-11 items-center justify-center gap-1.5 px-3 text-[14px] text-body transition-colors hover:bg-surface-soft hover:text-ink ${
                idx % 2 === 1 ? "border-l border-hairline" : ""
              } ${idx >= 2 ? "border-t border-hairline md:border-t-0" : ""} ${
                idx > 0 && idx % 2 === 0 ? "md:border-l md:border-hairline" : ""
              } ${idx === 3 ? "md:border-l md:border-hairline" : ""}`}
            >
              <span className="text-mute font-mono">[↗]</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom row: copyright and location info */}
        <div className="flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row sm:text-left text-[14px] text-mute leading-relaxed">
          <p>© 2026 {profile.name}</p>
          <p>
            {profile.role} · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
