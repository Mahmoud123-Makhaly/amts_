/**
 * Defines two interfaces, `IApplicationConfiguration` and `ISecurityConfiguration`, and extends them to create a new interface called `IConfiguration`.
 *
 * @interface IApplicationConfiguration
 * @interface ISecurityConfiguration
 * @interface IConfiguration
 */
import { DTO, Models } from '../types';
export interface IApplicationConfiguration {
  /**
   * parameter to identify the type of client would be used for fetching data
   *
   * @type {Models.ClientTypes}
   * @memberof IApplicationConfiguration
   */
  client: Models.ClientTypes;
  /**
   * parameter to determine if the store is multiple or single warehouse
   *
   * @type {boolean}
   * @memberof IApplicationConfiguration
   */
  isMultipleWarehouse: boolean;
  /**
   * parameter to determine the default culture name
   *
   * @type {Models.CultureNames}
   * @memberof IApplicationConfiguration
   */
  defaultCultureName: Models.CultureNames;
  /**
   * parameter to determine the default currency
   *
   * @type {Models.Currencies}
   * @memberof IApplicationConfiguration
   */
  defaultCurrency: Models.Currencies;
  /**
   * parameter to determine how can system will deal with out of stock products
   *
   * @type {'inStock' | 'All' | 'inStockDescending'}
   * @memberof IApplicationConfiguration
   */
  stockMode: 'inStock' | 'All' | 'inStockDescending';
  /**
   * parameter to determine business rely on specific store id
   *
   * @type {string | undefined}
   * @memberof IApplicationConfiguration
   */
  selectedStoreId: string | undefined;
  /**
   * parameter to determine business rely on specific catalog id
   *
   * @type {string | undefined}
   * @memberof IApplicationConfiguration
   */
  selectedCatalogId: string | undefined;
  /**
   * parameter that will used to validate the request reset password recovery link hash and state
   * @type {(string | undefined)}
   * @memberof IApplicationConfiguration
   */
  resetPasswordWebHook?: string | undefined;
  /**
   * secret that is going to be used to sign and encrypt hashes
   * @type {(string | undefined)}
   * @memberof IApplicationConfiguration
   */
  hashSignSecret?: string | undefined;
  /**
   * a flag aims to detect if the application either supports a wish list single or multiple mode
   * @type {(boolean | undefined)}
   * @memberof IApplicationConfiguration
   */
  supportMultipleWithLists?: boolean;
  /**
   * a flag aims to detect what reviews' statuses are supported by the app UI.
   * If it is set to All, then all reviews will be shown in UI.
   * If it is set to Approved, only approved reviews will be shown in UI.
   * If it is set to None, no reviews will be shown in UI.
   * If it is set to Accepted, only not rejected reviews will be shown in UI.
   *
   * @type {'All' | 'Approved' | 'Accepted' | 'None'}
   * @memberof IApplicationConfiguration
   */
  reviewsMode: 'All' | 'Approved' | 'Accepted' | 'None';
  checkoutProcessMode: 'AllSettled' | 'IfAny';
  checkoutProcesses?: Array<'InventoryStock'>;
}

export interface ISecurityConfiguration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof ISecurityConfiguration
   */
  apiKey?: string;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof ISecurityConfiguration
   */
  user?: DTO.IUserDTO;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof ISecurityConfiguration
   */
  password?: string;
  /**
   * parameter for oauth2 security
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof ISecurityConfiguration
   */
  accessToken?: string;
  /**
   * parameter for oauth2 security
   * @memberof ISecurityConfiguration
   */
  refreshToken?: string | Promise<string>;
  /**
   * base path
   *
   * @type {string}
   * @memberof ISecurityConfiguration
   */
  basePath: string;
  /**
   * base options for client calls
   *
   * @type {any}
   * @memberof ISecurityConfiguration
   */
  baseOptions?: any;
}

export interface IConfiguration extends IApplicationConfiguration, ISecurityConfiguration {}
