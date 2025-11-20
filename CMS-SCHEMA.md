# CMS Schema Documentation

This document describes the Contentful CMS schema for the Timeless Touch Ceramics website.

## Overview

The application uses **Contentful** as its headless CMS. Content is fetched via the Contentful Delivery API with fallback to static data when credentials are not configured.

**Environment Variables:**

- `CONTENTFUL_SPACE_ID` - Contentful Space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful Delivery API Access Token
- `CONTENTFUL_ENVIRONMENT` - Contentful Environment (default: "master")

---

## Content Relationships

The schema uses **References** to link related content types. This provides:

- ✅ **Dropdown Selection** - When editing a Product, you'll see dropdown menus for all predefined options (mainCategory, designStyle, finish, applications, size, thickness)
- ✅ **Data Integrity** - Ensures consistent values across all products
- ✅ **Centralized Management** - Update options in one place, changes reflect everywhere
- ✅ **Rich Collections** - Collections can showcase either a MainCategory or DesignStyle with images and descriptions

---

## Content Types

### 1. MainCategory

**Content Type ID:** `mainCategory`

Represents main product categories. These are predefined entries that appear as dropdown options when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description             | Validation     |
| -------- | ---------- | -------- | ----------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Category name           | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier | Must be unique |

#### Example Entries

- Name: "Slabs", Slug: "slabs"
- Name: "Tiles", Slug: "tiles"
- Name: "Swimming Pool Tiles", Slug: "pool-tiles"

---

### 2. DesignStyle

**Content Type ID:** `designStyle`

Represents design style/collection categories. These are predefined entries that appear as dropdown options when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description             | Validation     |
| -------- | ---------- | -------- | ----------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Design style name       | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier | Must be unique |

#### Example Entries

- Name: "Marble Look", Slug: "marble-look"
- Name: "Stone Look", Slug: "stone-look"
- Name: "Modern Look", Slug: "modern-look"
- Name: "Wood Look", Slug: "wood-look"
- Name: "Decorative Designs", Slug: "decorative"

---

### 3. Finish

**Content Type ID:** `finish`

Represents surface finish types. These are predefined entries that appear as dropdown options when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description             | Validation     |
| -------- | ---------- | -------- | ----------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Finish name             | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier | Must be unique |

#### Example Entries

- Name: "Polished", Slug: "polished"
- Name: "Matt", Slug: "matt"
- Name: "Glossy", Slug: "glossy"

---

### 4. Application

**Content Type ID:** `application`

Represents application types where products can be used. These are predefined entries that can be selected (multiple) when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description             | Validation     |
| -------- | ---------- | -------- | ----------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Application name        | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier | Must be unique |

#### Example Entries

- Name: "Flooring", Slug: "flooring"
- Name: "Wall", Slug: "wall"
- Name: "Swimming Pool", Slug: "swimming-pool"
- Name: "Kitchen", Slug: "kitchen"
- Name: "Bathroom", Slug: "bathroom"
- Name: "Countertop", Slug: "countertop"
- Name: "Outdoor Applications", Slug: "outdoor-application"

---

### 5. Size

**Content Type ID:** `size`

Represents product dimensions. These are predefined entries that appear as dropdown options when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description                  | Validation     |
| -------- | ---------- | -------- | ---------------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Size name (e.g., "60×120cm") | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier      | Must be unique |

#### Example Entries

- Name: "60×120cm", Slug: "60x120cm"
- Name: "60×60cm", Slug: "60x60cm"
- Name: "80×160cm", Slug: "80x160cm"
- Name: "120×240cm", Slug: "120x240cm"
- Name: "800×2400mm", Slug: "800x2400mm"
- Name: "800×3000mm", Slug: "800x3000mm"
- Name: "1200×3200mm", Slug: "1200x3200mm"

---

### 6. Thickness

**Content Type ID:** `thickness`

Represents product thickness. These are predefined entries that appear as dropdown options when creating/editing Products.

#### Fields

| Field ID | Type       | Required | Description                  | Validation     |
| -------- | ---------- | -------- | ---------------------------- | -------------- |
| `name`   | Short text | ✅ Yes   | Thickness name (e.g., "9mm") | -              |
| `slug`   | Short text | ✅ Yes   | URL-friendly identifier      | Must be unique |

#### Example Entries

- Name: "9mm", Slug: "9mm"
- Name: "12mm", Slug: "12mm"
- Name: "15mm", Slug: "15mm"

---

### 7. Collection

**Content Type ID:** `collection`

Represents showcase collections that group products. A Collection can reference either a MainCategory OR a DesignStyle, along with additional metadata like images and descriptions.

#### Fields

| Field ID       | Type                     | Required | Description                                           | Validation                                    |
| -------------- | ------------------------ | -------- | ----------------------------------------------------- | --------------------------------------------- |
| `name`         | Short text               | ✅ Yes   | Collection display name                               | -                                             |
| `slug`         | Short text               | ✅ Yes   | URL-friendly identifier                               | Must be unique                                |
| `type`         | Short text               | ✅ Yes   | Collection type                                       | Allowed values: `mainCategory`, `designStyle` |
| `mainCategory` | Reference (MainCategory) | ❌ No    | Reference to MainCategory (if type is "mainCategory") | Validates reference to MainCategory           |
| `designStyle`  | Reference (DesignStyle)  | ❌ No    | Reference to DesignStyle (if type is "designStyle")   | Validates reference to DesignStyle            |
| `image`        | Media                    | ✅ Yes   | Collection featured image                             | Asset type: Image                             |
| `description`  | Long text                | ✅ Yes   | Collection description                                | -                                             |

#### Field Details

**type** - Collection Type:

- `mainCategory` - Collection showcases products by main category (e.g., all Slabs products)
- `designStyle` - Collection showcases products by design style (e.g., all Marble Look products)

**mainCategory** - Reference Field:

- Only used when `type: "mainCategory"`
- Must reference a valid MainCategory entry
- UI shows dropdown with all MainCategory options

**designStyle** - Reference Field:

- Only used when `type: "designStyle"`
- Must reference a valid DesignStyle entry
- UI shows dropdown with all DesignStyle options

#### Example Entries

**MainCategory Collections:**

- Name: "Slabs Collection", Slug: "slabs", Type: "mainCategory", mainCategory: [reference to Slabs], Image: [image asset], Description: "Large format porcelain slabs"

**DesignStyle Collections:**

- Name: "Marble Look Collection", Slug: "marble-look", Type: "designStyle", designStyle: [reference to Marble Look], Image: [image asset], Description: "Black Collection, Luxury Range, Classic Marbles"

---

### 8. Product

**Content Type ID:** `product`

The main content type representing porcelain tiles, slabs, and pool tiles.

#### Fields

| Field ID       | Type                               | Required | Description                                               | Validation                                  |
| -------------- | ---------------------------------- | -------- | --------------------------------------------------------- | ------------------------------------------- |
| `name`         | Short text                         | ✅ Yes   | Product name (e.g., "Calacatta Gold", "Travertine Beige") | -                                           |
| `slug`         | Short text                         | ✅ Yes   | URL-friendly identifier for the product                   | Must be unique                              |
| `mainCategory` | Reference (MainCategory)           | ✅ Yes   | Reference to MainCategory                                 | Validates reference to MainCategory         |
| `designStyle`  | Reference (DesignStyle)            | ✅ Yes   | Reference to DesignStyle                                  | Validates reference to DesignStyle          |
| `finish`       | Reference (Finish)                 | ✅ Yes   | Reference to Finish                                       | Validates reference to Finish               |
| `price`        | Number                             | ✅ Yes   | Product price                                             | Must be a positive number                   |
| `unit`         | Short text                         | ✅ Yes   | Price unit (e.g., "per sqm", "per piece")                 | -                                           |
| `images`       | Media (Multiple)                   | ✅ Yes   | Array of product images                                   | Asset type: Images                          |
| `description`  | Long text                          | ❌ No    | Detailed product description                              | -                                           |
| `code`         | Short text                         | ❌ No    | Product SKU/code                                          | -                                           |
| `size`         | Reference (Size)                   | ❌ No    | Reference to Size                                         | Validates reference to Size                 |
| `thickness`    | Reference (Thickness)              | ❌ No    | Reference to Thickness                                    | Validates reference to Thickness            |
| `bookmatch`    | Boolean                            | ❌ No    | Whether the product supports bookmatching                 | Default: `false`                            |
| `sixFace`      | Boolean                            | ❌ No    | Whether the product has six-face printing                 | Default: `false`                            |
| `fullBody`     | Boolean                            | ❌ No    | Whether the product has full-body color                   | Default: `false`                            |
| `applications` | Reference (Application) (Multiple) | ❌ No    | Multiple references to Application entries                | Validates references to Application entries |

#### Field Details

**mainCategory** - Reference Field:

- **Type:** Reference (one MainCategory)
- **UI:** Shows dropdown menu with all MainCategory entries
- **Benefits:** Prevents typos, ensures consistency, centralized management

**designStyle** - Reference Field:

- **Type:** Reference (one DesignStyle)
- **UI:** Shows dropdown menu with all DesignStyle entries
- **Benefits:** Prevents typos, ensures consistency, centralized management

**finish** - Reference Field:

- **Type:** Reference (one Finish)
- **UI:** Shows dropdown menu with all Finish entries
- **Benefits:** Consistent finish names across all products

**size** - Reference Field:

- **Type:** Reference (one Size)
- **UI:** Shows dropdown menu with all Size entries
- **Benefits:** Standardized size format across all products

**thickness** - Reference Field:

- **Type:** Reference (one Thickness)
- **UI:** Shows dropdown menu with all Thickness entries
- **Benefits:** Standardized thickness values across all products

**applications** - Multiple Reference Field:

- **Type:** Reference (multiple Application entries)
- **UI:** Shows multi-select dropdown with all Application entries
- **Benefits:** Consistent application names, multiple selections allowed

#### Example Entry (With References)

```json
{
  "fields": {
    "name": "Calacatta Gold",
    "slug": "calacatta-gold",
    "mainCategory": {
      "sys": {
        "type": "Link",
        "linkType": "Entry",
        "id": "maincategory-slabs-id"
      }
    },
    "designStyle": {
      "sys": {
        "type": "Link",
        "linkType": "Entry",
        "id": "designstyle-marble-look-id"
      }
    },
    "finish": {
      "sys": {
        "type": "Link",
        "linkType": "Entry",
        "id": "finish-polished-id"
      }
    },
    "price": 45.5,
    "unit": "per sqm",
    "images": [
      {
        "fields": {
          "file": {
            "url": "//images.ctfassets.net/..."
          }
        }
      }
    ],
    "description": "Elegant marble-look porcelain slab...",
    "code": "CG-80-160",
    "size": {
      "sys": {
        "type": "Link",
        "linkType": "Entry",
        "id": "size-80x160cm-id"
      }
    },
    "thickness": {
      "sys": {
        "type": "Link",
        "linkType": "Entry",
        "id": "thickness-15mm-id"
      }
    },
    "bookmatch": true,
    "sixFace": false,
    "fullBody": true,
    "applications": [
      {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "application-flooring-id"
        }
      },
      {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "application-wall-id"
        }
      },
      {
        "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "application-kitchen-id"
        }
      }
    ]
  }
}
```

#### Example Entry (With Expanded References)

When fetching with `include=2` parameter:

```json
{
  "fields": {
    "name": "Calacatta Gold",
    "slug": "calacatta-gold",
    "mainCategory": {
      "sys": {
        "id": "maincategory-slabs-id",
        "type": "Entry"
      },
      "fields": {
        "name": "Slabs",
        "slug": "slabs"
      }
    },
    "designStyle": {
      "sys": {
        "id": "designstyle-marble-look-id",
        "type": "Entry"
      },
      "fields": {
        "name": "Marble Look Collection",
        "slug": "marble-look"
      }
    },
    "finish": {
      "sys": {
        "id": "finish-polished-id",
        "type": "Entry"
      },
      "fields": {
        "name": "Polished",
        "slug": "polished"
      }
    },
    "size": {
      "sys": {
        "id": "size-80x160cm-id",
        "type": "Entry"
      },
      "fields": {
        "name": "80×160cm",
        "slug": "80x160cm"
      }
    },
    "thickness": {
      "sys": {
        "id": "thickness-15mm-id",
        "type": "Entry"
      },
      "fields": {
        "name": "15mm",
        "slug": "15mm"
      }
    },
    "applications": [
      {
        "sys": {
          "id": "application-flooring-id",
          "type": "Entry"
        },
        "fields": {
          "name": "Flooring",
          "slug": "flooring"
        }
      },
      {
        "sys": {
          "id": "application-wall-id",
          "type": "Entry"
        },
        "fields": {
          "name": "Wall",
          "slug": "wall"
        }
      }
    ]
  }
}
```

#### API Usage

- **Fetch All Products:** `GET /entries?content_type=product&order=-sys.createdAt&limit=100&include=2`
- **Fetch by Slug:** `GET /entries?content_type=product&fields.slug={slug}&limit=1&include=2`
- **Filter by Category:** `GET /entries?content_type=product&fields.mainCategory.sys.id={maincategory-id}&include=2`
- **Filter by Design Style:** `GET /entries?content_type=product&fields.designStyle.sys.id={designstyle-id}&include=2`
- **Filter by Finish:** `GET /entries?content_type=product&fields.finish.sys.id={finish-id}&include=2`
- **Filter by Size:** `GET /entries?content_type=product&fields.size.sys.id={size-id}&include=2`
- **Filter by Application:** `GET /entries?content_type=product&fields.applications.sys.id={application-id}&include=2`
- **Note:** Use `include=2` to expand references up to 2 levels deep

---

### 9. Catalogue (Potential Content Type)

**Content Type ID:** `catalogue` _(Not yet implemented in Contentful)_

Represents PDF catalogues available for download.

#### Fields

| Field ID    | Type       | Required | Description                               |
| ----------- | ---------- | -------- | ----------------------------------------- | ----------------- |
| `title`     | Short text | ✅ Yes   | Catalogue title                           |
| `slug`      | Short text | ✅ Yes   | URL-friendly identifier                   | Must be unique    |
| `thumbnail` | Media      | ✅ Yes   | Catalogue cover image                     | Asset type: Image |
| `fileUrl`   | Media      | ✅ Yes   | PDF file reference                        | Asset type: PDF   |
| `fileSize`  | Short text | ❌ No    | Human-readable file size (e.g., "2.5 MB") | -                 |

#### Example Entries

Common catalogues include:

- "60×120cm Full Body - 15mm"
- "60×120cm & 60×60cm Matt Finish"
- "80×160cm Collection"
- "120×240cm - 9mm"
- "800×2400mm - 15mm"
- "800×3000mm Slabs - 15mm"
- "1200×3200mm - 12mm"
- "Slab Collection"
- "Swimming Pool Tiles - Midnight Splendor"
- "Timeless Touch Ceramics Handbook"

---

---

## Asset Requirements

### Images

- **Product Images:** High-resolution images (recommended: 1200×1200px minimum)
- **Catalogue Thumbnails:** Cover images for PDF catalogues
- **Collection Images:** Featured images for categories/collections

### PDFs

- Catalogue PDF files stored as assets
- Recommended file size: Keep under 10MB for better performance

---

## Data Flow

1. **Content Creation:** Content editors create/update entries in Contentful
2. **API Fetch:** Application fetches entries via Contentful Delivery API
3. **Transformation:** Raw Contentful entries are transformed to application types
4. **Fallback:** If Contentful is unavailable, application falls back to static data

### Transformation Logic

- Contentful string IDs are converted to numeric IDs using a hash function
- Image URLs are prefixed with `https:` protocol
- **Reference Resolution:** When references are included in the response, extract the slug/name from linked entries:
  - `mainCategory` → extract slug from MainCategory entry
  - `designStyle` → extract slug from DesignStyle entry
  - `finish` → extract slug from Finish entry
  - `size` → extract slug from Size entry (if present)
  - `thickness` → extract slug from Thickness entry (if present)
  - `applications` → extract slugs from Application entries array
- Entries are sorted and filtered based on query parameters

#### Handling References in Code

When fetching products with references, you'll receive the full referenced objects. Transform them to extract the slug:

```typescript
// Example transformation for reference fields
mainCategory: fields.mainCategory?.fields?.slug || '',
designStyle: fields.designStyle?.fields?.slug || '',
finish: fields.finish?.fields?.slug || '',
size: fields.size?.fields?.slug,
thickness: fields.thickness?.fields?.slug,
applications: fields.applications?.map((app: any) => app.fields?.slug).filter(Boolean) || [],
```

---

## Environment Setup

### Required Environment Variables

```env
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
CONTENTFUL_ENVIRONMENT=master  # Optional, defaults to 'master'
```

### Contentful Space Configuration

1. Create a Contentful space
2. **Create reference content types first** (these will appear as dropdown options):
   - `mainCategory` content type
   - `designStyle` content type
   - `finish` content type
   - `application` content type
   - `size` content type
   - `thickness` content type
3. **Create entries for each reference type:**
   - Create MainCategory entries (Slabs, Tiles, Pool Tiles, etc.)
   - Create DesignStyle entries (Marble Look, Stone Look, etc.)
   - Create Finish entries (Polished, Matt, Natural, etc.)
   - Create Application entries (Flooring, Wall, Kitchen, etc.)
   - Create Size entries (60×120cm, 80×160cm, etc.)
   - Create Thickness entries (9mm, 12mm, 15mm)
4. **Create the `collection` content type:**
   - Add reference field for `mainCategory` (optional, filtered by type)
   - Add reference field for `designStyle` (optional, filtered by type)
   - These allow Collections to showcase either a MainCategory or DesignStyle
5. **Create the `product` content type** with all fields:
   - `mainCategory`: **Reference** → Link to `mainCategory`
   - `designStyle`: **Reference** → Link to `designStyle`
   - `finish`: **Reference** → Link to `finish`
   - `size`: **Reference** → Link to `size` (optional)
   - `thickness`: **Reference** → Link to `thickness` (optional)
   - `applications`: **Reference** (Multiple) → Link to `application`
6. Set up Delivery API token
7. Configure environment variables in your application

### Setting Up Reference Fields in Contentful

**For Product Fields:**

1. In the Product content type, edit the `mainCategory` field
2. Set field type to **"Reference"** → **"Link to another entry"**
3. Choose **"MainCategory"** as the content type
4. The UI will automatically show a searchable dropdown with all MainCategory entries
5. Repeat for other reference fields:
   - `designStyle` → Link to `designStyle`
   - `finish` → Link to `finish`
   - `size` → Link to `size`
   - `thickness` → Link to `thickness`
   - `applications` → Link to `application` (enable **"Allow multiple entries"**)

**For Collection Fields:**

1. In the Collection content type, edit the `mainCategory` field
2. Set field type to **"Reference"** → **"Link to another entry"**
3. Choose **"MainCategory"** as the content type
4. This field is used when `type: "mainCategory"`
5. Repeat for `designStyle` field → Link to `designStyle` (used when `type: "designStyle"`)

This ensures:

- All dropdown selections are validated against predefined entries
- The Contentful UI shows searchable dropdowns for all reference fields
- Data integrity is maintained across all products
- Categories, styles, finishes, and other options are centrally managed

---

## Notes

- **Current Implementation:**
  - `Product` content type is actively using Contentful
  - Reference content types (`mainCategory`, `designStyle`, `finish`, `application`, `size`, `thickness`) should be created to enable dropdown selections
  - `Collection` content type references either MainCategory or DesignStyle for showcase pages
- **Reference Benefits:**
  - **Dropdown Selections:** All predefined options appear as dropdowns in Contentful UI
  - **Data Consistency:** Ensures consistent values across all products
  - **Centralized Management:** Update categories, styles, finishes in one place, changes reflect everywhere
  - **No Typos:** Impossible to enter invalid values due to reference validation
  - **Rich Collections:** Collections can showcase categories/styles with images and descriptions
- **Content Type Hierarchy:**
  1. **Reference Types** (dropdown options): MainCategory, DesignStyle, Finish, Application, Size, Thickness
  2. **Collection** (showcases): References MainCategory OR DesignStyle
  3. **Product** (main content): References all reference types as dropdowns
- **Future Enhancements:** Consider creating separate content types for:
  - Catalogue entries (with reference to Products if needed)
  - SEO metadata
  - Page content
  - Unit types (as reference entries for `unit` field)

---

## Related Files

- `lib/api/products.ts` - Contentful API integration
- `lib/types.ts` - TypeScript type definitions
- `lib/catalogues-data.ts` - Catalogue data structure
- `lib/product-categories.ts` - Product categories structure

---

_Last Updated: Based on codebase analysis_
