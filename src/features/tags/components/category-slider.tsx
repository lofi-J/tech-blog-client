"use client";

import { useGetAllTagsQuery } from "@/generated/graphql";
import { Loader } from "@/shared/components/loader";
import { SkillIcon, SkillName } from "@/shared/icons/skill-icon";
import { cn } from "@/shared/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRef } from "react";
import Slider, { Settings } from "react-slick";

export const CategorySlider = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory?: string;
  setSelectedCategory: (category: string) => void;
}) => {
  const sliderRef = useRef<Slider>(null);

  const { data, loading } = useGetAllTagsQuery({
    variables: { orderBy: "POPULAR" },
    onCompleted: (data) => {
      setSelectedCategory(data.getAllTags[0].tag_name);
    },
    fetchPolicy: "cache-and-network",
  });

  const customArrowHandler = {
    next: sliderRef.current?.slickNext,
    prev: sliderRef.current?.slickPrev,
  };

  const settings: Settings = {
    speed: 200,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    nextArrow: <CustomSlider direction="right" handler={customArrowHandler} />,
    prevArrow: <CustomSlider direction="left" handler={customArrowHandler} />,
  };

  if (loading) return <Loader size="lg" />;

  return (
    <div className="w-full relative">
      <div className="container mx-auto">
        <Slider {...settings} ref={sliderRef}>
          {data?.getAllTags.map((tag) => (
            <TagItem
              key={tag.id}
              tagName={tag.tag_name}
              setSelectedTag={setSelectedCategory}
              isSelected={selectedCategory === tag.tag_name}
            />
          ))}
        </Slider>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
};

const TagItem = ({
  tagName,
  isSelected,
  setSelectedTag,
}: {
  tagName: string;
  isSelected: boolean;
  setSelectedTag: (tagName: string) => void;
}) => {
  return (
    <div className="flex justify-center px-2">
      <button
        onClick={() => setSelectedTag(tagName)}
        className={cn(
          "flex flex-col items-center justify-center w-30 h-20 bg-muted rounded-md hover:bg-muted/50 transition-colors",
          isSelected && "shadow-inset-highlight"
        )}
      >
        <SkillIcon
          name={tagName as SkillName}
          className="size-15 text-[14px]"
        />
      </button>
    </div>
  );
};

const CustomSlider = ({
  direction,
  handler,
}: {
  direction: "left" | "right";
  handler: {
    next: (() => void) | undefined;
    prev: (() => void) | undefined;
  };
}) => {
  const handleClick = () => {
    if (direction === "left") {
      handler.prev?.();
    } else {
      handler.next?.();
    }
  };

  return (
    <button
      className={cn(
        "size-8 bg-muted/50 rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20",
        direction === "left" && "-left-6",
        direction === "right" && "-right-6",
        "hover:shadow-highlight transition-all duration-300"
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick();
      }}
    >
      {direction === "left" ? (
        <ArrowLeftIcon className="size-4" />
      ) : (
        <ArrowRightIcon className="size-4" />
      )}
    </button>
  );
};
