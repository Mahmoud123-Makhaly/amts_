'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { ContactUs, Loader } from '@components';
import { Actions } from '@libs/actions';
import { data } from './data';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Contact Us', index: true });
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
      <ContactUs data={data[params.locale]} />
    </Suspense>
  );
};

export default page;
