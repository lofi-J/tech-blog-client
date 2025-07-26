import { Badge } from "@/shared/components/ui/badge";
import GithubIcon from "@/shared/icons/github.svg";

export const IntroduceSection = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <a href="https://github.com/lofi-J" target="_blank">
        <Badge variant="secondary" style={{ color: "var(--foreground)" }}>
          <GithubIcon fill="currentColor" />
          <span className="text-sm">Github</span>
        </Badge>
      </a>
      <h1>Wellcome to Lofi-J Blog</h1>
      <p></p>
    </section>
  );
};
