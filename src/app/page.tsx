import { Hero } from "@/widgets/hero/Hero";

export default function Home() {
  return (
    <div className="lg:flex lg:min-h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center">
      <Hero />
    </div>
  );
}
