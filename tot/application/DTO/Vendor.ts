import { IMemberAddressDTO } from './MemberAddress';
import { IDynamicPropertyValueTypeDTO } from './Property';
import { IRatingDTO } from './Rating';
import { ISeoInfoDTO } from './SeoInfo';

export interface ICommonVendorDTO {
  /** Vendor ID */
  id: string;
  /** Vendor name */
  name: string;
  /** Vendor rating */
  rating?: IRatingDTO;
}
/** Vendor Info */
export interface IVendorDTO {
  /** About vendor */
  about?: string;
  //TODO: check address for vendor
  //addresses?: Maybe<MemberAddressConnection>;
  /** Default billing address */
  defaultBillingAddress?: IMemberAddressDTO;
  /** Default shipping address */
  defaultShippingAddress?: IMemberAddressDTO;
  /** Dynamic property values */
  dynamicProperties: Array<IDynamicPropertyValueTypeDTO>;
  /** Emails */
  emails: Array<string>;
  groups: Array<string>;
  /** Icon URL */
  iconUrl?: string;
  id: string;
  /** Member type */
  memberType: string;
  /** Name */
  name?: string;
  /** Outer ID */
  outerId?: string;
  /** Phones */
  phones: Array<string>;
  /** Vendor rating */
  rating?: IRatingDTO;
  /** Request related SEO info */
  seoInfo?: ISeoInfoDTO;
  /** SEO object type */
  seoObjectType: string;
  /** Site URL */
  siteUrl?: string;
  /** Status */
  status?: string;
}
