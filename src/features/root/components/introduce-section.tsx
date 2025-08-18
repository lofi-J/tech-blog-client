import { Badge } from "@/shared/components/ui/badge";
import GithubIcon from "@/shared/icons/github.svg";

export const IntroduceSection = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center md:py-20 py-15">
      <a href="https://github.com/lofi-J" target="_blank">
        <Badge variant="secondary" style={{ color: "var(--foreground)" }}>
          <GithubIcon fill="currentColor" />
          <span className="text-sm">Github/lofi-J</span>
        </Badge>
      </a>
      <h1 className="text-5xl font-bold mt-4 tracking-wide">Welcome</h1>
      <h2 className="text-[16px] font-bold mt-1">to Lofi-J Tech Blog</h2>
      <p className="text-center text-[16px] mt-8 font-semibold">
        해당 블로그는 프론트엔드 영역뿐만 아니라 백엔드, DevOps, 아키텍처 등
        <br />
        개발관련 관심사들을 다룰 예정입니다.
      </p>
    </section>
  );
};
