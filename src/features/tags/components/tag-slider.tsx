"use client";

import { useGetAllTagsQuery } from "@/generated/graphql";
import { Loader } from "@/shared/components/loader";

export const TagSlider = () => {
  const { data, loading } = useGetAllTagsQuery({
    variables: { orderBy: "POPULAR" },
  });

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">추천 카테고리</h2>

      <div className="flex items-center gap-2">
        {data?.getAllTags.map((tag) => (
          <div key={tag.id}>{tag.tag_name}</div>
        ))}
      </div>
    </div>
  );
};
