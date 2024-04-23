'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { Actions } from '@libs/actions';
import { AboutUs, ImageMaker, Loader } from '@components';
import { howItWorks } from './data';
import { PageBanner } from '@components';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'About Us',
    index: false,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const Page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
  };
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <ImageMaker src={'/images/about/banner.jpg'} />
      <AboutUs data={howItWorks[params.locale]} />
    </Suspense>
  );
};

export default Page;
