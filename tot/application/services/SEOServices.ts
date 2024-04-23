import { ISEOService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO } from '../types';

export class SEOServices extends ISEOService {
  protected setContext() {
    this._context = new this._repos.SEORepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  getEntityInfoBySlug(slug: string): Promise<Contracts.Result<Array<DTO.ISeoInfoDTO>>> {
    return this._context
      .getObjectInfoBySlug(slug)
      .then(result => result as unknown as Contracts.Result<Array<DTO.ISeoInfoDTO>>);
  }
}
