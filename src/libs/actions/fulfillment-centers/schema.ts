'server only';

import { z } from 'zod';
const getFulfillmentCenters = z.void().or(
  z.object({
    skip: z.optional(z.number()).default(0),
    take: z.optional(z.number()).default(10),
    query: z.optional(z.string()),
    sort: z.optional(z.string()),
    fulfillmentCenterIds: z.optional(z.array(z.string())),
  }),
);

const getDefaultInventory = z.void();

export const Schema = {
  getFulfillmentCenters,
  getDefaultInventory,
};
