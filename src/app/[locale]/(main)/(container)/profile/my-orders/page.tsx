'use server';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { MyOrders } from '@components';

type Props = {
  searchParams: {
    page?: number;
  };
};

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'My Orders', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({ searchParams }: Props) => {
  const {
    data: result,
    serverError,
    validationErrors,
  } = await Actions.account.getCustomerOrders({
    sort: 'createdDate:desc',
  });

  if (serverError || validationErrors || result?.error) notFound();

  return <MyOrders orders={result?.data.items} />;
};

export default Page;
