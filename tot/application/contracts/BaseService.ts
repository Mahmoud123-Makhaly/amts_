import { IRepositories } from '../../domain';
import { RepositoryInstanceType } from '../../infrastructure';

import { IConfiguration } from './Configuration';
import { Result } from './Result';

export abstract class IBaseService<T extends IRepositories.IEntityBaseRepository> {
  protected _context!: T;
  protected readonly _configurations: IConfiguration;
  protected readonly _repos: RepositoryInstanceType;
  protected readonly _client: IRepositories.IClient;

  constructor(configuration: IConfiguration, repos: RepositoryInstanceType, client: IRepositories.IClient) {
    this._configurations = configuration;
    this._client = client;
    this._repos = repos;
    this.setContext();
  }
  protected abstract setContext(): void;

  protected checkUserAuthenticity = <R>(moduleName: string): Promise<Result<R>> => {
    return new Promise(resolve =>
      resolve(
        this._configurations.user?.id
          ? ({ data: true } as Result<R>)
          : ({
              error: {
                code: moduleName,
                message: 'Unauthorized action',
              },
            } as Result<R>),
      ),
    );
  };
}
