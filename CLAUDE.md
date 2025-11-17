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
- `/lib` - Utilities (cn function for class merging)

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

## Styling Conventions

- Use Tailwind utilities with design system tokens
- Avoid `overflow-hidden` with sticky positioning (breaks sticky behavior)
- Never add ambient glow for decoration
- Use CVA (class-variance-authority) for component variants

## Documentation

Create `/docs` directory if it doesn't exist and save all the documentations there. 
Design system documentation: `/design-system/README.md`
