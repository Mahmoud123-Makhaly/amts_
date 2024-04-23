'use server';

import { getLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { SafeParseError, ZodError } from 'zod';

import { AppMetadata, env } from '@libs';

import { Schema } from './schema';

export const defaultLayoutMetaData = async (): Promise<Metadata | null> => {
  try {
    const _defaultLocale = await getLocale();
    const rootMetadata = new AppMetadata(
      {
        template: `%s | ${env.SITE_NAME}`,
        default: env.SITE_NAME!,
      },
      env[`SITE_DESCRIPTION_${_defaultLocale === 'en' ? 'EN' : 'AR'}`],
    );

    return rootMetadata.build('withDefault');
  } catch (ex) {
    if (process.env.NODE_ENV !== 'development') console.error('defaultLayoutMetaData exception:', ex);
    return null;
  }
};

export const metaDataForTitleDescPageTemplate = async (
  inputs: any,
): Promise<
  { data: Metadata } | { data?: Metadata; validationErrors: ZodError<typeof Schema.metaDataForTitleDescPageTemplate> }
> => {
  const safeInputs = Schema.metaDataForTitleDescPageTemplate.safeParse(inputs);

  if (!safeInputs.success) {
    const { error } = safeInputs as SafeParseError<typeof Schema.metaDataForTitleDescPageTemplate>;
    return { validationErrors: error };
  }

  const { title, description, index } = safeInputs.data;
  const _defaultLocale = await getLocale();
  const rootMetadata = new AppMetadata(
    title,
    description ?? env[`SITE_DESCRIPTION_${_defaultLocale === 'en' ? 'EN' : 'AR'}`],
    index,
  );

  return { data: rootMetadata.build() };
};
