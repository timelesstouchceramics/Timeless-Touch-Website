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
  selectedMainCategories: string[];
  selectedDesignStyles: string[];
  selectedFinishes: string[];
  selectedApplications: string[];
  selectedSizes: string[];
  selectedThicknesses: string[];
  selectedSpecialFeatures: string[];
  mainCategoryOpen: boolean;
  designStyleOpen: boolean;
  finishOpen: boolean;
  applicationsOpen: boolean;
  sizesOpen: boolean;
  thicknessesOpen: boolean;
  specialFeaturesOpen: boolean;
  onMainCategoryOpenChange: (open: boolean) => void;
  onDesignStyleOpenChange: (open: boolean) => void;
  onFinishOpenChange: (open: boolean) => void;
  onApplicationsOpenChange: (open: boolean) => void;
  onSizesOpenChange: (open: boolean) => void;
  onThicknessesOpenChange: (open: boolean) => void;
  onSpecialFeaturesOpenChange: (open: boolean) => void;
  onToggleMainCategory: (mainCategory: string) => void;
  onToggleDesignStyle: (designStyle: string) => void;
  onToggleFinish: (finish: string) => void;
  onToggleApplication: (application: string) => void;
  onToggleSize: (size: string) => void;
  onToggleThickness: (thickness: string) => void;
  onToggleSpecialFeature: (feature: string) => void;
  onClearAll: () => void;
  getMainCategoryCount: (mainCategory: string) => number;
  getDesignStyleCount: (designStyle: string) => number;
  getFinishCount: (finish: string) => number;
  getApplicationCount: (application: string) => number;
  getSizeCount: (size: string) => number;
  getThicknessCount: (thickness: string) => number;
  getSpecialFeatureCount: (feature: string) => number;
  mainCategories: string[];
  designStyles: string[];
  finishes: string[];
  applications: string[];
  sizes: string[];
  thicknesses: string[];
  specialFeatures: string[];
  isMobile?: boolean;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Format category/style names for display
const formatLabel = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function FilterControls({
  selectedMainCategories,
  selectedDesignStyles,
  selectedFinishes,
  selectedApplications,
  selectedSizes,
  selectedThicknesses,
  selectedSpecialFeatures,
  mainCategoryOpen,
  designStyleOpen,
  finishOpen,
  applicationsOpen,
  sizesOpen,
  thicknessesOpen,
  specialFeaturesOpen,
  onMainCategoryOpenChange,
  onDesignStyleOpenChange,
  onFinishOpenChange,
  onApplicationsOpenChange,
  onSizesOpenChange,
  onThicknessesOpenChange,
  onSpecialFeaturesOpenChange,
  onToggleMainCategory,
  onToggleDesignStyle,
  onToggleFinish,
  onToggleApplication,
  onToggleSize,
  onToggleThickness,
  onToggleSpecialFeature,
  onClearAll,
  getMainCategoryCount,
  getDesignStyleCount,
  getFinishCount,
  getApplicationCount,
  getSizeCount,
  getThicknessCount,
  getSpecialFeatureCount,
  mainCategories,
  designStyles,
  finishes,
  applications,
  sizes,
  thicknesses,
  specialFeatures,
  isMobile = false,
}: FilterControlsProps) {
  const totalActiveFilters =
    selectedMainCategories.length +
    selectedDesignStyles.length +
    selectedFinishes.length +
    selectedApplications.length +
    selectedSizes.length +
    selectedThicknesses.length +
    selectedSpecialFeatures.length;

  return (
    <div className={isMobile ? "" : "space-y-4"}>
      {/* Main Category Filter */}
      <Collapsible
        open={mainCategoryOpen}
        onOpenChange={onMainCategoryOpenChange}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">
            Product Type
          </h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              mainCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {mainCategories.map((mainCategory) => {
            const count = getMainCategoryCount(mainCategory);
            const isDisabled =
              count === 0 && !selectedMainCategories.includes(mainCategory);
            return (
              <div
                key={mainCategory}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleMainCategory(mainCategory);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}main-${mainCategory}`}
                  checked={selectedMainCategories.includes(mainCategory)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleMainCategory(mainCategory);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}main-${mainCategory}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {formatLabel(mainCategory)}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Design Style Filter */}
      <Collapsible
        open={designStyleOpen}
        onOpenChange={onDesignStyleOpenChange}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">
            Design Style
          </h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              designStyleOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {designStyles.map((designStyle) => {
            const count = getDesignStyleCount(designStyle);
            const isDisabled =
              count === 0 && !selectedDesignStyles.includes(designStyle);
            return (
              <div
                key={designStyle}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleDesignStyle(designStyle);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}style-${designStyle}`}
                  checked={selectedDesignStyles.includes(designStyle)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleDesignStyle(designStyle);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}style-${designStyle}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {formatLabel(designStyle)}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Finish Filter */}
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
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleFinish(finish);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}${finish}`}
                  checked={selectedFinishes.includes(finish)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleFinish(finish);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}${finish}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {capitalize(finish)}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Applications Filter */}
      <Collapsible
        open={applicationsOpen}
        onOpenChange={onApplicationsOpenChange}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">
            Applications
          </h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              applicationsOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {applications.map((application) => {
            const count = getApplicationCount(application);
            const isDisabled =
              count === 0 && !selectedApplications.includes(application);
            return (
              <div
                key={application}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleApplication(application);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}app-${application}`}
                  checked={selectedApplications.includes(application)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleApplication(application);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}app-${application}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {application}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Size Filter */}
      <Collapsible open={sizesOpen} onOpenChange={onSizesOpenChange}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">Size</h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              sizesOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {sizes.map((size) => {
            const count = getSizeCount(size);
            const isDisabled = count === 0 && !selectedSizes.includes(size);
            return (
              <div
                key={size}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleSize(size);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleSize(size);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}size-${size}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {size}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Thickness Filter */}
      <Collapsible
        open={thicknessesOpen}
        onOpenChange={onThicknessesOpenChange}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">
            Thickness
          </h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              thicknessesOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {thicknesses.map((thickness) => {
            const count = getThicknessCount(thickness);
            const isDisabled =
              count === 0 && !selectedThicknesses.includes(thickness);
            return (
              <div
                key={thickness}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleThickness(thickness);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}thickness-${thickness}`}
                  checked={selectedThicknesses.includes(thickness)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleThickness(thickness);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}thickness-${thickness}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {thickness}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Special Features Filter */}
      <Collapsible
        open={specialFeaturesOpen}
        onOpenChange={onSpecialFeaturesOpenChange}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
          <h4 className="text-base font-semibold text-neutral-950">
            Special Features
          </h4>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              specialFeaturesOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {specialFeatures.map((feature) => {
            const count = getSpecialFeatureCount(feature);
            const isDisabled =
              count === 0 && !selectedSpecialFeatures.includes(feature);
            return (
              <div
                key={feature}
                className={`flex items-center gap-2 p-2 -mx-2 rounded-md transition-colors ${
                  isDisabled
                    ? "opacity-50"
                    : "hover:bg-neutral-100 cursor-pointer"
                }`}
                onClick={(e) => {
                  if (
                    e.target === e.currentTarget ||
                    (e.target as HTMLElement).tagName === "SPAN"
                  ) {
                    !isDisabled && onToggleSpecialFeature(feature);
                  }
                }}
              >
                <Checkbox
                  id={`${isMobile ? "mobile-" : ""}feature-${feature}`}
                  checked={selectedSpecialFeatures.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (!isDisabled) {
                      onToggleSpecialFeature(feature);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${isMobile ? "mobile-" : ""}feature-${feature}`}
                  className={`flex-1 cursor-pointer ${
                    isDisabled ? "text-neutral-400 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {formatLabel(feature)}
                </Label>
                <span
                  className={`text-sm ${
                    isDisabled ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {totalActiveFilters > 0 && (
        <Button variant="outline" onClick={onClearAll} className="w-full mt-4">
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
