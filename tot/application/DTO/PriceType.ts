export interface ICurrencyTypeDTO {
  /** Currency code may be used ISO 4217 */
  code: string;
  /** Currency custom formatting */
  customFormatting?: string;
  /** Exchange rate */
  exchangeRate?: number;
  /** Symbol */
  symbol?: string;
}

export interface IMoneyTypeDTO {
  /** A decimal with the amount rounded to the significant number of decimal digits. */
  amount: number;
  /** Currency type */
  currency?: ICurrencyTypeDTO;
  /** Number of decimal digits for the associated currency. */
  decimalDigits: number;
  /** Formatted amount. */
  formattedAmount: string;
  /** Formatted amount without currency. */
  formattedAmountWithoutCurrency: string;
  /** Formatted amount without point. */
  formattedAmountWithoutPoint: string;
  /** Formatted amount without point and currency. */
  formattedAmountWithoutPointAndCurrency: string;
}

export interface ITierPriceTypeDTO {
  /** Price */
  price?: IMoneyTypeDTO;
  /** Price with tax */
  priceWithTax?: IMoneyTypeDTO;
  /** Quantity */
  quantity?: number;
}

export interface IPromotionDTO {
  /** Promotion description */
  description?: string;
  /** The unique ID of the promotion. */
  id: string;
  /** The name of the promotion */
  name: string;
  /** Promotion type */
  type?: string;
}

export interface IDiscountTypeDTO {
  /** Discount amount */
  amount?: number;
  /** Discount amount with tax */
  amountWithTax?: number;
  /** Coupon */
  coupon?: string;
  /** Value of discount description */
  description?: string;
  /** Discount amount in the specified currency */
  moneyAmount?: IMoneyTypeDTO;
  /** Discount amount with tax in the specified currency */
  moneyAmountWithTax?: IMoneyTypeDTO;
  promotion?: IPromotionDTO;
  /** Value of promotion id */
  promotionId?: string;
}

export interface IPriceTypeDTO {
  /** Actual price */
  actual?: IMoneyTypeDTO;
  /** Actual price with tax */
  actualWithTax?: IMoneyTypeDTO;
  /** Currency */
  currency?: string;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  discountPercent?: number;
  /** Discounts */
  discounts?: Array<IDiscountTypeDTO>;
  /** End date */
  endDate?: Date;
  /** Price list */
  list?: IMoneyTypeDTO;
  /** Price list with tax */
  listWithTax?: IMoneyTypeDTO;
  /** The product min qty */
  minQuantity?: number;
  /** The product price list */
  pricelistId?: string;
  /** Sale price */
  sale?: IMoneyTypeDTO;
  /** Sale price with tax */
  saleWithTax?: IMoneyTypeDTO;
  /** Start date */
  startDate?: Date;
  /** Tier prices */
  tierPrices?: Array<ITierPriceTypeDTO>;
}

export interface ITaxDetailTypeDTO {
  /** Amount */
  amount?: IMoneyTypeDTO;
  /** Name */
  name?: string;
  /** Price */
  price?: IMoneyTypeDTO;
  /** Rate */
  rate?: IMoneyTypeDTO;
};
