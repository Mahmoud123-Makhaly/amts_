'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';

import { client } from '../client';
import { Schema } from './schema';

export const getQuiz = cache(
  client(Schema.getQuiz, async (inputs, { _context }) => {
    const { competitionId, customerId, date } = inputs;
    revalidatePath('/[locale]/(main)/ramadan-quiz', 'page');
    return _context.integrationServices?.getQuiz(customerId, competitionId, date);
  }),
);
export const answerQuiz = cache(
  client(Schema.answerQuiz, async (inputs, { _context }) => {
    const { competitionId, customerId, customerName, questionId, answerId } = inputs;
    revalidatePath('/[locale]/(main)/ramadan-quiz', 'page');
    return _context.integrationServices?.answerQuiz(customerId, customerName, competitionId, questionId, answerId);
  }),
);
