"use client";

import { SortOptionSelect } from "@/features/articles/components/sort-option-select";
import { useGetAllTagsQuery } from "@/generated/graphql";
import FullPageLoading from "@/shared/components/full-page-loading";
import { Badge } from "@/shared/components/ui/badge";
import OptionIcon from "@/shared/icons/option.svg";
import { useState } from "react";

export default function PostsPage() {
  const [selectedTag, setSelectedTag] = useState<string>();

  const { data: tagsData, loading: tagsLoading } = useGetAllTagsQuery({
    variables: { orderBy: "POPULAR" },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (data.getAllTags.length > 0) {
        setSelectedTag(data.getAllTags[0].tag_name);
      }
    },
  });
  const tags = tagsData?.getAllTags;

  // category posts quert

  if (tagsLoading) return <FullPageLoading />;

  return (
    <div className="flex-col-container container mx-auto">
      <h1 className="text-[25px] font-bold">Articles</h1>
      <div className="flex items-center overflow-x-scroll gap-2.5 mt-4">
        {tags?.map((tag) => (
          <Badge
            key={tag.tag_name}
            variant={selectedTag === tag.tag_name ? "highlight" : "outline"}
            className="cursor-pointer px-4 py-2 rounded-2xl"
            onClick={() => setSelectedTag(tag.tag_name)}
          >
            {tag.tag_name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center mt-10">
        <div className="flex items-center gap-1">
          <OptionIcon className="size-9 text-muted-foreground border-input border-1 rounded-md p-1.5" />
          <SortOptionSelect />
          <span className="text-muted-foreground font-semibold text-sm">
            Sort by
          </span>
        </div>
      </div>
    </div>
  );
}
