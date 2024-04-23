'use server';

import React, { ReactNode, Suspense } from 'react';
import { Container } from 'reactstrap';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { Actions } from '@libs/actions';
import { Loader } from '@components';

type Props = {
  children: ReactNode;
  params: { locale: string; path?: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata | null> {
  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  const _defaultMetaData = await Actions.app.defaultLayoutMetaData();
  return _defaultMetaData;
}

const layout = (props: Props) => {
  const { params, children } = props;

  return (
    <Suspense key={params.path} fallback={<Loader />}>
      <Container>{children}</Container>
    </Suspense>
  );
};

export default layout;
