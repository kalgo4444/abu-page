import { SectionHeading } from "@/shared/ui/SectionHeading";
import { SocialList } from "@/widgets/social-list/SocialList";

export default function SocialPage() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <SectionHeading
        title="Social & Profiles"
        description="External links, profiles, and contact methods."
        marker="[+]"
      />
      <div className="mt-6">
        <SocialList />
      </div>
    </section>
  );
}
