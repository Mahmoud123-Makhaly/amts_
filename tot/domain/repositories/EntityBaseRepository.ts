import { IBaseRepository } from './BaseRepository';
import { IClient } from './Client';

export abstract class IEntityBaseRepository implements IBaseRepository {
  protected readonly _context: IClient;
  /**The store id where products are searched */
  protected readonly storeId?: string;
  protected readonly catalogId?: string;
  /**The culture name for cart context product */
  protected readonly cultureName?: string;
  /**The currency for which all prices data will be returned */
  protected readonly currencyCode?: string;
  /**The customer id for search result impersonation */
  protected readonly userId?: string;
  protected readonly apiKey?: string;

  constructor(
    context: IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
    apiKey?: string,
  ) {
    this._context = context;
    this.storeId = storeId;
    this.catalogId = catalogId;
    this.userId = userId;
    this.cultureName = cultureName;
    this.currencyCode = currencyCode;
    this.apiKey = apiKey;
  }
}
