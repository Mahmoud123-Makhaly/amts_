'use server';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { FindYourServices, Loader } from '@components';

import { Actions } from '@libs/actions';
import { Container } from 'reactstrap';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: '  Find Your Services',
    index: true,
  });
  if (_defaultMetaData.data) return _defaultMetaData.data;
  else return null;
}

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="find-your-services">
        <Container>
          <FindYourServices />
        </Container>
      </div>
    </Suspense>
  );
};

export default page;
