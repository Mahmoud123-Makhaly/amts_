import { IRepositories, Models, Entities } from '../../../domain';
import { GET_FULFILLMENT_CENTERS } from './documents';
export class FulfillmentCenterRepository
  extends IRepositories.IEntityBaseRepository
  implements IRepositories.IFulfillmentCenterRepository
{
  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId);
  }
  getFulfillmentCenters = (
    after?: string | undefined,
    first?: number | undefined,
    query?: string | undefined,
    sort?: string | undefined,
    fulfillmentCenterIds?: string[] | undefined,
  ): Promise<Models.Result<Entities.FulfillmentCenterConnection>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'fulfillmentCenters'>>, Entities.QueryFulfillmentCentersArgs>({
        query: GET_FULFILLMENT_CENTERS,
        variables: {
          storeId: this.storeId,
          after,
          first,
          query,
          sort,
          fulfillmentCenterIds,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'FulfillmentCenterRepository.getFulfillmentCenters',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.FulfillmentCenterConnection>;
        } else {
          return { data: result.data?.fulfillmentCenters } as Models.Result<Entities.FulfillmentCenterConnection>;
        }
      });
  };
}
