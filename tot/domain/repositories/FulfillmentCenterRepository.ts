import { FulfillmentCenterConnection } from '../entities';
import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface IFulfillmentCenterRepository extends IEntityBaseRepository {
  getFulfillmentCenters: (
    after?: string,
    first?: number,
    query?: string,
    sort?: string,
    fulfillmentCenterIds?: Array<string>,
  ) => Promise<Result<FulfillmentCenterConnection>>;
}
