'use server';

import React from 'react';

import { content } from './data';

const Page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
    path: 'terms-and-conditions' | 'delivery-policy' | 'about-us' | 'return-policy' | 'f-and-q';
  };
}) => {
  const { path, locale } = params;
  const data = content[path];
  return <React.Fragment></React.Fragment>;
};

export default Page;
