import { IProductCategoryDTO, IProductDTO } from '../DTO';
import { Contracts } from '../types';
import { JsonLdTypes } from '../models';
import { ProductJsonLdServices } from './ProductJsonLdServices';
import { JsonLd } from './JsonLdServices';

export class ProductCategoryJsonLdServices {
  private _jsonLdValue = '';

  constructor(
    category: IProductCategoryDTO,
    configuration: Contracts.IConfiguration,
    products?: Array<IProductDTO>,
    url?: string,
  ) {
    const defaultJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: configuration.selectedStoreId || 'TOT',
      description: configuration.selectedStoreId || 'TOT',
      image: 'https://totplatform.com/assets/images/tot%20logo.svg',
      store: configuration.selectedStoreId,
      defaultCurrency: configuration.defaultCurrency,
    };

    const _itemListElements: any = [];

    const _meta = {
      slug: category.slug ?? category.name ?? defaultJsonLD.name,
      name: category.name ?? category.slug ?? defaultJsonLD.name,
      description: category.seoInfo?.metaDescription ?? category.slug ?? defaultJsonLD.description,
      image: category.imgSrc ?? defaultJsonLD.image,
      brand: defaultJsonLD.store,
      keywords: category.seoInfo?.metaKeywords ?? category.slug?.split('/').join(',') ?? defaultJsonLD.description,
    };

    const _jsonLd = new JsonLd(JsonLdTypes.ItemList, _meta.slug, _meta.description, _meta.image);

    if (url) _jsonLd.bindKVPair('url', url);

    if (category.parent)
      _jsonLd.bindKVPair('category', {
        '@context': 'https://schema.org',
        '@type': JsonLdTypes.CategoryCodeSet.toString(),
        '@id': category.parent.slug ?? defaultJsonLD.name,
        name: category.parent.name ?? defaultJsonLD.name,
        hasCategoryCode: category.parent.slug ?? category.parent.name ?? defaultJsonLD.name,
      });

    if (products?.length) {
      _jsonLd.bindKVPair('numberOfItems', products.length);

      products.forEach(prod => {
        _itemListElements.push(new ProductJsonLdServices(prod, configuration, 'master').getJSON());
      });
    }

    _jsonLd.bindKVPair('itemListElement', _itemListElements);

    this._jsonLdValue = _jsonLd.build();
  }

  get = () => this._jsonLdValue;
}
