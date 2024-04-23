'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { Loader, ShoppingCart } from '@components';
 
export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Shopping Cart',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async () => {
  const { data: cart, serverError, validationErrors } = await Actions.cart.getOrCreateDefaultCart('full');

  if (serverError || validationErrors || !cart?.data || cart.error) return notFound();

  return (
    <Suspense fallback={<Loader />}>
      <ShoppingCart cart={cart?.data} />
    </Suspense>
  );
};

export default Page;
