# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun install          # Install dependencies (NEVER use npm)
bun dev              # Start development server
bun run build        # Production build
bun start            # Start production server
bun run lint         # Run ESLint
```

## Architecture

- **Framework**: Next.js 16.0.3 with App Router, React 19.2.0, TypeScript
- **UI Library**: shadcn/ui components (Radix UI primitives)
- **Styling**: Tailwind CSS 4.0.0 with custom design tokens
- **Path Alias**: `@/*` maps to project root

### Directory Structure

- `/app` - Next.js App Router (pages, layouts, route handlers)
- `/components` - React components; `/components/ui` contains shadcn components
- `/design-system` - Design tokens and component utilities
  - `/tokens` - Color, typography, shadow definitions
  - `/components` - Layout utilities (container, section)
- `/hooks` - Custom React hooks (useIsMobile, useToast)
- `/lib` - Utilities (cn function for class merging), data, and shared types
  - `/lib/types.ts` - Shared TypeScript interfaces (Product, SortOption)
  - `/lib/products-data.ts` - Product catalog data and constants
- `/docs` - Project documentation
  - `products-architecture.md` - Products page patterns and data flow
  - `component-patterns.md` - Component conventions and best practices

## Design System Rules

### Colors - OKLCH Only
**NEVER use hex or rgb. Always use OKLCH color space.**

```css
/* Correct */
color: oklch(0.769 0.188 70.08);
background: oklch(0.985 0.001 106.42);

/* Wrong - Never do this */
color: #d4a574;
background: rgb(255, 255, 255);
```

Primary palette: `--color-primary-50` through `--color-primary-950` (gold tones)
Neutral palette: `--color-neutral-50` through `--color-neutral-950` (stone tones)

### Typography Classes

Pre-defined classes in `/design-system/tokens/typography.css`:
- `.title-hero` - Main hero headings
- `.title-section` - Section titles
- `.title-subsection` - Subsection headers
- `.text-body` - Body text
- `.text-body-large` - Large body text

Font families: Inter (primary), Krub (secondary), Inria Serif (serif)

### Layout Utilities

- `.container` - Responsive container with max-width
- `.section` - Section padding (uses `--spacing-section-*` tokens)

## Component Patterns

- Pages should be componentized - avoid long page files
- Mark client components with `"use client"` directive
- Use shadcn/ui components from `/components/ui`
- Global providers wrap app: `ThemeProvider`, `TooltipProvider`, React Query
- Feature-specific components go in `/components/[feature]/` (e.g., `/components/products/`)
- Shared types belong in `/lib/types.ts`
- Data constants belong in `/lib/[feature]-data.ts`

### State Management Patterns

- URL state sync for shareable links (filters, pagination, sort)
- `useMemo` for derived/filtered data
- `useCallback` for stable function references passed to children
- `useTransition` for non-blocking UI updates with loading states

### Component Conventions

```typescript
// Props interface at top of file
interface ComponentProps {
  data: DataType;
  onAction: (item: DataType) => void;
  isOptional?: boolean;
}

// Helper functions outside component (no state dependency)
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Component export
export default function Component({ data, onAction }: ComponentProps) {
  // Hooks
  // State
  // Derived values (useMemo)
  // Handlers (useCallback)
  // Effects
  // Return JSX
}
```

### SEO & Routing

- Use slugs for URLs instead of numeric IDs: `/products/[slug]`
- Generate SEO-friendly slugs: `carrara-white-marble`
- Handle 404s with `notFound()` from next/navigation

## Styling Conventions

- Use Tailwind utilities with design system tokens
- Avoid `overflow-hidden` with sticky positioning (breaks sticky behavior)
- Never add ambient glow for decoration
- Use CVA (class-variance-authority) for component variants
- Mobile-first responsive design with breakpoint overrides
- Consistent hover/focus states for interactive elements

### Interactive Element Patterns

```typescript
// Hover feedback
<div className="transition-colors hover:bg-neutral-100 cursor-pointer">

// Disabled states
<button className={isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}>

// Group hover effects
<Card className="group">
  <Image className="transition-transform duration-300 group-hover:scale-105" />
</Card>
```

## Documentation

Create `/docs` directory if it doesn't exist and save all the documentations there.
Design system documentation: `/design-system/README.md`

### Available Documentation

- `/docs/products-architecture.md` - Products page filtering, sorting, pagination patterns
- `/docs/component-patterns.md` - Component organization and coding conventions
- `/design-system/README.md` - Design tokens and styling guidelines

## Data Patterns

### Product Data Structure

```typescript
// lib/types.ts
interface Product {
  id: number;           // Internal identifier
  slug: string;         // URL-friendly slug
  name: string;         // Display name
  category: string;     // Product category
  finish: string;       // Surface finish type
  price: number;        // Price in AED
  unit: string;         // Price unit (sqft, piece, etc.)
  image: string;        // Image path
}

// lib/products-data.ts
export const products: Product[] = [...];
export const categories = ["marble", "granite", "ceramic", "porcelain"];
export const finishes = ["polished", "honed", "matte", "leather", "textured"];
```

### URL State Pattern

```typescript
// Sync state to URL for shareable links
const updateURL = useCallback((cats, fins, sort, page) => {
  const params = new URLSearchParams();
  if (cats.length > 0) params.set("categories", cats.join(","));
  if (fins.length > 0) params.set("finishes", fins.join(","));
  if (sort !== "name") params.set("sort", sort);
  if (page > 1) params.set("page", page.toString());

  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
}, [pathname, router]);
```
