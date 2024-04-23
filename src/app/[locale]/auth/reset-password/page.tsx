'use server';

import React from 'react';
import { Metadata } from 'next';

import { ResetPassword } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Reset Password',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = () => {
  return <ResetPassword />;
};

export default Page;
