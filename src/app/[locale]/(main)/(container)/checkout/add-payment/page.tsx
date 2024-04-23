'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { redirect } from '@navigation';
import { Checkout, Loader } from '@components';
import { DTO } from '@tot/core/types';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Checkout',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async () => {
  const cartResponse = Actions.cart.getOrCreateDefaultCart('full');
  const availableAddressesResponse = Actions.account.getMyAddresses();

  const promiseResponse = await Promise.allSettled([cartResponse, availableAddressesResponse]);

  if (promiseResponse[0].status !== 'fulfilled') notFound();
  else if (!promiseResponse[0].value.data?.data?.shipments?.at(0)?.deliveryAddress) redirect('/checkout/add-address');
  else
    return (
      <Suspense fallback={<Loader />}>
        <Checkout
          data={promiseResponse[0].value.data?.data as DTO.ICartDTO}
          availableAddresses={
            promiseResponse[1].status === 'fulfilled' ? promiseResponse[1].value.data?.data : undefined
          }
        />
      </Suspense>
    );
};

export default Page;
