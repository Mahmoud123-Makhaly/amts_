'use server';

import { cache } from 'react';

import { env } from '@libs';

import { client } from '../client';
import { Schema } from './schema';

export const getInvoice = cache(
  client(Schema.getInvoice, async (inputs, { _context }) => {
    const { number, id } = inputs;
    return _context.orderServices?.getInvoice?.(number, id);
  }),
);

export const updateOrderSource = cache(
  client(Schema.updateOrderSource, async (inputs, { _context }) => {
    const { orderId } = inputs;
    const name = env.DP_ORDER_SOURCE_NAME;
    const value = env.DP_ORDER_SOURCE_VALUE;
    return _context.orderServices?.updateOrderDynamicProperties(name, value, orderId);
  }),
);

export const updateOrderStatus = cache(
  client(Schema.updateOrderStatus, async (inputs, { _context }) => {
    const { orderId, status } = inputs;
    return _context.orderServices?.changeOrderStatus(status, orderId);
  }),
);
