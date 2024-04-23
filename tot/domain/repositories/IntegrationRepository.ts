import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface IIntegrationRepository extends IEntityBaseRepository {
  getQuiz: (customerId: string, competitionId: string, date?: string) => Promise<Result<any>>;
  answerQuiz: (
    customerId: string,
    customerName: string,
    competitionId: string,
    questionId: string,
    answerId?: string,
  ) => Promise<Result<any>>;
}
