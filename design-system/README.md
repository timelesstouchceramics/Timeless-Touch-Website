# Design System

A minimal design system built on Tailwind CSS with custom tokens.

## Structure

```
tokens/
├── colors.css      # Color tokens
├── typography.css  # Font tokens
└── shadows.css     # Shadow tokens

components/
└── layout.css      # Layout & typography utilities
```

## Tokens

All tokens are defined in `@theme` and generate Tailwind utilities used by shadcn/ui components.

### Colors

- `primary-*` (50-950)
- `neutral-*` (50-950)
- `success-*`, `warning-*`, `error-*`

### Shadows

- `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

## Usage

Use [shadcn/ui](https://ui.shadcn.com) components for interactive elements. They use CVA for variants and integrate with the design tokens.

For layout and typography, use the component classes:

```tsx
<section className="section">
  <div className="container">
    <h1 className="title-hero">Hero Title</h1>
    <p className="text-body">Body text</p>
  </div>
</section>
```

**Containers**: Use `.container` (responsive) or with size modifiers (`.container-sm`, `.container-md`, `.container-lg`)

**Sections**: Use `.section` with size modifiers (`.section-sm`, `.section-lg`) for vertical spacing

## Rebranding

Update color tokens in `tokens/colors.css`:

```css
--color-primary-500: var(--color-teal-500); /* was blue-500 */
```
