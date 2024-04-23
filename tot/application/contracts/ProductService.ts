import { IRepositories } from '../../domain';

import { IBaseService } from './BaseService';
import { Result } from './Result';
import { DTO } from '../types';
import { ICustomerReviewConnectionDTO } from '../DTO/CustomerReviewConnection';

export abstract class IProductService extends IBaseService<IRepositories.IProductRepository> {
  protected defaultJsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: this._configurations.selectedStoreId || 'TOT',
    description: this._configurations.selectedStoreId || 'TOT',
    image: 'https://totplatform.com/assets/images/tot%20logo.svg',
  };

  /**
   * Gets a paginated list of products based on the specified filter and sorting criteria.
   *
   * @param after - Optional string specifying the cursor for pagination. Default is '0'.
   * @param first - Optional number specifying the maximum number of products to retrieve. Default is 10.
   * @param filter - Optional object for filtering search products. Default is:
   * {
   * withFacets: true,
   * withImages: true,
   * subTree: undefined,
   * termsFacets: undefined,
   * availableIn: undefined,
   * priceRange: undefined,
   * mode: 'grouped',
   * }
   * @param keyword - Optional string for searching by keyword. Default is undefined.
   * @param fuzzy - Optional boolean for fuzzy matching. Default is undefined.
   * @param fuzzyLevel - Optional number for the level of fuzziness. Default is undefined.
   * @param sort - Optional string for sorting search products. Default is undefined.
   * @param productIds - Optional array of product IDs for filtering by product ID. Default is undefined.
   * @returns {Promise<Contracts.Result<Array<DTO.IProductDTO> | undefined>>} A promise that resolves to the list of products or an error result.
   */
  abstract getProducts(
    after?: string | undefined,
    first?: number | undefined,
    filter?: {
      /**@default true */
      withFacets?: boolean;
      /**@default true */
      withImages?: boolean;
      /**@default undefined */
      subTree?: string;
      /**@default undefined */
      termsFacets?: Array<DTO.ITermFacetDTO>;
      /**@default undefined */
      availableIn?: { ids?: Array<string>; names?: never } | { names?: Array<string>; ids?: never } | undefined;
      priceRange?: { from?: string; to?: string };
      is?: Array<'visible' | 'product' | 'nosale' | 'priced'>;
      /*
       * Filter Products or Variations
       * This includes only either the products or variations in the result.
       * grouped: It will return products
       * single: It will return variations
       * both: It will return both types
       * @default 'grouped'
       */
      mode?: 'grouped' | 'single' | 'both';
      product?: { [k in keyof DTO.IProductFiltersDTO]: Array<string> };
    },
    displayInStock?: boolean | undefined,
    keyword?: string | undefined,
    fuzzy?: boolean | undefined,
    fuzzyLevel?: number | undefined,
    sort?: string | undefined,
    productIds?: string[] | undefined,
    selectedCategory?: DTO.IProductCategoryDTO,
    inInventory?: string | undefined,
  ): Promise<Result<DTO.IProductConnectionDTO>>;

  abstract getFeaturedProducts(
    after?: string | undefined,
    first?: number | undefined,
    subTree?: string,
    availableIn?: { ids?: Array<string>; names?: never } | { names?: Array<string>; ids?: never } | undefined,
    priceRange?: { from?: string; to?: string },
    inInventory?: string | undefined,
  ): Promise<Result<DTO.IProductConnectionDTO>>;

  abstract getProductById(id: string, inInventory?: string | undefined): Promise<Result<DTO.IProductDTO>>;

  abstract getProductBySlug(slug: string, inInventory?: string | undefined): Promise<Result<DTO.IProductDTO>>;

  abstract getProductCategoryById(id: string): Promise<Result<DTO.IProductCategoryDTO>>;

  abstract getProductCategoryBySlug(slug: string): Promise<Result<DTO.IProductCategoryDTO>>;

  abstract searchRelatedProducts(
    productId: string,
    after?: string,
    first?: number,
    group?: string,
    query?: string,
    inInventory?: string | undefined,
  ): Promise<Result<DTO.IProductDTO>>;

  abstract getProductReviews(
    productId: string,
    /**Only return edges after the specified cursor. */
    after?: string,
    /**Specifies the maximum number of edges to return, starting after the cursor specified by 'after', or the first number of edges if 'after' is not specified. */
    first?: number,
    /**The query parameter performs the full-text search */
    keyword?: string,
    /**The sort expression */
    sort?: string,
  ): Promise<Result<ICustomerReviewConnectionDTO>>;
}
