import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  selectedCategories: string[];
  selectedFinishes: string[];
  onRemoveCategory: (category: string) => void;
  onRemoveFinish: (finish: string) => void;
  onClearAll: () => void;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ActiveFilters({
  selectedCategories,
  selectedFinishes,
  onRemoveCategory,
  onRemoveFinish,
  onClearAll,
}: ActiveFiltersProps) {
  const totalFilters = selectedCategories.length + selectedFinishes.length;

  if (totalFilters === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-neutral-600">Active filters:</span>
      {selectedCategories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="flex items-center gap-1 cursor-pointer hover:bg-neutral-300"
          onClick={() => onRemoveCategory(category)}
        >
          {capitalize(category)}
          <X className="h-3 w-3" />
        </Badge>
      ))}
      {selectedFinishes.map((finish) => (
        <Badge
          key={finish}
          variant="secondary"
          className="flex items-center gap-1 cursor-pointer hover:bg-neutral-300"
          onClick={() => onRemoveFinish(finish)}
        >
          {capitalize(finish)}
          <X className="h-3 w-3" />
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-sm h-auto py-1"
      >
        Clear all
      </Button>
    </div>
  );
}
