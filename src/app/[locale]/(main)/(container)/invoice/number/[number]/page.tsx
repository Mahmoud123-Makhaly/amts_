'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { Loader } from '@components';
import { Actions } from '@libs/actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: `Invoice ${params.number}`,
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({ params }: { params: { number?: string } }) => {
  const {
    data: result,
    serverError,
    validationErrors,
  } = await Actions.order.getInvoice({
    number: params.number,
  });

  if (serverError || validationErrors || result?.error) notFound();

  return <Suspense fallback={<Loader />}></Suspense>;
};

export default Page;
