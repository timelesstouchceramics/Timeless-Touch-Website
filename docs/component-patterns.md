# Component Patterns & Conventions

This document outlines the component patterns and conventions used throughout the codebase.

## Component Organization

### File Structure Convention

```
components/
├── [feature]/           # Feature-specific components
│   ├── Component.tsx    # Main component
│   └── SubComponent.tsx # Supporting components
├── ui/                  # shadcn/ui primitives
└── Component.tsx        # Shared components
```

### Example: Products Feature

```
components/products/
├── FilterControls.tsx   # Filter UI logic
├── ProductCard.tsx      # Product display
├── Pagination.tsx       # Page navigation
└── ActiveFilters.tsx    # Filter badge display
```

## Naming Conventions

### Files
- PascalCase for component files: `FilterControls.tsx`
- kebab-case for data/utility files: `products-data.ts`
- camelCase for hook files: `useIsMobile.ts`

### Components
- PascalCase for component names: `ProductCard`
- Descriptive, action-oriented names: `FilterControls`, `QuickViewModal`
- Suffix with type when needed: `ProductCardSkeleton`

### Props Interfaces
- Suffix with `Props`: `FilterControlsProps`
- Define at top of file before component

```typescript
interface FilterControlsProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  isMobile?: boolean;
}
```

## Component Patterns

### 1. Presentational Components

Pure UI components that receive all data via props.

```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, e: React.MouseEvent) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <Card>
      {/* Pure presentation logic */}
    </Card>
  );
}
```

### 2. Container Components

Components that manage state and business logic.

```typescript
// products-content.tsx
export default function ProductsContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");

  // Business logic
  const filteredProducts = useMemo(() => {
    // Filtering logic
  }, [selectedCategories, sortBy]);

  return (
    <div>
      <FilterControls
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
```

### 3. Utility Functions in Components

Place helper functions outside the component when they don't need component state.

```typescript
// At module level (not inside component)
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function FilterControls() {
  // Uses capitalize inside
}
```

### 4. Conditional Rendering Patterns

```typescript
// Early return for null cases
if (!product) return null;

// Conditional sections
{similarProducts.length > 0 && (
  <div>
    <h2>Similar Products</h2>
    {/* content */}
  </div>
)}

// Ternary for alternatives
{isPending ? (
  <ProductCardSkeleton />
) : (
  <ProductCard product={product} />
)}
```

### 5. Event Handler Patterns

```typescript
// In parent component
const handleQuickView = (product: Product, e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setQuickViewProduct(product);
  setQuickViewOpen(true);
};

// Pass to child
<ProductCard onQuickView={handleQuickView} />

// In child component
<button onClick={(e) => onQuickView(product, e)}>
  Quick View
</button>
```

## State Management Patterns

### 1. URL-Synchronized State

```typescript
// Initialize from URL
const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
  const cats = searchParams.get("categories");
  return cats ? cats.split(",") : [];
});

// Sync to URL on change
useEffect(() => {
  updateURL(selectedCategories, selectedFinishes, sortBy, currentPage);
}, [selectedCategories, selectedFinishes, sortBy, currentPage, updateURL]);
```

### 2. Derived State with useMemo

```typescript
const filteredProducts = useMemo(() => {
  let filtered = products;

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category));
  }

  return filtered;
}, [selectedCategories]);

const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
}, [filteredProducts, currentPage]);
```

### 3. Stable Callbacks with useCallback

```typescript
const getCategoryCount = useCallback(
  (category: string) => {
    return products.filter((p) => {
      const matchesCategory = p.category === category;
      const matchesFinish =
        selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
      return matchesCategory && matchesFinish;
    }).length;
  },
  [selectedFinishes] // Only recompute when selectedFinishes changes
);
```

## Styling Patterns

### 1. Conditional Classes

```typescript
<div
  className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
    isDisabled
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-neutral-100 cursor-pointer"
  }`}
>
```

### 2. Responsive Patterns

```typescript
// Mobile-first with breakpoint overrides
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

// Hide/show based on screen size
<p className="hidden sm:block">Desktop only text</p>
<p className="sm:hidden">Mobile only text</p>

// Different layouts per breakpoint
<div className="w-full sm:w-auto">
```

### 3. Interactive Feedback

```typescript
// Hover states
<Card className="group">
  <Image className="transition-transform duration-300 group-hover:scale-105" />
</Card>

// Button states
<Button variant="outline" className="hover:bg-neutral-100">

// Transition animations
<ChevronDown className="transition-transform duration-200 rotate-180" />
```

## Import Organization

Standard order for imports:

```typescript
// 1. React/Next.js
import { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// 2. UI Components (shadcn)
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 3. Icons
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// 4. Custom Components
import Navigation from "@/components/Navigation";
import FilterControls from "@/components/products/FilterControls";

// 5. Data/Types/Utils
import { products } from "@/lib/products-data";
import { Product, SortOption } from "@/lib/types";
```

## Type Definitions

### Centralized Types

```typescript
// lib/types.ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  finish: string;
  price: number;
  unit: string;
  image: string;
}

export type SortOption = "name" | "name-desc" | "newest" | "price-asc" | "price-desc";
```

### Component-Local Types

```typescript
// At top of component file
interface FilterControlsProps {
  selectedCategories: string[];
  selectedFinishes: string[];
  // ... other props
}
```

## Best Practices

1. **Keep components focused** - Single responsibility
2. **Extract reusable logic** - Create custom hooks for shared behavior
3. **Memoize expensive computations** - Use useMemo/useCallback appropriately
4. **Type everything** - No implicit any types
5. **Handle loading states** - Show skeletons or spinners
6. **Handle error states** - Display user-friendly error messages
7. **Handle empty states** - Show helpful empty state UI
8. **Optimize for mobile** - Mobile-first responsive design
9. **Provide visual feedback** - Hover, focus, active states
10. **Use semantic HTML** - Proper heading hierarchy, ARIA attributes
