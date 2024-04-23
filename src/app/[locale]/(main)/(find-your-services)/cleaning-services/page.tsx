'use server';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from 'reactstrap';

import { CleaningServices, Loader } from '@components';
import { Actions } from '@libs/actions';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({
    title: 'Cleaning Services',
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
          <CleaningServices />
        </Container>
      </div>
    </Suspense>
  );
};

export default page;
