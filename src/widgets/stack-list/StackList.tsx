import { skillGroups } from "@/entities/skill/model";
import { SectionHeading } from "@/shared/ui/SectionHeading";

export function StackList({ compact = false }: { compact?: boolean }) {
  const groups = compact ? skillGroups.slice(0, 3) : skillGroups;

  return (
    <section className="py-8 sm:py-12 border-t border-hairline">
      <SectionHeading
        title="Stack"
        description="Technologies & tools I work with daily."
        marker="[+]"
      />
      <dl className="divide-y divide-hairline border-y border-hairline">
        {groups.map((g) => (
          <div
            key={g.title}
            className="flex flex-col gap-1 py-3.5 text-base sm:flex-row sm:items-baseline sm:gap-6"
          >
            <dt className="flex items-center gap-2 font-bold text-ink sm:w-40 sm:shrink-0">
              <span className="text-mute font-normal">[+]</span>
              <span>{g.title}</span>
            </dt>
            <dd className="text-body font-normal pl-6 sm:pl-0">
              {g.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
