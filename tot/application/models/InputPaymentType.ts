import * as DTO from '../DTO/index';
import { InputDynamicPropertyValueType } from './index';

export interface InputPaymentTypeAddressDTO extends Omit<DTO.IMemberAddressDTO, 'isDefault'> {}

export type InputPaymentType = {
  amount?: number;
  billingAddress?: InputPaymentTypeAddressDTO;
  /** Text comment */
  comment?: string;
  currency?: string;
  /** Dynamic properties */
  dynamicProperties?: Array<InputDynamicPropertyValueType>;
  /** Payment ID */
  id?: string;
  /** Payment outer ID value */
  outerId?: string;
  /** Payment gateway code value */
  paymentGatewayCode?: string;
  price?: number;
  purpose?: string;
  vendorId?: string;
};
