import { Post } from "@/generated/graphql";

type ArticlesListDisplayProps = {
  posts: Post[];
};

export const ArticlesListDisplay = ({ posts }: ArticlesListDisplayProps) => {
  return <div>ArticlesListDisplay</div>;
};
