import { CapabilityList } from "@/shared/ui/CapabilityList";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { StackRows } from "@/shared/ui/StackRows";

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
        <CapabilityList layout="grid" />
      </div>

      {/* Breakdown Section */}
      <div>
        <SectionHeading
          title="Stack Breakdown"
          description="Detailed stack mapping across layers."
          marker="[+]"
        />
        <StackRows />
      </div>
    </section>
  );
}
