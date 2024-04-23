import { IAssetDTO } from './Asset';
import { IAvailabilityDataDTO } from './AvailabilityData';
import { BreadcrumbDTO } from './Breadcrumb';
import { ImageTypeDTO } from './ImageType';
import { IJsonLd } from './JsonLd';
import { IPriceTypeDTO } from './PriceType';
import { IProductAssociationConnectionDTO } from './ProductAssociationConnection';
import { IProductCategoryDTO } from './ProductCategory';
import { IPropertyDTO } from './Property';
import { ISeoInfoDTO } from './SeoInfo';
import { IVariationTypeDTO } from './VariationType';

export interface IProductDTO extends IJsonLd {
  /** Get brandName for product. */
  brandName?: string;
  description?: string;
  /** Product availability data */
  availabilityData?: IAvailabilityDataDTO;
  /** The unique ID of the catalog */
  catalogId?: string;
  category?: IProductCategoryDTO;
  /** Breadcrumbs */
  breadcrumbs?: Array<BreadcrumbDTO>;
  /** The product SKU. */
  code: string;
  hasVariations?: boolean;
  /** The unique ID of the product. */
  id: string;
  /** Product images */
  images?: Array<ImageTypeDTO>;
  /** The product main image URL. */
  imgSrc?: string;
  /** Product added at least in one wishlist */
  inWishlist: boolean;
  /** Max. quantity */
  maxQuantity?: number;
  /** Min. quantity */
  minQuantity?: number;
  /** The name of the product. */
  name: string;
  /** The outer identifier */
  outerId?: string;
  /** All parent categories ids relative to the requested catalog and concatenated with \ . E.g. (1/21/344) */
  outline?: string;
  /** The type of product */
  productType?: string;
  properties?: Array<IPropertyDTO>;
  /** Request related SEO info */
  seoInfo?: ISeoInfoDTO;
  /** Request related slug for product */
  slug?: string;
  /** Minimim product variation price */
  minVariationPrice?: IPriceTypeDTO;
  /** Product price */
  price?: IPriceTypeDTO;
  /** Product prices */
  prices?: Array<IPriceTypeDTO>;
  listFormattedPrice?: string;
  masterVariation?: IVariationTypeDTO;
  variations?: Array<IVariationTypeDTO>;
  /** Assets */
  assets?: Array<IAssetDTO>;
  associations?: IProductAssociationConnectionDTO;
  review?: { value: number; reviewCount: number };
  isInInventory: boolean;
  inventoryAvailableQuantity: number;
}
export type IProductFiltersDTO = Omit<
  IProductDTO,
  | 'inventoryAvailableQuantity'
  | 'isInInventory'
  | 'review'
  | 'associations'
  | 'assets'
  | 'variations'
  | 'masterVariation'
  | 'prices'
  | 'price'
  | 'minVariationPrice'
  | 'seoInfo'
  | 'properties'
  | 'images'
  | 'availabilityData'
  | 'category'
  | 'breadcrumbs'
>;
