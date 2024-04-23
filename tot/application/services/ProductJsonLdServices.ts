import { IProductDTO, IVariationTypeDTO } from '../DTO';
import { JsonLdTypes } from '../models';
import { Contracts } from '../types';
import { JsonLd } from './JsonLdServices';

export class ProductJsonLdServices {
  private _jsonLdValue = '';

  constructor(
    product: IProductDTO,
    configuration: Contracts.IConfiguration,
    type: 'master' | 'associated' | 'variant',
    associatedOrVariantProduct?: IProductDTO | Array<IProductDTO>,
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
    switch (type) {
      case 'master':
        this.buildMasterProduct(product, defaultJsonLD);
        break;
      case 'associated':
        if (associatedOrVariantProduct)
          this.buildAssociatedProducts(
            product,
            defaultJsonLD,
            Array.isArray(associatedOrVariantProduct) ? associatedOrVariantProduct : [associatedOrVariantProduct],
          );
        break;
    }
  }

  get = () => this._jsonLdValue;

  getJSON = () => JSON.parse(this._jsonLdValue);

  buildOffer(
    product: IProductDTO | IVariationTypeDTO | Array<IVariationTypeDTO> | Array<IProductDTO>,
    defaultJsonLD: any,
  ): any {
    if (Array.isArray(product) && product.length) {
      const _productWithPrices = product.filter(x => x.price && x.price?.list?.amount);
      if (_productWithPrices && _productWithPrices.length)
        return {
          '@type': JsonLdTypes.AggregateOffer.toString(),
          priceCurrency: defaultJsonLD.defaultCurrency,
          offerCount: product.length,
          highPrice: _productWithPrices.reduce((prev, current) =>
            prev && prev.price!.list!.amount > current.price!.list!.amount ? prev : current,
          ).price!.list!.amount,
          lowPrice: _productWithPrices.reduce((prev, current) =>
            prev && prev.price!.list!.amount < current.price!.list!.amount ? prev : current,
          ).price!.list!.amount,
          offers: _productWithPrices.map(x => {
            return {
              '@type': JsonLdTypes.Offer.toString(),
              price: x.price!.list!.amount,
              priceCurrency: x.price!.currency ?? defaultJsonLD.defaultCurrency,
              name: x.name,
            };
          }),
        };
    } else {
      const _prod = product as IProductDTO;
      return {
        '@type': JsonLdTypes.Offer.toString(),
        priceCurrency: _prod.price?.currency ?? defaultJsonLD.defaultCurrency,
        price: _prod.price?.list?.amount,
        name: _prod.name,
      };
    }
  }

  buildMasterProduct(product: IProductDTO, defaultJsonLD: any): void {
    const _meta = {
      slug: product.slug ?? defaultJsonLD.name,
      name: product.seoInfo?.pageTitle ?? product.name,
      description: product.seoInfo?.metaDescription ?? product.description ?? defaultJsonLD.description,
      image: product.imgSrc ?? defaultJsonLD.image,
      keywords: product.seoInfo?.metaKeywords ?? product.slug?.replaceAll('/', ',') ?? defaultJsonLD.name,
      brand: product.brandName ?? defaultJsonLD.store,
    };

    const _jsonLd = product.hasVariations
      ? new JsonLd(JsonLdTypes.ProductGroup, _meta.slug, _meta.description, _meta.image)
      : new JsonLd(JsonLdTypes.Product, _meta.name, _meta.description, _meta.image);

    _jsonLd.bindKVPair('keywords', _meta.keywords);
    _jsonLd.bindKVPair('brand', _meta.brand);

    if (product.category)
      _jsonLd.bindKVPair('category', {
        '@context': 'https://schema.org',
        '@type': JsonLdTypes.CategoryCodeSet.toString(),
        '@id': product.category.slug ?? product.slug?.split('/').at(0) ?? defaultJsonLD.name,
        name: product.category.name ?? product.slug?.split('/').at(0) ?? defaultJsonLD.name,
        hasCategoryCode: product.category.slug ?? product.slug ?? product.category.name ?? defaultJsonLD.name,
      });

    if (product.hasVariations && product.variations && product.variations.length) {
      _jsonLd.bindKVPair('offers', this.buildOffer(product.variations, defaultJsonLD));

      const _variantsJsonLd = [];

      const _masterVariantJsonLd = new JsonLd(JsonLdTypes.Product, _meta.name, _meta.description, _meta.image);
      _masterVariantJsonLd.bindKVPair('keywords', _meta.keywords);
      _masterVariantJsonLd.bindKVPair('brand', _meta.brand);
      _masterVariantJsonLd.bindKVPair('offers', this.buildOffer(product, defaultJsonLD));
      _variantsJsonLd.push(_masterVariantJsonLd.getJsonLd());

      product.variations.forEach(v => {
        const _variantMeta = {
          slug: v.slug ?? _meta.name,
          name: v.name ?? _meta.name,
          description: v.name ?? _meta.name,
          image: v.images?.at(0)?.url ?? _meta.image,
          keywords: v.slug?.replaceAll('/', ',') ?? _meta.keywords,
          brand: _meta.brand,
        };
        const _variantJsonLd = new JsonLd(
          JsonLdTypes.Product,
          _variantMeta.name,
          _variantMeta.description,
          _variantMeta.image,
        );
        _variantJsonLd.bindKVPair('keywords', _variantMeta.keywords);
        _variantJsonLd.bindKVPair('offers', this.buildOffer(v, defaultJsonLD));
        _variantJsonLd.bindKVPair('brand', _variantMeta.brand);
        _variantsJsonLd.push(_variantJsonLd.getJsonLd());
      });

      _jsonLd.bindKVPair('hasVariant', _variantsJsonLd);
    } else _jsonLd.bindKVPair('offers', this.buildOffer(product, defaultJsonLD));

    this._jsonLdValue = _jsonLd.build();
  }

  buildAssociatedProducts(
    masterProduct: IProductDTO,
    defaultJsonLD: any,
    associatedProducts: Array<IProductDTO>,
  ): void {
    const _associatedProductsJsonLd: any = [];

    const _meta = {
      slug: masterProduct.slug ?? defaultJsonLD.name,
      name: masterProduct.seoInfo?.pageTitle ?? masterProduct.name,
      description: masterProduct.seoInfo?.metaDescription ?? masterProduct.description ?? defaultJsonLD.description,
      image: masterProduct.imgSrc ?? defaultJsonLD.image,
      brand: masterProduct.brandName ?? defaultJsonLD.store,
    };

    const _jsonLd = new JsonLd(JsonLdTypes.ItemList, _meta.slug, _meta.description, _meta.image);

    _jsonLd.bindKVPair('numberOfItems', masterProduct.associations?.totalCount);

    if (masterProduct.category)
      _jsonLd.bindKVPair('category', {
        '@context': 'https://schema.org',
        '@type': JsonLdTypes.CategoryCodeSet.toString(),
        '@id': masterProduct.category.slug ?? masterProduct.slug?.split('/').at(0) ?? defaultJsonLD.name,
        name: masterProduct.category.name ?? masterProduct.slug?.split('/').at(0) ?? defaultJsonLD.name,
        hasCategoryCode: masterProduct.category.slug ?? masterProduct.category.name ?? defaultJsonLD.name,
      });

    associatedProducts.forEach(associatedProduct => {
      const _associatedMeta = {
        slug: associatedProduct.slug ?? _meta.name,
        name: associatedProduct.seoInfo?.pageTitle ?? associatedProduct.name,
        description: associatedProduct.seoInfo?.metaDescription ?? associatedProduct.description ?? _meta.description,
        image: associatedProduct.imgSrc ?? _meta.image,
        brand: associatedProduct.brandName ?? _meta.brand,
      };

      const _associatedProductJsonLd = new JsonLd(
        JsonLdTypes.Product,
        _associatedMeta.name,
        _associatedMeta.description,
        _associatedMeta.image,
      );
      _associatedProductJsonLd.bindKVPair('brand', _associatedMeta.brand);
      _associatedProductJsonLd.bindKVPair('isRelatedTo', { ..._jsonLd.getJsonLd() });
      _associatedProductJsonLd.bindKVPair('offers', this.buildOffer(associatedProduct, defaultJsonLD));
      _associatedProductsJsonLd.push(_associatedProductJsonLd.getJsonLd());
    });

    _jsonLd.bindKVPair('itemListElement', _associatedProductsJsonLd);
    this._jsonLdValue = _jsonLd.build();
  }
}
