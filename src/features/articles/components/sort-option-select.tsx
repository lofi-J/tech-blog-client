import { PostsOrderBy } from "@/generated/graphql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { POSTS_ORDER_BY_OPTIONS } from "@/shared/config/filter-config";
import { cn } from "@/shared/lib/utils";

export const SortOptionSelect = ({
  selectedSortOption,
  setSelectedSortOption,
  className,
}: {
  selectedSortOption: PostsOrderBy;
  setSelectedSortOption: (sortOption: PostsOrderBy) => void;
  className?: string;
}) => {
  return (
    <Select value={selectedSortOption} onValueChange={setSelectedSortOption}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Select a tag" />
      </SelectTrigger>
      <SelectContent>
        {POSTS_ORDER_BY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
