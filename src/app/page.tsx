import { IntroduceSection } from "@/root/components/introduce-section";
import { RecomendedPostSection } from "@/root/components/recomended-post-section";
import { TechStackSection } from "@/root/components/tech-stack-section";

export default async function Home() {
  return (
    <div className="flex-col-container container mx-auto gap-20 md:gap-25 lg:gap-30">
      <IntroduceSection />
      <RecomendedPostSection />
      <TechStackSection />
    </div>
  );
}
