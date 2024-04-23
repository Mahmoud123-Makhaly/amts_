'use server';

import React, { ReactNode, Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Actions } from '@libs/actions';
import { Footer, FlexHeader as Header, Loader } from '@components';

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
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Suspense>
  );
};

export default layout;
