import { capabilities } from "@/entities/skill/model";
import { ButtonLink } from "@/shared/ui/ButtonLink";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Hero } from "@/widgets/hero/Hero";
import { StackList } from "@/widgets/stack-list/StackList";

export default function Home() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Hero />
      <StackList compact />

      <section className="border-t border-hairline py-8 sm:py-12">
        <SectionHeading
          title="Capabilities"
          description="Primary focus areas and technical domains."
          marker="[x]"
        />
        <div className="flex flex-wrap gap-2.5">
          {capabilities.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-[4px] border border-hairline bg-surface-card px-3.5 py-1.5 text-base text-ink font-medium"
            >
              <span className="text-mute font-normal">[x]</span>
              <span>{c}</span>
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/skills" variant="secondary">
            [+] Full skills breakdown →
          </ButtonLink>
          <ButtonLink href="/social" variant="secondary">
            [↗] Social links →
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
