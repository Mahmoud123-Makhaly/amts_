import * as DTO from '../DTO/index';
import { InputDynamicPropertyValueType } from './index';

export interface InputShipmentAddressDTO extends Omit<DTO.IMemberAddressDTO, 'isDefault'> {}

export type InputShipmentType = {
  /** Text comment */
  comment?: string;
  /** Currency value */
  currency?: string;
  /** Delivery address */
  deliveryAddress?: InputShipmentAddressDTO;
  /** Dynamic properties */
  dynamicProperties?: Array<InputDynamicPropertyValueType>;
  /** Fulfillment center iD */
  fulfillmentCenterId?: string;
  /** Height value */
  height?: number;
  /** Shipment ID */
  id?: string;
  /** Length value */
  length?: number;
  /** Measurement unit value */
  measureUnit?: string;
  /** Price value */
  price?: number;
  /** Shipping method code */
  shipmentMethodCode?: string;
  /** Shipping method option */
  shipmentMethodOption?: string;
  /** Vendor ID */
  vendorId?: string;
  /** Volumetric weight value */
  volumetricWeight?: number;
  /** Weight value */
  weight?: number;
  /** Weight unit value */
  weightUnit?: string;
  /** Width value */
  width?: number;
};
