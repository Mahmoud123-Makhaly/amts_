'server only';

import { z } from 'zod';

const metaDataForTitleDescPageTemplate = z.object({
  title: z
    .string({ required_error: 'TITLE is required' })
    .min(2, `TITLE must be more than ${2}`)
    .max(50, `TITLE must be less than ${50}`),
  description: z.optional(
    z.string().min(10, `description must be more than ${10}`).max(300, `description must be less than ${300}`),
  ),
  index: z.optional(z.boolean()),
});

export const Schema = { metaDataForTitleDescPageTemplate };
