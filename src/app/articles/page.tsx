"use client";

import { SortOptionSelect } from "@/features/articles/components/sort-option-select";
import {
  PostsOrderBy,
  useGetAllCategoriesQuery,
  useGetPostsByCategoryQuery,
} from "@/generated/graphql";
import FullPageLoading from "@/shared/components/full-page-loading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import OptionIcon from "@/shared/icons/option.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const [selectedTag, setSelectedTag] = useState<string>();
  const [page, setPage] = useState(1);
  const [selectedSortOption, setSelectedSortOption] =
    useState<PostsOrderBy>("LATEST");

  const { data: categoriesData, loading: categoriesLoading } =
    useGetAllCategoriesQuery({
      variables: { orderBy: "POPULAR" },
      fetchPolicy: "cache-and-network",
    });
  const categories = categoriesData?.getAllCategories;

  // category posts query
  const { data: categoryPostsData, loading: categoryPostsLoading } =
    useGetPostsByCategoryQuery({
      variables: {
        input: {
          categoryName: selectedTag ?? "",
          limit: POSTS_PER_PAGE,
          offset: 0,
          orderBy: selectedSortOption,
        },
      },
      fetchPolicy: "cache-and-network",
    });
  const totalPosts = categoryPostsData?.getPostsByCategory.totalCount ?? 0;
  const posts = categoryPostsData?.getPostsByCategory.posts;

  if (categoriesLoading) return <FullPageLoading />;

  return (
    <div className="flex-col-container container mx-auto">
      <h1 className="text-[25px] font-bold">Articles</h1>
      <div className="flex items-center overflow-x-scroll gap-2.5 mt-4">
        {categories?.map((category) => (
          <Badge
            key={category.id}
            variant={
              selectedTag === category.category_name ? "highlight" : "outline"
            }
            className="cursor-pointer px-4 py-2 rounded-2xl"
            onClick={() => setSelectedTag(category.category_name)}
          >
            {category.category_name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center mt-10 justify-between">
        <div className="flex items-center gap-1">
          <OptionIcon className="size-9 text-muted-foreground border-input border-1 rounded-md p-1.5" />
          <SortOptionSelect
            className="w-[120px]"
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
          <span className="text-muted-foreground text-sm px-2">
            {totalPosts} articles
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground text-sm">
            {page} of {Math.ceil(totalPosts / POSTS_PER_PAGE)}
          </div>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            disabled={page === Math.ceil(totalPosts / POSTS_PER_PAGE)}
            onClick={() =>
              setPage(
                Math.min(page + 1, Math.ceil(totalPosts / POSTS_PER_PAGE))
              )
            }
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        {posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
