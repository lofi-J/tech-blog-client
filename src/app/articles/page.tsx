"use client";

import { ArticlesGridDisplay } from "@/features/articles/components/articles-grid-display";
import { ArticlesListDisplay } from "@/features/articles/components/articles-list-display";
import { ArticlesTableDisplay } from "@/features/articles/components/articles-table-display";
import { SelectorArticlesStyle } from "@/features/articles/components/selector-articles-style";
import { SortOptionSelect } from "@/features/articles/components/sort-option-select";
import {
  PostsOrderBy,
  useGetAllCategoriesQuery,
  useGetPostsByCategoryQuery,
} from "@/generated/graphql";
import FullPageLoading from "@/shared/components/full-page-loading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const POSTS_PER_PAGE = 10;

export type ArticleDisplayStyle = "table" | "grid" | "list";

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [page, setPage] = useState(1);
  const [selectedSortOption, setSelectedSortOption] =
    useState<PostsOrderBy>("LATEST");
  const [displayStyle, setDisplayStyle] =
    useState<ArticleDisplayStyle>("table");

  const { data: categoriesData, loading: categoriesLoading } =
    useGetAllCategoriesQuery({
      variables: { orderBy: "POPULAR" },
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        if (data.getAllCategories.length > 0) {
          setSelectedCategory(data.getAllCategories[0].category_name);
        }
      },
    });
  const categories = categoriesData?.getAllCategories;

  // category posts query
  const { data: categoryPostsData, loading: categoryPostsLoading } =
    useGetPostsByCategoryQuery({
      variables: {
        input: {
          categoryName: selectedCategory ?? "",
          limit: POSTS_PER_PAGE,
          offset: (page - 1) * POSTS_PER_PAGE,
          orderBy: selectedSortOption,
        },
      },
      fetchPolicy: "cache-and-network",
      skip: !selectedCategory,
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
              selectedCategory === category.category_name
                ? "highlight"
                : "outline"
            }
            className="cursor-pointer px-4 py-2 rounded-2xl"
            onClick={() => setSelectedCategory(category.category_name)}
          >
            {category.category_name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center mt-10 justify-between">
        <div className="flex items-center gap-1">
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
          <SelectorArticlesStyle
            selectedDisplayStyle={displayStyle}
            setSelectedDisplayStyle={setDisplayStyle}
            className="mr-4"
          />
          <div className="items-center gap-3 hidden md:flex">
            <div className="text-muted-foreground text-sm font-semibold">
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
      </div>

      <div className="mt-5">
        {displayStyle === "table" && posts && (
          <ArticlesTableDisplay posts={posts} loading={categoryPostsLoading} />
        )}
        {displayStyle === "grid" && posts && (
          <ArticlesGridDisplay posts={posts} loading={categoryPostsLoading} />
        )}
        {displayStyle === "list" && posts && (
          <ArticlesListDisplay posts={posts} loading={categoryPostsLoading} />
        )}
      </div>

      {/* mobile pagination */}
      <div className="items-center gap-3 flex md:hidden mt-3 mx-auto">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div className="text-muted-foreground text-sm font-semibold">
          {page}
        </div>
        <Button
          variant="secondary"
          size="icon"
          disabled={page === Math.ceil(totalPosts / POSTS_PER_PAGE)}
          onClick={() =>
            setPage(Math.min(page + 1, Math.ceil(totalPosts / POSTS_PER_PAGE)))
          }
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
