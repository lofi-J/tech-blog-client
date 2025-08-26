import { Badge } from "@/shared/components/ui/badge";
import GithubIcon from "@/shared/icons/github.svg";
import { DotBackground } from "./dot-background";

export const IntroduceSection = () => {
  return (
    <DotBackground>
      <section className="flex flex-1 flex-col items-center justify-center md:py-20 py-15 relative">
        <a href="https://github.com/lofi-J" target="_blank">
          <Badge variant="highlight">
            <GithubIcon fill="currentColor" />
            <span className="text-sm">Github/lofi-J</span>
          </Badge>
        </a>
        <h1 className="md:text-5xl text-4xl font-bold mt-4 tracking-wide">
          Welcome
        </h1>
        <h2 className="md:text-[16px] text-[14px] font-bold mt-1">
          to Lofi-J Tech Blog
        </h2>
        <p className="text-center text-[14px] md:text-[16px] md:mt-8 mt-6 font-semibold wrap-break-word">
          해당 블로그는 프론트엔드 영역뿐만 아니라 백엔드, DevOps,
          <br className="md:hidden" /> 아키텍처 등
          <br className="md:block hidden" />
          개발관련 관심사들을 다룰 예정입니다.
        </p>
      </section>
    </DotBackground>
  );
};
