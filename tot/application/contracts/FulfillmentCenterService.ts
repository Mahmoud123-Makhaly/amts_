import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';
import { DTO } from '../types';

export abstract class IFulfillmentCenterService extends IBaseService<IRepositories.IFulfillmentCenterRepository> {
  abstract getFulfillmentCenters(
    after?: string,
    first?: number,
    query?: string,
    sort?: string,
    fulfillmentCenterIds?: Array<string>,
  ): Promise<Result<DTO.IFulfillmentCenterConnectionDTO>>;
}
