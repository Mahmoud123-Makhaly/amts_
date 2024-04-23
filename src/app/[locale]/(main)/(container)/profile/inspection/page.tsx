'use server';

import React from 'react';
import { Metadata } from 'next';

import { Actions } from '@libs/actions';
import { MyBookings } from '@components';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Booking', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = () => {
  return <MyBookings />;
};

export default Page;
