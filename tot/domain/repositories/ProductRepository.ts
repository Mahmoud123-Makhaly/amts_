import {
  Category,
  Product,
  ProductConnection,
  CustomerReviewConnection,
} from '../entities';
import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface IProductRepository extends IEntityBaseRepository {
  getProducts: (
    /**Only return edges after the specified cursor. */
    after?: string,
    /**Specifies the maximum number of edges to return, starting after the cursor specified by 'after', or the first number of edges if 'after' is not specified. */
    first?: number,
    /**When the displayInStock query parameter is set to true the search endpoint will return only products in stock. */
    displayInStock?: boolean,
    /**The query parameter performs the full-text search */
    keyword?: string,
    /**This parameter applies a filter to the query results */
    filter?: any,
    /**When the fuzzy query parameter is set to true the search endpoint will also return products that contain slight differences to the search text. */
    fuzzy?: boolean,
    /**The fuzziness level is quantified in terms of the Damerau-Levenshtein distance, this distance being the number of operations needed to transform one word into another. */
    fuzzyLevel?: number,
    /**The sort expression */
    sort?: string,
    /**Product Ids */
    productIds?: Array<string>,
  ) => Promise<Result<ProductConnection>>;

  getProductById: (id: string) => Promise<Result<Product>>;

  getCategoryById: (id: string) => Promise<Result<Category>>;

  getChildCategories: (
    maxLevel?: number,
    categoryId?: string,
    onlyActive?: boolean,
    productFilter?: string,
  ) => Promise<Result<Array<Category>>>;

  searchRelatedProducts: (
    productId: string,
    after?: string,
    first?: number,
    group?: string,
    query?: string,
  ) => Promise<Result<Product>>;

  getReviews: (
    productId: string,
    /**Only return edges after the specified cursor. */
    after?: string,
    /**Specifies the maximum number of edges to return, starting after the cursor specified by 'after', or the first number of edges if 'after' is not specified. */
    first?: number,
    /**The query parameter performs the full-text search */
    keyword?: string,
    /**The sort expression */
    sort?: string,
    filter?: { reviewStatus: string },
  ) => Promise<Result<CustomerReviewConnection>>;
}
