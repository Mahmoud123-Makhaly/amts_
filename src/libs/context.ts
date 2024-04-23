import { getLocale } from 'next-intl/server';
import { getServerSession } from 'next-auth';

import { ServiceFactory } from '@tot/core';
import { env } from '@libs';
import { DTO, Models } from '@tot/core/types';

import { Utils } from './utils';
import authOptions from '@auth';

export class Context {
  public _services?: ServiceFactory;
  private _currency: Models.Currencies = Utils.valueToEnum(
    Models.Currencies,
    env.DEFAULT_CURRENCY,
  ) as unknown as Models.Currencies;

  constructor() {}

  private async getCurrentCultureName(): Promise<Models.CultureNames> {
    const locale = await getLocale();
    const defaultCultureName = Utils.valueToEnum(
      Models.CultureNames,
      env.DEFAULT_CULTURE_NAME,
    ) as unknown as Models.CultureNames;

    if (locale) {
      return locale === 'ar' ? Models.CultureNames.EG : Models.CultureNames.US;
    } else return defaultCultureName;
  }

  public setCurrency(currency: Models.Currencies) {
    this._currency = currency;
  }

  public async buildServiceContext(accessToken?: string, userId?: string): Promise<Context> {
    const session = await getServerSession(authOptions);
    const cultureName = await this.getCurrentCultureName();

    let user: DTO.IUserDTO | undefined = session?.user;
    if (!user && userId) {
      user = {
        id: userId,
        userName: 'Guest',
        emailConfirmed: false,
        forcePasswordChange: false,
        isAdministrator: false,
        lockedState: false,
        lockoutEnabled: false,
        passwordExpired: false,
        accessFailedCount: 0,
        twoFactorEnabled: false,
      } as DTO.IUserDTO;
    }

    this._services = new ServiceFactory({
      basePath: env.API_BASE_URL,
      client: Utils.valueToEnum(Models.ClientTypes, env.API_TYPE) as unknown as Models.ClientTypes,
      isMultipleWarehouse: env.IS_MULTIPLE_WAREHOUSE,
      defaultCultureName: cultureName,
      defaultCurrency: this._currency,
      stockMode: env.STOCK_MODE,
      selectedStoreId: env.STORE_ID,
      selectedCatalogId: env.CATALOG_ID,
      accessToken: session?.jwt?.accessToken ?? accessToken,
      user,
      resetPasswordWebHook: env.RESET_PASSWORD_WEB_HOOK,
      hashSignSecret: env.HASH_SECRET,
      reviewsMode: env.REVIEWS_MODE,
      checkoutProcessMode: 'AllSettled',
      checkoutProcesses: ['InventoryStock'],
      apiKey: env.API_KEY,
    })
      .registerProductServices()
      .registerAccountServices()
      .registerFulfillmentCenterServices()
      .registerCartServices()
      .registerPaymentServices()
      .registerIntegrationServices();

    return this;
  }
}
