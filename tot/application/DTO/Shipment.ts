import {
  IMemberAddressDTO,
  IDiscountTypeDTO,
  ICurrencyTypeDTO,
  IMoneyTypeDTO,
  IDynamicPropertyValueTypeDTO,
  ITaxDetailTypeDTO,
  ICommonVendorDTO,
  ILineItemTypeDTO,
} from './index';

export interface IShippingMethodTypeDTO {
  /** Value of shipping gateway code */
  code?: string;
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Shipping method description */
  description?: string;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  id?: string;
  /** Value of shipping method logo absolute URL */
  logoUrl?: string;
  /** Shipping method name */
  name?: string;
  /** Value of shipping method option description */
  optionDescription?: string;
  /** Value of shipping method option name */
  optionName?: string;
  /** Price */
  price?: IMoneyTypeDTO;
  /** Price with tax */
  priceWithTax?: IMoneyTypeDTO;
  /** Value of shipping method priority */
  priority?: number;
  /** Total */
  total?: IMoneyTypeDTO;
  /** Total with tax */
  totalWithTax?: IMoneyTypeDTO;
}

export type CartShipmentItemType = {
  lineItem?: ILineItemTypeDTO;
  /** Quantity */
  quantity?: number;
};

export interface IShipmentTypeDTO {
  /** Text comment */
  comment?: string;
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Delivery address */
  deliveryAddress?: IMemberAddressDTO;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  /** Discounts */
  discounts?: Array<IDiscountTypeDTO>;
  /** Cart shipment dynamic property values */
  dynamicProperties?: Array<IDynamicPropertyValueTypeDTO>;
  /** Fulfillment center id */
  fulfillmentCenterId?: string;
  /** Value of height */
  height?: number;
  /** Shipment Id */
  id?: string;
  /** Items */
  items?: Array<CartShipmentItemType>;
  /** Value of length */
  length?: number;
  /** Value of measurement units */
  measureUnit?: string;
  /** Price */
  price?: IMoneyTypeDTO;
  /** Price with tax */
  priceWithTax?: IMoneyTypeDTO;
  /** Shipment method code */
  shipmentMethodCode?: string;
  /** Shipment method option */
  shipmentMethodOption?: string;
  shippingMethod?: IShippingMethodTypeDTO;
  /** Tax details */
  taxDetails?: Array<ITaxDetailTypeDTO>;
  /** Tax percent rate */
  taxPercentRate?: number;
  /** Tax total */
  taxTotal?: IMoneyTypeDTO;
  /** Tax type */
  taxType?: string;
  /** Total */
  total?: IMoneyTypeDTO;
  /** Total with tax */
  totalWithTax?: IMoneyTypeDTO;
  vendor?: ICommonVendorDTO;
  /** Value of volumetric weight */
  volumetricWeight?: number;
  /** Value of weight */
  weight?: number;
  /** Value of weight unit */
  weightUnit?: string;
  /** Value of width */
  width?: number;
  /** status */
  status: string;
  /** Delivery Date */
  deliveryDate: Date;
}
