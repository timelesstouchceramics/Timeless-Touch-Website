import { groq } from "next-sanity";

export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    code,
    description,
    price,
    unit,
    "mainCategory": mainCategory->slug.current,
    "designStyle": designStyle->slug.current,
    "finish": finish->slug.current,
    "applications": applications[]->name,
    "sizes": sizes[]->slug.current,
    "thickness": thickness->slug.current,
    "catalogues": catalogues[]->slug.current,
    bookmatch,
    sixFace,
    fullBody,
    images
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    code,
    description,
    price,
    unit,
    "mainCategory": mainCategory->slug.current,
    "designStyle": designStyle->slug.current,
    "finish": finish->slug.current,
    "applications": applications[]->name,
    "sizes": sizes[]->slug.current,
    "thickness": thickness->slug.current,
    "catalogues": catalogues[]->slug.current,
    bookmatch,
    sixFace,
    fullBody,
    images
  }
`;

export const collectionsQuery = groq`
  *[_type == "collection"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    type,
    "mainCategorySlug": mainCategory->slug.current,
    "designStyleSlug": designStyle->slug.current,
    image,
    description
  }
`;

export const cataloguesQuery = groq`
  *[_type == "catalogue"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    thumbnail,
    "fileUrl": file.asset->url,
    fileSize,
    description
  }
`;

export const mainCategoriesQuery = groq`
  *[_type == "mainCategory"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const designStylesQuery = groq`
  *[_type == "designStyle"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const finishesQuery = groq`
  *[_type == "finish"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const applicationsQuery = groq`
  *[_type == "application"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const sizesQuery = groq`
  *[_type == "size"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;

export const thicknessesQuery = groq`
  *[_type == "thickness"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`;
