"use client";

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="w-full flex-1 flex items-center">
      <div className="f-col items-center justify-center flex-1">
        <h1 className="font-jetbrains-mono text-4xl font-bold">
          404 Not Found
        </h1>
        <p className="font-jetbrains-mono rts-16 my-10 flex items-center gap-2">
          <span className="text-highlight font-semibold">{pathname}</span>
          <span>could not be found.</span>
        </p>
        <Link href="/" className="font-jetbrains-mono rts-14 font-bold">
          <Button variant="highlight" asChild>
            <span>메인 페이지로 돌아가기</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
