import { PostsOrderBy } from "@/generated/graphql";

export const POSTS_ORDER_BY_OPTIONS: { label: string; value: PostsOrderBy }[] =
  [
    {
      label: "Latest",
      value: "LATEST",
    },
    {
      label: "Views",
      value: "POPULAR_VIEWS",
    },
    {
      label: "Title",
      value: "TITLE",
    },
  ];
