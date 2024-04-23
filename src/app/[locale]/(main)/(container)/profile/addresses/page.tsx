'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Addresses, Loader } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Addresses', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = async () => {
  const { data: addresses, serverError, validationErrors } = await Actions.account.getMyAddresses();

  if (serverError || validationErrors || addresses?.error) notFound();

  return (
    <Suspense fallback={<Loader style={'dots'} />}>
      <Addresses data={addresses?.data} />
    </Suspense>
  );
};

export default Page;
