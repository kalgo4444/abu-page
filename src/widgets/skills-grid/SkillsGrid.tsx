import { capabilities, skillGroups } from "@/entities/skill/model";
import { SectionHeading } from "@/shared/ui/SectionHeading";

export function SkillsGrid() {
  return (
    <section className="space-y-12 sm:space-y-16">
      {/* Capabilities Section */}
      <div>
        <SectionHeading
          title="Capabilities"
          description="High-level engineering domains and proficiencies."
          marker="[x]"
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 rounded-[4px] border border-hairline bg-surface-card px-4 py-3 text-base text-ink font-medium transition-colors hover:bg-surface-soft"
            >
              <span className="text-mute font-normal">[x]</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown Section */}
      <div>
        <SectionHeading
          title="Stack Breakdown"
          description="Detailed stack mapping across layers."
          marker="[+]"
        />
        <dl className="divide-y divide-hairline border-y border-hairline">
          {skillGroups.map((g) => (
            <div
              key={g.title}
              className="flex flex-col gap-1 py-4 text-base sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="flex items-center gap-2 font-bold text-ink sm:w-44 sm:shrink-0">
                <span className="text-mute font-normal">[+]</span>
                <span>{g.title}</span>
              </dt>
              <dd className="text-body font-normal pl-6 sm:pl-0">
                {g.items.map((item, idx) => (
                  <span key={item}>
                    {idx > 0 && <span className="text-mute mx-2">·</span>}
                    <span>{item}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
