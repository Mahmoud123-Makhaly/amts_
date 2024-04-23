import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';

export abstract class IIntegrationServiceService extends IBaseService<IRepositories.IIntegrationRepository> {
  abstract getQuiz(customerId: string, competitionId: string, date?: string): Promise<Result<any>>;
  abstract answerQuiz(
    customerId: string,
    customerName: string,
    competitionId: string,
    questionId: string,
    answerId?: string,
  ): Promise<Result<any>>;
}
