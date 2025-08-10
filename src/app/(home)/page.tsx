import { IntroduceSection } from "@/features/home/components/introduce-section";
import { RecomendedPostSection } from "@/features/home/components/recomended-post-section";
import { TechStackSection } from "@/features/home/components/tech-stack-section";
import { healthCheck } from "@/shared/lib/utils";

export default async function Home() {
  const res = await healthCheck();
  console.log("---------------------");
  console.log(JSON.stringify(res, null, 2));
  return (
    <div className="flex flex-col gap-10 items-center">
      <IntroduceSection />
      <RecomendedPostSection />
      <TechStackSection />
    </div>
  );
}
