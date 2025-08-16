import { IntroduceSection } from "@/root/components/introduce-section";
import { RecomendedPostSection } from "@/root/components/recomended-post-section";
import { TechStackSection } from "@/root/components/tech-stack-section";

export default async function Home() {
  return (
    <div className="flex flex-col gap-30 items-center container mx-auto mt-10 mb-30">
      <IntroduceSection />
      <RecomendedPostSection />
      <TechStackSection />
    </div>
  );
}
