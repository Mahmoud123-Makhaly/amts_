'use server';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from 'reactstrap';

import { GreaseCleaning, Loader } from '@components';

import { Actions } from '@libs/actions';
import { greaseCleaningData } from './data';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Grease Cleaning',
    index: true,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
  };
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <GreaseCleaning data={greaseCleaningData[params.locale]} />
    </Suspense>
  );
};

export default page;
