'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { Checkout, Loader } from '@components';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Checkout',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const {
    data: result,
    serverError,
    validationErrors,
  } = await Actions.order.getInvoice({
    id: params.id,
  });

  if (serverError || validationErrors || result?.error) notFound();
  else
    return (
      <Suspense fallback={<Loader />}>
        <Checkout order={result?.data} />
      </Suspense>
    );
};

export default Page;
