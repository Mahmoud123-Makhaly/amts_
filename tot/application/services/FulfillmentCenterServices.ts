import { IFulfillmentCenterService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO, Models } from '../types';

export class FulfillmentCenterServices extends IFulfillmentCenterService {
  protected setContext(): void {
    this._context = new this._repos.FulfillmentCenterRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }
  getFulfillmentCenters(
    after?: string | undefined,
    first?: number | undefined,
    query?: string | undefined,
    sort?: string | undefined,
    fulfillmentCenterIds?: string[] | undefined,
  ): Promise<Contracts.Result<DTO.IFulfillmentCenterConnectionDTO>> {
    return this._context.getFulfillmentCenters(after, first, query, sort, fulfillmentCenterIds).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'FulfillmentCenterService.getFulfillmentCenters',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IFulfillmentCenterConnectionDTO>;
      } else {
        const res: DTO.IFulfillmentCenterConnectionDTO = {
          pageInfo: result.data.pageInfo,
          items: result.data.items,
          totalCount: result.data.totalCount,
        };
        return { data: res } as Contracts.Result<DTO.IFulfillmentCenterConnectionDTO>;
      }
    });
  }
}
