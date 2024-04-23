'use server';

import { cache } from 'react';

import { env } from '@libs';
import { DTO } from '@tot/core/types';

import { client } from '../client';
import { Schema } from './schema';

/**
 * Gets a paginated list of products based on the specified filter and sorting criteria.
 *
 * @param after - Optional string specifying the cursor for pagination. Default is '0'.
 * @param first - Optional number specifying the maximum number of products to retrieve. Default is 12.
 * @param filter - Optional object for filtering search products. Default is:
 * {
 *   withFacets: true,
 *   withImages: true,
 *   categoryId: '',
 *   outlineNames: undefined,
 * }
 * @param keyword - Optional string for searching by keyword. Default is undefined.
 * @param fuzzy - Optional boolean for fuzzy matching. Default is undefined.
 * @param fuzzyLevel - Optional number for the level of fuzziness. Default is undefined.
 * @param sort - Optional string for sorting search products. Default is undefined.
 * @param productIds - Optional array of product IDs for filtering by product ID. Default is undefined.
 * @returns {Promise<Contracts.Result<Array<DTO.IProductDTO> | undefined>>} A promise that resolves to the list of products or an error result.
 */
export const searchProducts = cache(
  client(Schema.searchProducts, async (inputs, { _context, selectedInventory }) => {
    const {
      skip,
      take,
      withFacets,
      withImages,
      subTree = env.CATALOG_ID,
      facets: facets,
      availableIn,
      sort,
      priceRange,
      keyword,
      selectedCategory,
      product,
    } = inputs;

    return _context.productServices?.getProducts(
      skip.toString(),
      take,
      {
        withFacets,
        withImages,
        subTree,
        termsFacets: facets?.map(x => x.facet) ?? undefined,
        availableIn,
        priceRange,
        product: product as { [k in keyof DTO.IProductFiltersDTO]: Array<string> },
      },
      undefined,
      keyword,
      !!keyword,
      undefined,
      sort,
      undefined,
      selectedCategory,
      selectedInventory?.id,
    );
  }),
);

export const getFeaturedProducts = cache(
  client(Schema.featuredProducts, async (inputs, { _context, selectedInventory }) => {
    const { skip, take, subTree, availableIn, priceRange } = inputs;

    return _context.productServices?.getFeaturedProducts(
      skip.toString(),
      take,
      subTree,
      availableIn,
      priceRange,
      selectedInventory?.id,
    );
  }),
);

export const getProductById = cache(
  client(Schema.getProductById, async (inputs, { _context, selectedInventory }) => {
    const { id } = inputs;
    return _context.productServices?.getProductById(id, selectedInventory?.id);
  }),
);

export const getProductBySlug = cache(
  client(Schema.getProductBySlug, async (inputs, { _context, selectedInventory }) => {
    const { slug } = inputs;
    return _context.productServices?.getProductBySlug(slug, selectedInventory?.id);
  }),
);

export const getProductCategoryBySlug = cache(
  client(Schema.getProductCategoryBySlug, async (inputs, { _context }) => {
    const { slug } = inputs;
    return _context.productServices?.getProductCategoryBySlug(slug);
  }),
);

export const searchRelatedProducts = cache(
  client(Schema.searchRelatedProducts, async (inputs, { _context, selectedInventory }) => {
    const { productId } = inputs;
    return _context.productServices?.searchRelatedProducts(
      productId,
      undefined,
      undefined,
      undefined,
      undefined,
      selectedInventory?.id,
    );
  }),
);

export const getProductReviews = cache(
  client(Schema.getProductReviews, async (inputs, { _context }) => {
    const { productId, skip, take, keyword, sort } = inputs;
    return _context.productServices?.getProductReviews(productId, skip.toString(), take, keyword, sort);
  }),
);
