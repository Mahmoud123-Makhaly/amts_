import { IRepositories, Models, Entities } from '../../../domain';

import {
  CategoryQueryDocument,
  ProductDetails,
  SEARCH_ASSOCIATED_PRODUCTS,
  SearchProducts,
  GET_CUSTOMER_REVIEWS,
} from './documents';
import { Utils } from '../common';

export class ProductRepository extends IRepositories.IEntityBaseRepository implements IRepositories.IProductRepository {
  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId);
  }

  getCategoryById = (id: string): Promise<Models.Result<Entities.Category>> => {
    const queryDocument = CategoryQueryDocument(id);
    return this._context
      .get<Required<Pick<Entities.Query, 'category'>>, Entities.QueryChildCategoriesArgs>({
        query: queryDocument,
        variables: {
          storeId: this.storeId,
          userId: this.userId,
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.getCategory',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.Category>;
        } else {
          return { data: result.data?.category } as Models.Result<Entities.Category>;
        }
      });
  };

  getChildCategories = (
    maxLevel = 0,
    categoryId?: string,
    onlyActive?: boolean,
    productFilter?: string,
  ): Promise<Models.Result<Array<Entities.Category>>> => {
    const queryDocument = CategoryQueryDocument(categoryId, maxLevel);
    return this._context
      .get<Required<Pick<Entities.Query, 'category' | 'childCategories'>>, Entities.ChildCategoriesQueryResponseType>({
        query: queryDocument,
        variables: {
          storeId: this.storeId,
          userId: this.userId,
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          maxLevel,
          onlyActive,
          productFilter,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.getChildCategories',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Array<Entities.Category>>;
        } else {
          return {
            data: result.data?.childCategories.childCategories,
          } as Models.Result<Array<Entities.Category>>;
        }
      });
  };

  getProducts = (
    after?: string | undefined,
    first?: number | undefined,
    displayInStock: boolean = false,
    keyword?: string | undefined,
    filter?: any | undefined,
    fuzzy?: boolean | undefined,
    fuzzyLevel?: number | undefined,
    sort?: string | undefined,
    productIds?: string[] | undefined,
  ): Promise<Models.Result<Entities.ProductConnection>> => {
    const {
      withFacets = false,
      withImages = false,
      termsFacets,
      availableIn,
      subTree,
      priceRange,
      is,
      mode = 'grouped',
      ...rest
    }: {
      withFacets?: boolean;
      withImages?: boolean;
      subTree?: string;
      termsFacets?: Array<Entities.TermFacet>;
      availableIn?: { ids?: Array<string>; names?: never } | { names?: Array<string>; ids?: never } | undefined;
      priceRange?: { from?: string; to?: string };
      is?: Array<'visible' | 'product' | 'nosale' | 'priced'>;
      mode?: 'grouped' | 'single' | 'both';
      [k: string]: any;
      } = filter;

    const filterStrings = [
      subTree ? `category.subtree:${subTree}` : '',
      Utils.getFilterExpressionForInStock(displayInStock),
      Utils.getFilterPriceExpression(this.currencyCode, priceRange?.from, priceRange?.to),
      is ? `is:${is.join(',')}` : '',
      Utils.getFilterProductsORVariationsExpression(mode),
      ...Object.entries(rest).map(x => (x ? `${x[0]}:${x[1]?.toString() ?? ''}` : '')),
    ];

    if (availableIn && (availableIn.ids || availableIn.names)) {
      filterStrings.push(
        availableIn.ids
          ? Utils.getFilterExpressionForAvailableIn(availableIn.ids, 'id')
          : Utils.getFilterExpressionForAvailableIn(availableIn.names, 'name'),
      );
    }

    if (termsFacets && termsFacets.length) {
      filterStrings.push(
        Utils.getFilterExpressionFromFacets(termsFacets.map(term => Utils.termFacetToCommonFacet(term))),
      );
    }

    const filterStringsExpression = filterStrings.filter(Boolean).join(' ');

    // console.log({
    //   storeId: this.storeId,
    //   userId: this.userId,
    //   cultureName: this.cultureName,
    //   currencyCode: this.currencyCode,
    //   sort,
    //   fuzzy,
    //   fuzzyLevel,
    //   withFacets,
    //   withImages,
    //   query: keyword,
    //   availableIn,
    //   filter: filterStringsExpression,
    //   first,
    //   after,
    //   productIds,
    // });

    return this._context
      .get<
        Required<Pick<Entities.Query, 'products'>>,
        Entities.QueryProductsArgs & { withFacets: boolean; withImages: boolean }
      >({
        query: SearchProducts,
        variables: {
          storeId: this.storeId,
          userId: this.userId,
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          sort,
          fuzzy,
          fuzzyLevel,
          withFacets,
          withImages,
          query: keyword,
          filter: filterStringsExpression,
          first,
          after,
          productIds,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.getProducts',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.ProductConnection>;
        } else {
          return { data: result.data?.products } as Models.Result<Entities.ProductConnection>;
        }
      });
  };

  getProductById = (id: string): Promise<Models.Result<Entities.Product>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'product'>>, Entities.QueryProductArgs>({
        query: ProductDetails,
        variables: {
          storeId: this.storeId,
          userId: this.userId ?? '',
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          id,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.getProductById',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.Product>;
        } else {
          return { data: result.data?.product } as Models.Result<Entities.Product>;
        }
      });
  };

  searchRelatedProducts = (
    productId: string,
    after?: string,
    first?: number,
    group?: string,
    query?: string,
  ): Promise<Models.Result<Entities.Product>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'product'>>, Entities.QueryProductArgs & Entities.ProductAssociationsArgs>({
        query: SEARCH_ASSOCIATED_PRODUCTS,
        variables: {
          storeId: this.storeId,
          userId: this.userId ?? '',
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          id: productId,
          after,
          first,
          group,
          query,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.searchRelatedProducts',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.Product>;
        } else {
          return { data: result.data?.product } as Models.Result<Entities.Product>;
        }
      });
  };

  getReviews = (
    productId: string,
    after?: string | undefined,
    first?: number | undefined,
    keyword?: string | undefined,
    sort?: string | undefined,
    filter?: { reviewStatus: string } | undefined,
  ): Promise<Models.Result<Entities.CustomerReviewConnection>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'customerReviews'>>, Entities.CustomerReviewConnection>({
        query: GET_CUSTOMER_REVIEWS,
        variables: {
          storeId: this.storeId,
          entityId: productId,
          entityType: 'Product',
          filter: Utils.convertArrayOfKeyAndValuesToString(Utils.objToArrayOfKeyAndValue(filter), ';'),
          after,
          first,
          keyword,
          sort,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductRepository.getReviews',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CustomerReviewConnection>;
        } else {
          return {
            data: result.data?.customerReviews,
          } as Models.Result<Entities.CustomerReviewConnection>;
        }
      });
  };
}
