import { IAddressDTO } from './Address';

export interface IFulfillmentCenterAddressDTO extends Partial<IAddressDTO> {}

export interface IFulfillmentCenterDTO {
  /** Fulfillment Center address. */
  address?: IFulfillmentCenterAddressDTO;
  /** Fulfillment Center description. */
  description?: string;
  /** Fulfillment Center geo location. */
  geoLocation?: string;
  /** Fulfillment Center ID. */
  id: string;
  /** Fulfillment Center name. */
  name?: string;
  /** Nearest Fulfillment Centers */
  nearest?: Array<IFulfillmentCenterDTO>;
  /** Fulfillment Center outerId. */
  outerId?: string;
  /** Fulfillment Center short description. */
  shortDescription?: string;
}
