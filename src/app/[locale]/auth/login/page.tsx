'use server';

import React from 'react';
import { Metadata } from 'next';

import { Login } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Login', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = () => {
  return <Login />;
};

export default Page;
