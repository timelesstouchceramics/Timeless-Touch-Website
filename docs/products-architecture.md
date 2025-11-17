# Products Page Architecture

This document describes the architecture and patterns used in the products listing and filtering system.

## Overview

The products page implements a modular, component-based architecture with URL state synchronization, enabling shareable filter states and improved SEO through slug-based routing.

## Directory Structure

```
app/products/
├── page.tsx                    # Route entry (Suspense wrapper)
├── products-content.tsx        # Main content component
└── [slug]/
    └── page.tsx                # Product detail page

components/products/
├── FilterControls.tsx          # Collapsible filter UI
├── ProductCard.tsx             # Product grid item
├── Pagination.tsx              # Page navigation
└── ActiveFilters.tsx           # Removable filter badges

components/
├── Breadcrumb.tsx              # Navigation breadcrumb
├── ProductCardSkeleton.tsx     # Loading skeleton
└── QuickViewModal.tsx          # Product preview dialog

lib/
├── products-data.ts            # Product data and constants
└── types.ts                    # TypeScript interfaces
```

## Core Patterns

### 1. URL State Synchronization

All filter, sort, and pagination states are synced to URL parameters for shareable links.

```typescript
// URL format: /products?categories=marble,granite&finishes=polished&sort=price-asc&page=2

const updateURL = useCallback(
  (cats: string[], fins: string[], sort: string, page: number) => {
    const params = new URLSearchParams();
    if (cats.length > 0) params.set("categories", cats.join(","));
    if (fins.length > 0) params.set("finishes", fins.join(","));
    if (sort !== "name") params.set("sort", sort);
    if (page > 1) params.set("page", page.toString());

    const newURL = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newURL, { scroll: false });
  },
  [pathname, router]
);
```

### 2. Dynamic Filter Counts

Filters show the count of available products, updating based on other selected filters.

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
  [selectedFinishes]
);
```

### 3. SEO-Friendly Slugs

Products use human-readable slugs instead of numeric IDs.

```typescript
// Product type
interface Product {
  id: number;           // Internal ID
  slug: string;         // URL slug (e.g., "carrara-white-marble")
  name: string;
  category: string;
  finish: string;
  price: number;
  unit: string;
  images: string[];     // Multiple product images for gallery
}

// Route: /products/[slug]
const product = products.find((p) => p.slug === slug);

// Access first image for thumbnails
<Image src={product.images[0]} ... />
```

### 4. Collapsible Filter Sections

Filters use Radix UI Collapsible with smooth animations.

```typescript
<Collapsible open={categoryOpen} onOpenChange={onCategoryOpenChange}>
  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 rounded-md transition-colors hover:bg-neutral-100">
    <h4 className="text-base font-semibold">Category</h4>
    <ChevronDown className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* Filter options */}
  </CollapsibleContent>
</Collapsible>
```

### 5. Loading States with Transitions

Uses React's `useTransition` for non-blocking UI updates.

```typescript
const [isPending, startTransition] = useTransition();

const goToPage = (page: number) => {
  startTransition(() => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// Show skeleton during pending
{isPending ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
) : (
  // Actual content
)}
```

### 6. Mobile-First Responsive Design

Desktop uses sidebar filters; mobile uses sheet/drawer.

```typescript
// Mobile filter button with badge
<Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
  <SheetTrigger asChild>
    <Button variant="outline" className="lg:hidden relative">
      <SlidersHorizontal className="h-4 w-4 mr-2" />
      Filters
      {totalActiveFilters > 0 && (
        <Badge className="absolute -top-2 -right-2">
          {totalActiveFilters}
        </Badge>
      )}
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <FilterControls isMobile />
  </SheetContent>
</Sheet>
```

## Component Responsibilities

### ProductsContent (Main Orchestrator)
- State management for filters, sort, pagination
- URL synchronization
- Product filtering and sorting logic
- Layout orchestration

### FilterControls (Pure UI)
- Renders filter checkboxes
- Handles collapsible state
- Shows dynamic counts
- Disables unavailable options

### ProductCard (Presentation)
- Displays product information
- Quick view button overlay
- Mobile action buttons
- Hover effects

### Pagination (Navigation)
- Previous/Next controls
- Page number buttons
- Current page indicator

### QuickViewModal (Preview)
- Full product preview in dialog
- Links to detail page
- Request quote action

## Data Flow

```
User Action → State Update → URL Sync → Filtered Products → Paginated Products → UI Render
     ↑                                                                                  |
     └──────────────────────────────────────────────────────────────────────────────────┘
```

## Sorting Options

| Value | Label | Logic |
|-------|-------|-------|
| `name` | Name (A-Z) | `a.name.localeCompare(b.name)` |
| `name-desc` | Name (Z-A) | `b.name.localeCompare(a.name)` |
| `newest` | Newest | `b.id - a.id` |
| `price-asc` | Price: Low to High | `a.price - b.price` |
| `price-desc` | Price: High to Low | `b.price - a.price` |

## Filter Behavior

1. **Multi-select**: Users can select multiple categories and finishes
2. **Dynamic counts**: Show how many products match each filter option
3. **Disabled states**: Options with 0 results are disabled (unless already selected)
4. **Auto-reset pagination**: Page resets to 1 when filters change
5. **Hover feedback**: Interactive elements have visual feedback

## Performance Optimizations

- `useMemo` for filtered and paginated products
- `useCallback` for stable function references
- Client-side filtering (no server roundtrips)
- Skeleton loading states during transitions
- Sticky filter sidebar on desktop

## Accessibility Features

- Proper heading hierarchy (h1 → h2 → h4)
- Label associations with checkboxes
- Keyboard navigation support
- ARIA states via Radix UI primitives
- Focus management in modals

## Product Detail Page

### Image Gallery Carousel

The product detail page uses Embla Carousel (via shadcn/ui) for image navigation:

```typescript
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// State for carousel API and current index
const [api, setApi] = useState<CarouselApi>();
const [currentImageIndex, setCurrentImageIndex] = useState(0);

// Sync carousel with thumbnail selection
useEffect(() => {
  if (!api) return;
  api.on("select", () => {
    setCurrentImageIndex(api.selectedScrollSnap());
  });
}, [api]);

// Carousel with thumbnails
<Carousel setApi={setApi} opts={{ loop: true }}>
  <CarouselContent>
    {product.images.map((image, index) => (
      <CarouselItem key={index}>
        <Image src={image} ... />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Clickable thumbnails
<div className="grid grid-cols-4 gap-2">
  {product.images.map((image, index) => (
    <button
      onClick={() => api?.scrollTo(index)}
      className={currentImageIndex === index ? "ring-2" : "opacity-70"}
    >
      <Image src={image} ... />
    </button>
  ))}
</div>
```

### Features
- Loop navigation
- Previous/Next buttons
- Clickable thumbnail strip
- Active thumbnail indicator
- Synced state between carousel and thumbnails

## Future Enhancements

1. Server-side filtering for large catalogs
2. Search functionality
3. Price range slider
4. Save filter presets
5. Product comparison
6. Infinite scroll option
7. Grid/list view toggle
8. Recently viewed products
9. Image zoom on hover/click
10. Wishlist functionality
