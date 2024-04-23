'server only';

import { z } from 'zod';
const getQuiz = z.object({
  customerId: z.string({ required_error: 'Customer Id field is required' }),
  competitionId: z.string({ required_error: 'Competition Id field is required' }),
  date: z.optional(z.string()),
});

const answerQuiz = z.object({
  customerId: z.string({ required_error: 'Customer Id field is required' }),
  customerName: z.string({ required_error: 'Customer Name field is required' }),
  competitionId: z.string({ required_error: 'Competition Id field is required' }),
  questionId: z.string({ required_error: 'Question Id field is required' }),
  answerId: z.optional(z.string()),
});
export const Schema = {
  getQuiz,
  answerQuiz,
};
