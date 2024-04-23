'use server';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from 'reactstrap';

import { Loader, TankCleaning } from '@components';

import { Actions } from '@libs/actions';
import {  tankCleaningData } from './data';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Tank Cleaning',
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
      <TankCleaning data={tankCleaningData[params.locale]} />
    </Suspense>
  );
};

export default page;
