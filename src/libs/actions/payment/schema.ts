'server only';

import { z } from 'zod';

const loadConfiguration = z.object({
  methodName: z.enum(['QnbMethod']),
  params: z.any(),
});
const confirmPayment = z.object({
  methodName: z.enum(['QnbMethod']),
  params: z.any(),
});
const isPaymentMethodHasGateway = z.object({
  methodName: z.string({ required_error: 'Method Name field is required' }),
});

export const Schema = { loadConfiguration, confirmPayment, isPaymentMethodHasGateway };
