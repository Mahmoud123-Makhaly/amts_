'server only';

import { z } from 'zod';

const getInvoice = z.object({
  number: z.optional(z.string()),
  id: z.optional(z.string()),
});

const updateOrderSource = z.object({
  orderId: z.string({ required_error: 'Order Id field is required' }),
});

const updateOrderStatus = z.object({
  orderId: z.string({ required_error: 'Order Id field is required' }),
  status: z.string({ required_error: 'Status field is required' }),
});

export const Schema = { getInvoice, updateOrderSource, updateOrderStatus };
