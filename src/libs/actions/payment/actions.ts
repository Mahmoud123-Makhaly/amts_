'use server';

import { client } from '../client';
import { Schema } from './schema';

export const loadConfiguration = client(Schema.loadConfiguration, async (inputs, { _context }) => {
  const { methodName, params } = inputs;
  return _context.paymentServices?.loadConfiguration(methodName, params);
});

export const confirmPayment = client(Schema.confirmPayment, async (inputs, { _context }) => {
  const { methodName, params } = inputs;
  return _context.paymentServices?.confirmPayment(methodName, params);
});

export const isPaymentMethodHasGateway = client(Schema.isPaymentMethodHasGateway, async (inputs, { _context }) => {
  const { methodName } = inputs;
  return _context.paymentServices?.hasGateway(methodName);
});
