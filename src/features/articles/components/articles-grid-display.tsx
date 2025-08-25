import { Post } from "@/generated/graphql";

type ArticlesGridDisplayProps = {
  posts: Post[];
};

export const ArticlesGridDisplay = ({ posts }: ArticlesGridDisplayProps) => {
  return <div>ArticlesGridDisplay</div>;
};
