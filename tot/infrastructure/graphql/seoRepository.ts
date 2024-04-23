import { IRepositories, Models, Entities } from '../../domain';

import { GraphQLClient } from './graphqlClient';

export class SEORepository extends IRepositories.IEntityBaseRepository implements IRepositories.ISEORepository {
  private _restClient = (this._context as GraphQLClient)._restContext;
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
  getObjectInfoBySlug = (slug: string): Promise<Models.Result<Array<Entities.EntityInfo>>> => {
    return this._restClient
      .get<Array<Entities.EntityInfo>>({
        segmentPath: `api/seoinfos/${slug}`,
        culture: this.cultureName,
      })
      .then(result => {
        if (result.data) {
          return { data: result.data } as Models.Result<Array<Entities.EntityInfo>>;
        } else {
          return {
            error: {
              code: 'SEORepository.getObjectInfoBySlug',
              message: result.error.message,
              trace: [result.error],
            },
          } as Models.Result<Array<Entities.EntityInfo>>;
        }
      });
  };
}
