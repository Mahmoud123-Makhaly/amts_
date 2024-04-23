export interface IAddressDTO {
  addressType?: number;
  /** City */
  city: string;
  /** Country code */
  countryCode: string;
  /** Country name */
  countryName?: string;
  /** Description */
  description?: string;
  /** Email */
  email?: string;
  /** First name */
  firstName?: string;
  /** Id */
  id?: string;
  /** Is default address or not */
  isDefault: boolean;
  /** Id */
  key?: string;
  /** Last name */
  lastName?: string;
  /** Line1 */
  line1?: string;
  /** Line2 */
  line2?: string;
  /** Middle name */
  middleName?: string;
  /** Name */
  name?: string;
  /** Company name */
  organization?: string;
  /** Outer id */
  outerId?: string;
  /** Phone */
  phone?: string;
  /** Postal code */
  postalCode: string;
  /** Region id */
  regionId?: string;
  /** Region name */
  regionName?: string;
  /** Zip */
  zip?: string;
}
