'use server';

import React from 'react';
import { Metadata } from 'next';

import { SignUp, ImageMaker } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Sign Up', index: false });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = () => {
  return <SignUp />;
};

export default Page;
