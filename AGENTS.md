# AGENTS.md - Timeless Touch Ceramics

## Project Overview

Next.js 16 e-commerce website for porcelain tiles and slabs. Uses Sanity CMS (with Contentful as legacy fallback via feature flag).

## Commands

```bash
# Development
bun dev              # Start dev server (localhost:3000)
bun build            # Production build
bun start            # Start production server
bun lint             # Run ESLint

# No test framework configured
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity (primary), Contentful (legacy)
- **UI Components**: Radix UI primitives with CVA
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod

## Project Structure

```
app/
├── (website)/          # Website routes (with shared layout)
│   ├── layout.tsx      # Navigation, Footer, Providers
│   ├── products/
│   ├── catalogues/
│   └── ...
├── studio/             # Sanity Studio (isolated layout)
└── layout.tsx          # Root layout (HTML, fonts, GTM)

components/
├── ui/                 # Primitive components (Button, Card, etc.)
├── products/           # Product-specific components
├── navigation/         # Navigation components
└── services/           # Service page components

lib/
├── api/
│   ├── index.ts        # Unified API (switches based on USE_SANITY)
│   ├── sanity.ts       # Sanity data fetching
│   └── products.ts     # Contentful data fetching
├── types.ts            # Shared TypeScript interfaces
└── utils.ts            # Utility functions (cn helper)

sanity/
├── schemas/            # Sanity document schemas
└── lib/                # Sanity client, queries, image helpers

design-system/
└── tokens/colors.css   # Color tokens (oklch)
```

## Code Style

### TypeScript

- Strict mode enabled
- Use interfaces for object shapes, types for unions/primitives
- Prefer explicit return types on exported functions
- Use `@/*` path alias for imports

```typescript
// Good
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

// Avoid relative paths going up multiple levels
import { Product } from "../../../lib/types"; // Bad
```

### React Components

- Use function declarations for components
- Server Components by default, add `"use client"` only when needed
- Props interface named `{ComponentName}Props`
- Destructure props in function signature

```tsx
interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product, e: React.MouseEvent) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  // ...
}
```

### Naming Conventions

- **Files**: kebab-case for routes, PascalCase for components
- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useToast.ts`)
- **Utilities**: camelCase (`formatLabel`, `cn`)
- **Types/Interfaces**: PascalCase (`Product`, `Collection`)

### CSS / Styling

- Use Tailwind CSS utility classes
- **NEVER use hex or rgb** - always use oklch via design tokens
- Use semantic color tokens: `primary-*`, `neutral-*`, `error-*`, `success-*`
- Use `cn()` helper for conditional classes

```tsx
// Good
<div className={cn("bg-primary-500 text-neutral-50", isActive && "bg-primary-600")} />

// Bad - hardcoded colors
<div className="bg-[#c4a777]" />
```

### Primitive Components

Use `class-variance-authority` (CVA) for variant-based components:

```tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Data Fetching

- Use Server Components for data fetching
- Parallel fetch with `Promise.all` when possible
- API functions in `lib/api/index.ts` (unified interface)

```tsx
// Server Component
export default async function ProductsServer() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getMainCategories(),
  ]);
  return <ProductsClient products={products} categories={categories} />;
}
```

### CMS Integration

- Feature flag: `USE_SANITY=true` in `.env.local` switches to Sanity
- Sanity Studio available at `/studio`
- GROQ queries in `sanity/lib/queries.ts`

## Environment Variables

```bash
# CMS Selection
USE_SANITY=true                          # Use Sanity (false = Contentful)

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-07
SANITY_API_WRITE_TOKEN=xxx               # For mutations

# Contentful (legacy)
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ACCESS_TOKEN=xxx
```

## Common Patterns

### Route Groups

Website routes are in `(website)/` group to share layout with Navigation/Footer.
Studio route is separate to have isolated layout.

### Error Handling

- Use try/catch in async functions
- Return empty arrays/null on error for data fetching (with console.error)
- Use `notFound()` from next/navigation for 404s

### Images

- Use `next/image` with `fill` prop and `object-cover`
- Configure remote patterns in `next.config.ts`
- Sanity images via `urlFor()` helper

## Do Not

- Use `npm` (use `bun` instead)
- Use hex/rgb colors (use oklch tokens)
- Add `overflow-hidden` with sticky positioning
- Create ambient glow decorations
- Add comments where expressive names suffice
