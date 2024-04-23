'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { Wishlist, Loader, EmptyWishlist } from '@components';
import { Actions } from '@libs/actions';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Wishlist', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = async () => {
  const { data: result, serverError, validationErrors } = await Actions.account.getDefaultWishlist();

  if (serverError || validationErrors || result?.error) notFound();
  return (
    <Suspense fallback={<Loader style={'dots'} />}>
      {result?.data && (result.data.itemsCount || 0) > 0 ? <Wishlist data={result.data} /> : <EmptyWishlist />}
    </Suspense>
  );
};

export default Page;
