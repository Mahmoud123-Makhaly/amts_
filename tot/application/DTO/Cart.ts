import {
  IAddressDTO,
  IShippingMethodTypeDTO,
  IDynamicPropertyValueTypeDTO,
  IPaymentMethodTypeDTO,
  ICurrencyTypeDTO,
  IDiscountTypeDTO,
  IMoneyTypeDTO,
  ICartPaymentTypeDTO,
  ITaxDetailTypeDTO,
  IValidationErrorTypeDTO,
  ILineItemTypeDTO,
  IShipmentTypeDTO,
  IMemberAddressDTO,
  IProductLineItemsTypeDTO,
} from './index';

export interface IProductQuantityValidatorDTO {
  data: boolean;
  error: Array<{
    id?: string | undefined;
    name?: string | undefined;
    availableQuantity?: number | undefined;
  }>;
}

export interface ICartDTO {
  /** Available Gifts */
  // availableGifts?: Maybe<Array<Maybe<GiftItemType>>>;
  /** Gifts */
  // gifts?: Maybe<Array<Maybe<GiftItemType>>>;
  /** Coupons */
  // coupons?: Maybe<Array<Maybe<CouponType>>>;
  //
  /** Addresses */
  addresses?: Array<IMemberAddressDTO>;
  /** Available payment methods */
  availablePaymentMethods?: Array<IPaymentMethodTypeDTO>;
  /** Available shipping methods */
  availableShippingMethods?: Array<IShippingMethodTypeDTO>;
  /** Shopping cart channel ID */
  channelId?: string;
  /** Shopping cart text comment */
  comment?: string;
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Shopping cart user ID */
  customerId?: string;
  /** Shopping cart user name */
  customerName?: string;
  /** Total discount */
  discountTotal?: IMoneyTypeDTO;
  /** Total discount with tax */
  discountTotalWithTax?: IMoneyTypeDTO;
  /** Discounts */
  discounts?: Array<IDiscountTypeDTO>;
  /** Cart dynamic property values */
  dynamicProperties?: Array<IDynamicPropertyValueTypeDTO>;
  /** Total extended price */
  extendedPriceTotal?: IMoneyTypeDTO;
  /** Total extended price with tax */
  extendedPriceTotalWithTax?: IMoneyTypeDTO;
  fee?: IMoneyTypeDTO;
  /** Total handling */
  handlingTotal?: IMoneyTypeDTO;
  /** Total handling with tax */
  handlingTotalWithTax?: IMoneyTypeDTO;
  /** Has physical products */
  hasPhysicalProducts?: boolean;
  /** Shopping cart ID */
  id?: string;
  /** Displays whether the shopping cart is anonymous */
  isAnonymous?: boolean;
  /** Displays whether the shopping cart is recurring */
  isRecuring?: boolean;
  /**
   * Shows whether the cart is valid
   * @deprecated Deprecated, because of useless (no need to know validation state without details). Use validationErrors field.
   */
  isValid?: boolean;
  /** Items */
  items?: Array<ILineItemTypeDTO>;
  /** Item count */
  itemsCount?: number;
  /** Quantity of items */
  itemsQuantity?: number;
  /** Shopping cart name */
  name: string;
  /** Shopping cart organization ID */
  organizationId?: string;
  /** Payment price */
  paymentPrice?: IMoneyTypeDTO;
  /** Payment price with tax */
  paymentPriceWithTax?: IMoneyTypeDTO;
  /** Total payment */
  paymentTotal?: IMoneyTypeDTO;
  /** Total payment with tax */
  paymentTotalWithTax?: IMoneyTypeDTO;
  /** Payments */
  payments?: Array<ICartPaymentTypeDTO>;
  /** Purchase order number */
  purchaseOrderNumber?: string;
  /** Shipments */
  shipments?: Array<IShipmentTypeDTO>;
  /** Shipping price */
  shippingPrice?: IMoneyTypeDTO;
  /** Shipping price with tax */
  shippingPriceWithTax?: IMoneyTypeDTO;
  /** Total shipping */
  shippingTotal?: IMoneyTypeDTO;
  /** Total shipping with tax */
  shippingTotalWithTax?: IMoneyTypeDTO;
  /** Shopping cart status */
  status?: string;
  /** Shopping cart store ID */
  storeId?: string;
  /** Shopping cart subtotal */
  subTotal?: IMoneyTypeDTO;
  /** Subtotal discount */
  subTotalDiscount?: IMoneyTypeDTO;
  /** Subtotal discount with tax */
  subTotalDiscountWithTax?: IMoneyTypeDTO;
  /** Subtotal with tax */
  subTotalWithTax?: IMoneyTypeDTO;
  /** Tax details */
  taxDetails?: Array<ITaxDetailTypeDTO>;
  /** Tax percentage */
  taxPercentRate?: number;
  /** Total tax */
  taxTotal?: IMoneyTypeDTO;
  /** Shipping tax type */
  taxType?: string;
  /** Shopping cart total */
  total?: IMoneyTypeDTO;
  /** Shopping cart type */
  type?: string;
  /** A set of errors in case the cart is invalid */
  validationErrors?: Array<IValidationErrorTypeDTO>;
  /** Shopping cart volumetric weight value */
  volumetricWeight?: number;
  /** A set of temporary warnings for a cart user */
  warnings?: Array<IValidationErrorTypeDTO>;
  /** Shopping cart weight value */
  weight?: number;
  /** Shopping cart weight unit value */
  weightUnit?: string;
  isValidInventoryQuantity?: IProductQuantityValidatorDTO;
}
export interface IGroupedProductsCartDTO extends ICartDTO {
  products?: Array<IProductLineItemsTypeDTO>;
}
