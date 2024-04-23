import { IRepositories } from '../../domain';
import { ISeoInfoDTO } from '../DTO';
import { IBaseService } from './BaseService';
import { Result } from './Result';

export abstract class ISEOService extends IBaseService<IRepositories.ISEORepository> {
  abstract getEntityInfoBySlug(slug: string): Promise<Result<Array<ISeoInfoDTO>>>;
}
