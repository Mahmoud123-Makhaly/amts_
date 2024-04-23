import { EntityInfo } from '../entities';
import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface ISEORepository extends IEntityBaseRepository {
  getObjectInfoBySlug: (slug: string) => Promise<Result<Array<EntityInfo>>>;
}
