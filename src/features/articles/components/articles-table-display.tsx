import { Post } from "@/generated/graphql";

type ArticlesTableDisplayProps = {
  posts: Post[];
};

export const ArticlesTableDisplay = ({ posts }: ArticlesTableDisplayProps) => {
  return <div>ArticlesTableDisplay</div>;
};
