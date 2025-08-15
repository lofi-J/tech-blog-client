"use client";

import { useGetAllTagsQuery } from "@/generated/graphql";

export const TagsSidebar = () => {
  const { data, loading } = useGetAllTagsQuery({
    variables: { orderBy: "POPULAR" },
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {data?.getAllTags.map((tag) => (
        <div key={tag.id}>{tag.tag_name}</div>
      ))}
    </div>
  );
};
