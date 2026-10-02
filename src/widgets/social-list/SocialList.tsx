import { profile } from "@/entities/profile/model";

export function SocialList() {
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {profile.socials.map((s) => (
        <li
          key={s.label}
          className="flex flex-col gap-1 py-4 text-base sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="flex items-center gap-2 font-bold text-ink sm:w-40 sm:shrink-0">
            <span className="text-mute font-normal">[↗]</span>
            <span>{s.label}</span>
          </div>
          <a
            href={s.href}
            target={s.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="break-all pl-6 text-body underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink sm:pl-0"
          >
            {s.href.replace("mailto:", "")}
          </a>
        </li>
      ))}
    </ul>
  );
}
