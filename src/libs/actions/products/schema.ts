'server only';

import { z } from 'zod';

import { DTO, Models } from '@tot/core/types';

const searchProducts = z.object({
  skip: z.optional(z.number()).default(0),
  take: z.optional(z.number()).default(12),
  withFacets: z.optional(z.boolean()).default(true),
  withImages: z.optional(z.boolean()).default(true),
  subTree: z.optional(z.string()),
  facets: z.optional(
    z.array(
      z.object({
        facet: z.custom<DTO.ITermFacetDTO>(),
      }),
    ),
  ),
  availableIn: z.optional(z.object({ ids: z.array(z.string()) }).or(z.object({ names: z.array(z.string()) }))),
  sort: z.optional(z.string()),
  priceRange: z.optional(z.object({ from: z.optional(z.string()), to: z.optional(z.string()) })),
  keyword: z.optional(z.string()),
  selectedCategory: z.optional(z.any()),
  inInventory: z.optional(z.string()),
  product: z.optional(z.record(z.unknown())),
});

const featuredProducts = z.object({
  skip: z.optional(z.number()).default(0),
  take: z.optional(z.number()).default(12),
  subTree: z.optional(z.string()),
  availableIn: z.optional(z.object({ ids: z.array(z.string()) }).or(z.object({ names: z.array(z.string()) }))),
  priceRange: z.optional(z.object({ from: z.optional(z.string()), to: z.optional(z.string()) })),
  inInventory: z.optional(z.string()),
});

const getProductById = z.object({
  id: z.string().min(3),
  inInventory: z.optional(z.string()),
});

const getProductBySlug = z.object({
  slug: z.string().min(3),
  inInventory: z.optional(z.string()),
});

const getProductCategoryBySlug = z.object({
  slug: z.string().min(3),
});

const searchRelatedProducts = z.object({
  productId: z.string({ required_error: 'Parent product id must be passed' }),
  inInventory: z.optional(z.string()),
});

const getProductReviews = z.object({
  skip: z.optional(z.number()).default(0),
  take: z.optional(z.number()).default(12),
  keyword: z.optional(z.string()),
  sort: z.optional(z.string()).default('createdDate:desc'),
  productId: z.string({ required_error: 'Parent product id must be passed' }),
});

export const Schema = {
  searchProducts,
  getProductById,
  getProductBySlug,
  getProductCategoryBySlug,
  searchRelatedProducts,
  featuredProducts,
  getProductReviews,
};
