'use server';

import { cache } from 'react';

import { env } from '@libs';
import { Contracts } from '@tot/core/types';

import { client } from '../client';
import { Schema } from './schema';

export const getFulfillmentCenters = cache(
  client(Schema.getFulfillmentCenters, async (inputs, { _context }) => {
    const { skip, take, fulfillmentCenterIds, query, sort } = inputs ?? {};
    return _context.fulfillmentCenterServices?.getFulfillmentCenters(
      skip?.toString(),
      take,
      query,
      sort,
      fulfillmentCenterIds,
    );
  }),
);

export const getDefaultInventory = cache(
  client(Schema.getDefaultInventory, async (inputs, { _context }) => {
    return {
      data: {
        id: env.DEFAULT_INVENTORY_ID,
        name: env.DEFAULT_INVENTORY_NAME,
        phone: env.DEFAULT_INVENTORY_PHONE,
        line1: env.DEFAULT_INVENTORY_ADDRESS,
        geoLocation: env.DEFAULT_INVENTORY_ADDRESS,
      },
} as Contracts.Result<{ id: string; name: string; phone: string; line1: string; geoLocation: string }>;
  }),
);
