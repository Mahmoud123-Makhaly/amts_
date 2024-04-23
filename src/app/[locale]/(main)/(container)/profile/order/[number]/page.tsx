'use server';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { MyOrderDetails } from '@components';

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: `Order ${params.number}`,
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({ params }: { params: { number: string } }) => {
  const {
    data: result,
    serverError,
    validationErrors,
  } = await Actions.account.getOrderDetails({ number: params.number });

  if (serverError || validationErrors || result?.error) notFound();
  return <MyOrderDetails order={result?.data} />;
};

export default Page;
