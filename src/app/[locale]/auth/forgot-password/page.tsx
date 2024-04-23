'use server';

import React from 'react';
import { Metadata } from 'next';

import { ForgotPassword, ImageMaker } from '@components';
import { Actions } from '@libs/actions';
import { Row, Col } from 'reactstrap';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Forgot Password',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}
const Page = () => {
  return <ForgotPassword />;
};

export default Page;
