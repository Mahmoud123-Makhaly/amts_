'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@components';
import { Actions } from '@libs/actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id?: string } }): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: `Invoice ${params.id ?? ''}`,
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({ params }: { params: { id?: string } }) => {
  const {
    data: result,
    serverError,
    validationErrors,
  } = await Actions.order.getInvoice({
    id: params.id,
  });

  if (serverError || validationErrors || result?.error) notFound();

  return <Suspense fallback={<Loader />}></Suspense>;
};

export default Page;
