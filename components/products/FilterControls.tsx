import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface FilterControlsProps {
  selectedCategories: string[];
  selectedFinishes: string[];
  categoryOpen: boolean;
  finishOpen: boolean;
  onCategoryOpenChange: (open: boolean) => void;
  onFinishOpenChange: (open: boolean) => void;
  onToggleCategory: (category: string) => void;
  onToggleFinish: (finish: string) => void;
  onClearAll: () => void;
  getCategoryCount: (category: string) => number;
  getFinishCount: (finish: string) => number;
  categories: string[];
  finishes: string[];
  isMobile?: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function FilterControls({
  selectedCategories,
  selectedFinishes,
  categoryOpen,
  finishOpen,
  onCategoryOpenChange,
  onFinishOpenChange,
  onToggleCategory,
  onToggleFinish,
  onClearAll,
  getCategoryCount,
  getFinishCount,
  categories,
  finishes,
  isMobile = false,
}: FilterControlsProps) {
  const totalActiveFilters =
    selectedCategories.length + selectedFinishes.length;

  return (
    <div className={isMobile ? "" : "space-y-4"}>
      <Collapsible open={categoryOpen} onOpenChange={onCategoryOpenChange}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">Category</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {categories.map((category) => {
            const count = getCategoryCount(category);
            const isDisabled =
              count === 0 && !selectedCategories.includes(category);
            return (
              <div
                key={category}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={() => !isDisabled && onToggleCategory(category)}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onToggleCategory(category)}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}${category}`}
                  className={`flex-1 cursor-pointer ${isDisabled ? "text-neutral-400 cursor-not-allowed" : ""}`}
                >
                  {capitalize(category)}
                </Label>
                <span
                  className={`text-sm ${isDisabled ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={finishOpen} onOpenChange={onFinishOpenChange}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">Finish</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              finishOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {finishes.map((finish) => {
            const count = getFinishCount(finish);
            const isDisabled =
              count === 0 && !selectedFinishes.includes(finish);
            return (
              <div
                key={finish}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={() => !isDisabled && onToggleFinish(finish)}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}${finish}`}
                  checked={selectedFinishes.includes(finish)}
                  onCheckedChange={() => onToggleFinish(finish)}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}${finish}`}
                  className={`flex-1 cursor-pointer ${isDisabled ? "text-neutral-400 cursor-not-allowed" : ""}`}
                >
                  {capitalize(finish)}
                </Label>
                <span
                  className={`text-sm ${isDisabled ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {totalActiveFilters > 0 && (
        <Button
          variant="outline"
          onClick={onClearAll}
          className="w-full mt-4"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
