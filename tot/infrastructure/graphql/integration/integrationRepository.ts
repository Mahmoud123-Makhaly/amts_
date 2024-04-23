import { IRepositories, Models } from '../../../domain';
import { GraphQLClient } from '../graphqlClient';

export class IntegrationRepository
  extends IRepositories.IEntityBaseRepository
  implements IRepositories.IIntegrationRepository
{
  private _restClient = (this._context as GraphQLClient)._restContext;
  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
    apiKey?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId, apiKey);
  }

  getQuiz = (customerId: string, competitionId: string, date?: string): Promise<Models.Result<any>> => {
    const api = date
      ? `api/competition/GetQuestionForDay?customerId=${customerId}&competitionId=${competitionId}&date=${date}`
      : `api/competition/GetQuestionForDay?customerId=${customerId}&competitionId=${competitionId}`;
    return this._restClient
      .get<any>({
        segmentPath: api,
        headers: {
          api_key: this.apiKey,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'IntegrationRepository.getQuiz',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<any>;
        }
        return { data: result.data } as Models.Result<any>;
      });
  };

  answerQuiz = (
    customerId: string,
    customerName: string,
    competitionId: string,
    questionId: string,
    answerId?: string | undefined,
  ): Promise<Models.Result<any>> => {
    return this._restClient
      .post<any>({
        segmentPath: 'api/competition/SaveCustomerQuestion',
        data: {
          customerId,
          customerName,
          competitionId,
          questionId,
          answerId,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'IntegrationRepository.answerQuiz',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<any>;
        }
        return { data: result.data } as Models.Result<any>;
      });
  };
}
