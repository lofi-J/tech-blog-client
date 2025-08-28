"use client";

import { Post } from "@/generated/graphql";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type ArticlesTableDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesTableDisplay = ({
  posts,
  loading,
}: ArticlesTableDisplayProps) => {
  const router = useRouter();

  const formattedDate = (date?: string) => {
    if (!date) return "-";
    return format(new Date(date), "yyyy.MM.dd");
  };

  if (loading) {
    return (
      <div className="w-full border border-input rounded-md">
        <Skeleton className="w-full h-18" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border border-input rounded-md overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed border-collapse">
          <thead>
            <tr>
              <Th width="5%" minWidth="40px" isFirst>
                No
              </Th>
              <Th width="25%" minWidth="200px">
                Title
              </Th>
              <Th width="50%" minWidth="250px">
                Preview
              </Th>
              <Th width="10%" minWidth="120px">
                Published
              </Th>
              <Th width="10%" minWidth="120px" isLast>
                Last update
              </Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post.id}
                className="h-9 cursor-pointer hover:bg-muted"
                onClick={() => router.push(`/articles/${post.slug}`)}
              >
                <Td width="5%" minWidth="40px" isFirst>
                  {index + 1}
                </Td>
                <Td width="15%" minWidth="150px" align="center">
                  {post.title}
                </Td>
                <Td width="50%" minWidth="250px" align="left">
                  {post.description}
                </Td>
                <Td width="15%" minWidth="120px">
                  {formattedDate(post.published)}
                </Td>
                <Td width="15%" minWidth="120px" isLast>
                  {formattedDate(post.updated_at)}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Th = ({
  children,
  width,
  minWidth,
  className,
  isFirst,
}: PropsWithChildren<{
  className?: string;
  width?: string;
  minWidth?: string;
  isFirst?: boolean;
  isLast?: boolean;
}>) => {
  const style = {
    width: width,
    minWidth: minWidth,
  };

  return (
    <th
      className={cn(
        "h-9 px-2 border-b border-input",
        !isFirst && "border-l border-input",
        className
      )}
      style={style}
    >
      <div className="rts-14 font-semibold text-nowrap text-center overflow-hidden">
        {children}
      </div>
    </th>
  );
};

const Td = ({
  children,
  className,
  width,
  minWidth,
  align = "center",
  isFirst,
}: PropsWithChildren<{
  className?: string;
  width?: string;
  minWidth?: string;
  align?: "left" | "center" | "right";
  isFirst?: boolean;
  isLast?: boolean;
}>) => {
  const style = {
    width: width,
    minWidth: minWidth,
  };

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <td
      className={cn(
        "px-2 py-1 border-b border-input",
        !isFirst && "border-l border-input",
        className
      )}
      style={style}
    >
      <div className={cn("truncate rts-13", alignClass)}>{children}</div>
    </td>
  );
};
