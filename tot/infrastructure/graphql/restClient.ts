import { IRepositories, Models } from '../../domain';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class RestClient extends IRepositories.IClient<AxiosInstance> {
  readonly _context: AxiosInstance;

  constructor(uri: string, token?: string) {
    super(uri, token);
    this._context = token ? this.setupBearerClient(uri, token) : this.setupPublicClient(uri);
  }

  setupBearerClient(uri: string, token: string): AxiosInstance {
    let _axiosInstance = axios.create({
      baseURL: uri,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return _axiosInstance;
  }

  setupPublicClient(uri: string): AxiosInstance {
    let _axiosInstance = axios.create({
      baseURL: uri,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    return _axiosInstance;
  }

  get<T = any>(options: any): Promise<Models.Result<T>> {
    const { segmentPath, ...others } = options;
    const url = `${this.uri}/${segmentPath}`;
    return this._context
      .get<any, AxiosResponse<T, any>, any>(url, others)
      .then(
        (res: AxiosResponse<T>) => {
          return { data: res.data } as Models.Result<T>;
        },
        (err: AxiosError) => {
          return {
            error: {
              code: 'GRAPHQL_AXIOS_GET_ERROR',
              message: 'axios request error',
              trace: [
                { message: 'RESPONSE_DATA', code: 'GRAPHQL_AXIOS_GET_ERROR_RESPONSE', exception: err.response?.data },
                { message: err.message, code: err.code?.toString(), exception: err.isAxiosError ? undefined : err },
              ],
            },
          } as Models.Result<T>;
        },
      )
      .catch(exp => {
        return {
          error: {
            code: 'GRAPHQL_AXIOS_GET_ERROR',
            message: 'axios exception',
            trace: [{ code: 'GRAPHQL_AXIOS_GET_ERROR', message: exp }],
          },
        } as Models.Result<T>;
      });
  }

  post<T = any>(options: any): Promise<Models.Result<T>> {
    const { segmentPath, data, config }: { segmentPath: string; data: T; config?: AxiosRequestConfig<T> } = options;
    const url = `${this.uri}/${segmentPath}`;
    return this._context
      .post(url, data, config)
      .then(
        res => {
          return { data: res.data } as Models.Result<T>;
        },
        (err: AxiosError) => {
          return {
            error: {
              code: 'GRAPHQL_AXIOS_POST_ERROR',
              message: 'axios request error',
              trace: [
                { message: 'RESPONSE_DATA', code: 'GRAPHQL_AXIOS_POST_ERROR_RESPONSE', exception: err.response?.data },
                { message: err.message, code: err.code?.toString(), exception: err.isAxiosError ? undefined : err },
              ],
            },
          } as Models.Result<T>;
        },
      )
      .catch(exp => {
        return {
          error: {
            code: 'GRAPHQL_AXIOS_POST_ERROR',
            message: 'axios exception',
            trace: [{ code: 'GRAPHQL_AXIOS_POST_ERROR', message: exp }],
          },
        } as Models.Result<T>;
      });
  }
}
