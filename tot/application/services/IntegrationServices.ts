import { IIntegrationServiceService } from '../contracts';
import { Utils } from '../common';
import { Contracts } from '../types';

export class IntegrationServices extends IIntegrationServiceService {
  protected setContext() {
    this._context = new this._repos.IntegrationRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
      this._configurations.apiKey,
    );
  }

  getQuiz(customerId: string, competitionId: string, date?: string): Promise<Contracts.Result<any>> {
    return this._context.getQuiz(customerId, competitionId, date).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'IntegrationServices.getQuiz',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<any>;
      } else {
        return { data: result } as Contracts.Result<any>;
      }
    });
  }

  answerQuiz(
    customerId: string,
    customerName: string,
    competitionId: string,
    questionId: string,
    answerId?: string | undefined,
  ): Promise<Contracts.Result<any>> {
    return this._context.answerQuiz(customerId, customerName, competitionId, questionId, answerId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'IntegrationServices.answerQuiz',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<any>;
      } else {
        return { data: result } as Contracts.Result<any>;
      }
    });
  }
}
