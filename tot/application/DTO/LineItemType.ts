import {
  ICommonVendorDTO,
  IDynamicPropertyValueTypeDTO,
  IProductDTO,
  IDiscountTypeDTO,
  IMoneyTypeDTO,
  ITaxDetailTypeDTO,
  IValidationErrorTypeDTO,
} from './index';

export interface ILineItemTypeDTO {
  /** Catalog ID value */
  catalogId?: string;
  /** Category ID value */
  categoryId?: string;
  /** Line item create date */
  createdDate?: Date;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  /** Total discount */
  discountTotal?: IMoneyTypeDTO;
  /** Total discount with tax */
  discountTotalWithTax?: IMoneyTypeDTO;
  /** Discounts */
  discounts?: Array<IDiscountTypeDTO>;
  /** Cart line item dynamic property values */
  dynamicProperties?: Array<IDynamicPropertyValueTypeDTO>;
  /** Extended price */
  extendedPrice?: IMoneyTypeDTO;
  /** Extended price with tax */
  extendedPriceWithTax?: IMoneyTypeDTO;
  /** Line item fulfillment center ID value */
  fulfillmentCenterId?: string;
  /** Line item fulfillment center name value */
  fulfillmentCenterName?: string;
  /** Height value */
  height?: number;
  /** Line item ID */
  id: string;
  /** Value of line item image absolute URL */
  imageUrl?: string;
  /** In stock quantity */
  inStockQuantity?: number;
  /** flag of line item is a gift */
  isGift?: boolean;
  /** Shows whether this is read-only */
  isReadOnly?: boolean;
  /** Shows whether the line item is recurring */
  isReccuring?: boolean;
  /** Shows whether this is valid */
  isValid?: boolean;
  /** Culture name in the ISO 3166-1 alpha-3 format */
  languageCode?: string;
  /** Length value */
  length?: number;
  /** List price */
  listPrice?: IMoneyTypeDTO;
  /** List price with tax */
  listPriceWithTax?: IMoneyTypeDTO;
  /** Measurement unit value */
  measureUnit?: string;
  /** Line item name value */
  name?: string;
  /** Line item comment value */
  note?: string;
  /** Line item quantity value */
  objectType?: string;
  /** Placed price */
  placedPrice?: IMoneyTypeDTO;
  /** Placed price with tax */
  placedPriceWithTax?: IMoneyTypeDTO;
  product?: IProductDTO;
  /** Product ID value */
  productId?: string;
  /** Product type: Physical, Digital, or Subscription */
  productType?: string;
  /** Line item quantity value */
  quantity?: number;
  /** Requirement for line item shipping */
  requiredShipping?: boolean;
  /** Sale price */
  salePrice?: IMoneyTypeDTO;
  /** Sale price with tax */
  salePriceWithTax?: IMoneyTypeDTO;
  /** Line item shipping method code value */
  shipmentMethodCode?: string;
  /** Product SKU value */
  sku?: string;
  /** Product status value */
  status?: string;
  /** Tax details */
  taxDetails?: Array<ITaxDetailTypeDTO>;
  /** Total shipping tax amount value */
  taxPercentRate?: number;
  /** Tax total */
  taxTotal?: IMoneyTypeDTO;
  /** Shipping tax type value */
  taxType?: string;
  /** Value of line item thumbnail image absolute URL */
  thumbnailImageUrl?: string;
  /** Validation errors */
  validationErrors?: Array<IValidationErrorTypeDTO>;
  vendor?: ICommonVendorDTO;
  /** Volumetric weight value */
  volumetricWeight?: number;
  /** Warehouse location */
  warehouseLocation?: string;
  /** Shopping cart weight value */
  weight?: number;
  /** Weight unit value */
  weightUnit?: string;
  /** Width value */
  width?: number;
}
export interface IProductLineItemTypeDTO extends Omit<IProductDTO, 'variations'> {
  lineItemId?: string;
  quantity?: number;
}
export interface IProductLineItemsTypeDTO {
  variations?: Array<IProductLineItemTypeDTO>;
}
