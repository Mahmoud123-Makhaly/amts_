import { Result } from '../models';
import { IBaseRepository } from './BaseRepository';

export abstract class IClient<T = unknown> implements IBaseRepository {
  protected readonly uri: string;
  protected readonly token?: string;
  protected abstract readonly _context: T;

  constructor(uri: string, token?: string) {
    this.uri = uri;
    this.token = token;
  }

  protected abstract setupBearerClient(uri: string, token?: string): T;

  protected abstract setupPublicClient(uri: string): T;

  /**
   * This resolves a single query according to the options specified and
   * returns a `Promise` which is either resolved with the resulting data
   * or rejected with an error.
   *
   * @param options - An object of type {@link QueryOptions} that allows us to
   * describe how this query should be treated e.g. whether it should hit the
   * server at all or just resolve from the cache, etc.
   */
  abstract get<T = any, R = any, D = any>(options: any): Promise<Result<T>>;
  abstract post<T = any, R = any, D = any, C = any>(options: any): Promise<Result<T>>;
}
