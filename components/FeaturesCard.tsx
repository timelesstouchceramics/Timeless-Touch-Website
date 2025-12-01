import { LucideIcon } from "lucide-react";

interface FeaturesCardProps {
  icon?: LucideIcon;
  number?: string;
  title: string;
  description: string;
  className?: string;
  variant?: "horizontal" | "vertical";
}

export default function FeaturesCard({
  icon: Icon,
  number,
  title,
  description,
  className = "",
  variant = "horizontal",
}: FeaturesCardProps) {
  const isVertical = variant === "vertical";

  return (
    <div
      className={`bg-white h-full p-6 lg:p-8 rounded-md shadow-xs hover:shadow-sm transition-shadow flex flex-col ${className}`}
    >
      <div
        className={
          isVertical
            ? "flex flex-col flex-grow"
            : "flex items-start gap-4 flex-grow"
        }
      >
        <div className={isVertical ? "mb-4" : "flex-shrink-0"}>
          {number ? (
            <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
              {number}
            </div>
          ) : Icon ? (
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary-600" />
            </div>
          ) : null}
        </div>
        <div className={isVertical ? "flex flex-col flex-grow" : "flex-grow"}>
          <h3
            className={`text-xl font-semibold text-neutral-950 ${
              isVertical ? "mb-3" : "mb-2"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-neutral-600 flex-grow whitespace-pre-line ${
              isVertical ? "text-body text-sm" : "text-body font-light text-sm"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
