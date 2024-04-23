import { IProductService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO, Models } from '../types';
import { SEOServices } from './SEOServices';
import { ProductJsonLdServices } from './ProductJsonLdServices';
import { ProductCategoryJsonLdServices } from './ProductCategoryJsonLdServices';
import { Entities } from '@tot/domain';
import { Mapper } from '../mapper';

export class ProductServices extends IProductService {
  private _seoRepository = new SEOServices(this._configurations, this._repos, this._client);

  protected setContext() {
    this._context = new this._repos.ProductRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  getProducts(
    after: string | undefined = '0',
    first: number | undefined = 10,
    filter: {
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
      mode?: 'grouped' | 'single' | 'both';
      product?: { [k in keyof DTO.IProductFiltersDTO]: Array<string> };
    },
    displayInStock?: boolean | undefined,
    keyword: string | undefined = undefined,
    fuzzy: boolean | undefined = undefined,
    fuzzyLevel: number | undefined = undefined,
    sort: string | undefined = undefined,
    productIds: string[] | undefined = undefined,
    selectedCategory?: DTO.IProductCategoryDTO,
    inInventory?: string | undefined,
  ): Promise<Contracts.Result<DTO.IProductConnectionDTO>> {
    filter = {
      withFacets: true,
      withImages: true,
      subTree: undefined,
      termsFacets: undefined,
      availableIn: undefined,
      priceRange: undefined,
      mode: 'grouped',
      ...filter,
      is: [...new Set([...(filter.is ?? []), 'priced'])] as Array<'visible' | 'product' | 'nosale' | 'priced'>,
    };

    /*
    is:priced Keep only products that  with at least one price set
    isActive (if false that means SoldOut)
    isAvailable (True product is available for order, pre-order, back-order  in any fulfillment centers Can be purchased)
    isBuyable (true if product Can be purchased otherwise is OutOfStock)
    isInStock (True product is InStock in any fulfillment centers)
    availableQuantity (Quantity in all fulfillment centers or 0 if Track inventory is disabled )
     */

    //Check price range filter to avoid none float values and negative values
    if (isNaN(parseFloat(filter.priceRange?.from ?? '')) || parseFloat(filter.priceRange?.from ?? '') < 0) {
      filter = {
        ...filter,
        priceRange: { ...filter.priceRange, from: '0' },
      };
    }
    if (filter.priceRange?.to && (isNaN(parseFloat(filter.priceRange.to)) || parseFloat(filter.priceRange.to) < 0)) {
      filter = {
        ...filter,
        priceRange: { ...filter.priceRange, to: undefined },
      };
    }
    const productFilter = { ...filter.product };
    delete filter['product'];
    return this._context
      .getProducts(
        after,
        first,
        displayInStock,
        keyword,
        { ...filter, ...productFilter },
        fuzzy,
        fuzzyLevel,
        sort,
        productIds,
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'ProductServices.getProducts',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.IProductConnectionDTO>;
        } else {
          const { data } = result;
          const searchResult: DTO.IProductConnectionDTO = {
            totalCount: data.totalCount,
            termFacets: data.term_facets,
            sort: [
              {
                label: Utils.productSortLabels('FEATURED', this._configurations.defaultCultureName),
                term: 'createdDate:desc;name:asc;',
                isSelected: sort === 'createdDate:desc;name:asc',
              },
              {
                label: Utils.productSortLabels('ALPHABET_AZ', this._configurations.defaultCultureName),
                term: 'name:asc',
                isSelected: sort === 'name:asc',
              },
              {
                label: Utils.productSortLabels('ALPHABET_ZA', this._configurations.defaultCultureName),
                term: 'name:desc',
                isSelected: sort === 'name:desc',
              },
              {
                label: Utils.productSortLabels('PRICE_LH', this._configurations.defaultCultureName),
                term: 'price:asc',
                isSelected: sort === 'price:asc',
              },
              {
                label: Utils.productSortLabels('PRICE_HL', this._configurations.defaultCultureName),
                term: 'price:desc',
                isSelected: sort === 'price:desc',
              },
              {
                label: Utils.productSortLabels('DATE_NO', this._configurations.defaultCultureName),
                term: 'createdDate:desc',
                isSelected: sort === 'createdDate:desc',
              },
              {
                label: Utils.productSortLabels('DATE_ON', this._configurations.defaultCultureName),
                term: 'createdDate:asc',
                isSelected: sort === 'createdDate:asc',
              },
              {
                label: Utils.productSortLabels('IN_STOCK', this._configurations.defaultCultureName),
                term: 'availability:asc',
                isSelected: sort === 'availability:asc',
              },
            ],
            items: data.items?.map<DTO.IProductDTO>(item => {
              return {
                ...Mapper.mapEntitiesProductToProductDTO(item, inInventory),
              } as DTO.IProductDTO;
            }),
          };

          searchResult.JsonLd = selectedCategory
            ? new ProductCategoryJsonLdServices(selectedCategory, this._configurations, searchResult.items).get()
            : searchResult.items?.length
              ? JSON.stringify(
                  searchResult.items?.map(product =>
                    new ProductJsonLdServices(product, this._configurations, 'master').getJSON(),
                  ),
                )
              : JSON.stringify(this.defaultJsonLD);

          return { data: searchResult } as Contracts.Result<DTO.IProductConnectionDTO>;
        }
      });
  }

  getFeaturedProducts(
    after: string | undefined = '0',
    first: number | undefined = 10,
    subTree?: string,
    availableIn?: { ids?: Array<string>; names?: never } | { names?: Array<string>; ids?: never } | undefined,
    priceRange?: { from?: string; to?: string },
    inInventory?: string | undefined,
  ): Promise<Contracts.Result<DTO.IProductConnectionDTO>> {
    const filter = {
      withFacets: true,
      withImages: true,
      subTree: subTree ?? this._configurations.selectedCatalogId,
      availableIn,
      priceRange,
    };
    return this.getProducts(
      after,
      first,
      filter,
      undefined,
      undefined,
      false,
      undefined,
      'createdDate:desc;name:asc',
      undefined,
      undefined,
      inInventory,
    ).then(products => {
      if (products.error) {
        return {
          error: {
            code: 'ProductServices.getFeaturedProducts',
            message: products.error.message,
            trace: [products.error],
          },
        };
      } else return { data: products.data };
    });
  }

  getProductById(id: string, inInventory?: string | undefined): Promise<Contracts.Result<DTO.IProductDTO>> {
    return this._context.getProductById(id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'ProductServices.getProductById',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IProductDTO>;
      } else {
        const product: DTO.IProductDTO = {
          ...Mapper.mapEntitiesProductToProductDTO(result.data, inInventory),
        } as DTO.IProductDTO;
        product.JsonLd = new ProductJsonLdServices(product, this._configurations, 'master').get();

        return { data: product } as Contracts.Result<DTO.IProductDTO>;
      }
    });
  }

  async getProductBySlug(slug: string, inInventory?: string | undefined): Promise<Contracts.Result<DTO.IProductDTO>> {
    return this._seoRepository.getEntityInfoBySlug(slug).then(productSEOInfo => {
      if (productSEOInfo.error || !productSEOInfo.data || productSEOInfo.data.length <= 0) {
        return {
          error: {
            code: 'ProductServices.getProductBySlug',
            message: productSEOInfo.error?.message,
            trace: [productSEOInfo.error],
          },
        } as Contracts.Result<DTO.IProductDTO>;
      } else return this.getProductById(productSEOInfo.data[0].objectId || '', inInventory);
    });
  }

  async getProductCategoryById(id: string): Promise<Contracts.Result<DTO.IProductCategoryDTO>> {
    return this._context.getCategoryById(id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'ProductServices.getProductCategoryById',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IProductCategoryDTO>;
      } else {
        return { data: result.data as unknown as DTO.IProductCategoryDTO } as Contracts.Result<DTO.IProductCategoryDTO>;
      }
    });
  }

  async getProductCategoryBySlug(slug: string): Promise<Contracts.Result<DTO.IProductCategoryDTO>> {
    return this._seoRepository.getEntityInfoBySlug(slug).then(_productCategorySEOInfo => {
      if (_productCategorySEOInfo.error || !_productCategorySEOInfo.data || _productCategorySEOInfo.data.length <= 0) {
        return {
          error: {
            code: 'ProductServices.getProductCategoryBySlug',
            message: _productCategorySEOInfo.error?.message,
            trace: [_productCategorySEOInfo.error],
          },
        } as Contracts.Result<DTO.IProductCategoryDTO>;
      } else return this.getProductCategoryById(_productCategorySEOInfo.data[0].objectId || '');
    });
  }

  async searchRelatedProducts(
    productId: string,
    after: string | undefined,
    first: number | undefined,
    group?: string | undefined,
    query?: string | undefined,
    inInventory?: string | undefined,
  ): Promise<Contracts.Result<DTO.IProductDTO>> {
    return this._context.searchRelatedProducts(productId, after, first, group, query).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'ProductServices.searchRelatedProducts',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IProductDTO>;
      } else {
        const product: DTO.IProductDTO = {
          brandName: result.data.brandName,
          code: result.data.code,
          hasVariations: result.data.hasVariations,
          id: result.data.id,
          imgSrc: result.data.imgSrc,
          name: result.data.name,
          outline: result.data.outline,
          slug: result.data.slug,
          listFormattedPrice: result.data.price?.list?.formattedAmount,
          description: result.data.description?.content,
          availabilityData: result.data.availabilityData,
          breadcrumbs: result.data.breadcrumbs,
          properties: result.data.properties,
          associations: result.data.associations,
        } as DTO.IProductDTO;
        const associatedProducts: Array<DTO.IProductAssociationDTO> | undefined = product.associations?.items?.map(
          item => {
            {
              const _prod = {
                ...item,
                product: {
                  ...Mapper.mapEntitiesProductToProductDTO(item.product!, inInventory),
                } as DTO.IProductDTO,
              };
              return _prod;
            }
          },
        );

        product.JsonLd = new ProductJsonLdServices(
          product,
          this._configurations,
          'associated',
          associatedProducts?.map(x => x.product) as Array<DTO.IProductDTO>,
        ).get();

        return {
          data: { ...product, associations: { ...product.associations, items: associatedProducts } },
        } as Contracts.Result<DTO.IProductDTO>;
      }
    });
  }

  async getProductReviews(
    productId: string,
    /**Only return edges after the specified cursor. */
    after?: string,
    /**Specifies the maximum number of edges to return, starting after the cursor specified by 'after', or the first number of edges if 'after' is not specified. */
    first?: number,
    /**The query parameter performs the full-text search */
    keyword?: string,
    /**The sort expression */
    sort?: string,
  ): Promise<Contracts.Result<DTO.ICustomerReviewConnectionDTO>> {
    const buildFilterReviewStatusFilter = () => {
      switch (this._configurations.reviewsMode) {
        case 'All':
          return { reviewStatus: 'APPROVED,NEW,REJECTED' };
        case 'Approved':
          return { reviewStatus: 'APPROVED' };
        case 'Accepted':
          return { reviewStatus: 'APPROVED,NEW' };
        case 'None':
          return undefined;
      }
    };

    const filter = buildFilterReviewStatusFilter();
    if (!filter)
      return {
        error: {
          code: 'ProductServices.getProductReviews',
          message: 'App Reviews Mode is NONE',
        },
      } as Contracts.Result<DTO.ICustomerReviewConnectionDTO>;

    return this._context.getReviews(productId, after, first, keyword, sort, filter).then(reviews => {
      if (reviews.error) {
        return {
          error: {
            code: 'ProductServices.getProductReviews',
            message: reviews.error?.message,
            trace: [reviews.error],
          },
        };
      } else {
        const result: DTO.ICustomerReviewConnectionDTO = {
          items: reviews.data.items?.map(
            (item: Entities.CustomerReview) =>
              ({
                ...item,
                viewStatus: Utils.valueToEnum<typeof Models.CustomerReviewStatus>(
                  Models.CustomerReviewStatus,
                  item.reviewStatus ?? 'NEW',
                ),
              }) as DTO.ICustomerReviewDTO,
          ),
          pageInfo: reviews.data.pageInfo,
        };
        return { data: result };
      }
    });
  }
}
