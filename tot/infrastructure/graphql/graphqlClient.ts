import {
  ApolloCache,
  ApolloClient,
  DefaultContext,
  InMemoryCache,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloErrorOptions } from '@apollo/client/errors';

import { IRepositories, Models } from '../../domain';
import { Utils } from './common';
import { AxiosInstance } from 'axios';
import { RestClient } from './restClient';

export class GraphQLClient extends IRepositories.IClient<ApolloClient<NormalizedCacheObject>> {
  readonly _context: ApolloClient<NormalizedCacheObject>;
  public readonly _restContext: IRepositories.IClient<AxiosInstance>;

  constructor(uri: string, token?: string) {
    super(uri, token);

    const graphqlAPIBase = new URL('graphql', uri).toString();
    this._context = token ? this.setupBearerClient(graphqlAPIBase, token) : this.setupPublicClient(graphqlAPIBase);
    this._restContext = new RestClient(new URL(uri).origin);
  }

  setupBearerClient = (uri: string, token?: string) => {
    const httpLink = createHttpLink({
      uri,
    });

    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };

  setupPublicClient = (uri: string) => {
    return new ApolloClient({
      uri,
      cache: new InMemoryCache(),
    });
  };

  get<T = any, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
  ): Promise<Models.Result<T>> {
    return this._context
      .query<T, TVariables>(options as QueryOptions<TVariables, T>)
      .then(
        response => {
          return { data: response.data } as Models.Result<T>;
        },
        (error: ApolloErrorOptions) => {
          return {
            error: {
              code: 'GRAPHQL_ERROR_QUERY',
              message: 'Cannot query',
              trace: this.transformApolloErrorToRepoError(error),
            },
          } as Models.Result<T>;
        },
      )
      .catch(exc => {
        return {
          error: {
            code: 'GRAPHQL_ERROR_QUERY',
            message: 'Cannot query',
            trace: [{ code: 'GRAPHQL_ERROR_EXCEPTION', message: exc }],
          },
        } as Models.Result<T>;
      });
  }

  post<
    T = any,
    TVariables extends OperationVariables = OperationVariables,
    TContext extends Record<string, any> = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>,
  >(options: MutationOptions<T, TVariables, TContext>): Promise<Models.Result<T>> {
    return this._context
      .mutate<T, TVariables, TContext, TCache>(options)
      .then(
        response => {
          return { data: response.data } as Models.Result<T>;
        },
        (error: ApolloErrorOptions) => {
          return {
            error: {
              code: 'GRAPHQL_ERROR_MUTATE',
              message: 'Cannot mutate',
              trace: this.transformApolloErrorToRepoError(error),
            },
          } as Models.Result<T>;
        },
      )
      .catch(exc => {
        return {
          error: {
            code: 'GRAPHQL_ERROR_MUTATE',
            message: 'Cannot mutate',
            trace: [{ code: 'GRAPHQL_ERROR_EXCEPTION', message: exc }],
          },
        } as Models.Result<T>;
      });
  }

  private transformApolloErrorToRepoError(options: ApolloErrorOptions): Array<Models.IRepoError> {
    const repoErrors: Array<Models.IRepoError> = [];

    if (options.networkError) {
      const networkError: Models.IRepoError = {
        code: 'GRAPHQL_ERROR_NETWORK',
        message: options.networkError.message || 'Network error occurred',
      };
      repoErrors.push(networkError);
    }

    if (options.graphQLErrors) {
      options.graphQLErrors.forEach(error => {
        const repoError: Models.IRepoError = {
          code: 'GRAPHQL_ERROR',
          message: error.message || 'GraphQL error occurred',
        };
        repoError.trace = [];

        if (error.extensions && error.extensions.code) {
          const exception: Models.IRepoError = {
            code:
              Utils.getType(error.extensions.code) === 'string'
                ? (error.extensions.code as string)
                : 'GRAPHQL_ERROR_EXT',
            message: 'Unknown exception occurred',
            exception: error.extensions,
          };
          repoError.trace.push(exception);
        }

        if (error.locations) {
          const exception: Models.IRepoError = {
            code: 'GRAPHQL_ERROR_LOCATION',
            message: 'Unknown exception occurred',
            exception: error.locations,
          };
          repoError.trace.push(exception);
        }

        if (error.path) {
          const exception: Models.IRepoError = {
            code: 'GRAPHQL_ERROR_PATH',
            message: 'Unknown exception occurred',
            exception: error.path,
          };
          repoError.trace.push(exception);
        }

        repoErrors.push(repoError);
      });
    }

    return repoErrors;
  }
}
