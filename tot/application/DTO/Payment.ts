import {
  IDynamicPropertyValueTypeDTO,
  ICurrencyTypeDTO,
  IDiscountTypeDTO,
  IMoneyTypeDTO,
  IMemberAddressDTO,
  ITaxDetailTypeDTO,
  ICommonVendorDTO,
} from './index';

export interface IPaymentMethodTypeDTO {
  /** Value of payment gateway code */
  code?: string;
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Payment method description */
  description?: string;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  /** Is payment method available for partial payments */
  isAvailableForPartial?: boolean;
  /** Value of payment method logo absolute URL */
  logoUrl?: string;
  /** Value of payment method name */
  name?: string;
  /** Value of payment group type */
  paymentMethodGroupType?: string;
  /** Value of payment method type */
  paymentMethodType?: string;
  /** Price */
  price?: IMoneyTypeDTO;
  /** Price with tax */
  priceWithTax?: IMoneyTypeDTO;
  /** Value of payment method priority */
  priority?: number;
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
}

export interface ICartPaymentTypeDTO {
  /** Amount */
  amount?: IMoneyTypeDTO;
  /** Billing address */
  billingAddress?: IMemberAddressDTO;
  /** Text comment */
  comment?: string;
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Discount amount */
  discountAmount?: IMoneyTypeDTO;
  /** Discount amount with tax */
  discountAmountWithTax?: IMoneyTypeDTO;
  /** Discounts */
  discounts?: Array<IDiscountTypeDTO>;
  /** Cart payment dynamic property values */
  dynamicProperties?: Array<IDynamicPropertyValueTypeDTO>;
  /** Payment Id */
  id?: string;
  /** Value of payment outer id */
  outerId?: string;
  /** Value of payment gateway code */
  paymentGatewayCode?: string;
  /** Price */
  price?: IMoneyTypeDTO;
  /** Price with tax */
  priceWithTax?: IMoneyTypeDTO;
  purpose?: string;
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
}
