import { IAddressDTO } from './Address';

export interface IMemberAddressDTO extends Omit<IAddressDTO, 'line1' | 'line2'> {
  /**
   * Line1 and Readonly
   * @readonly
   * @const {string}
   */
  formattedAddress?: string;
  address: string;
  building: string;
  floor: string;
  flat: string;
}
