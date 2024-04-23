'use server';

import React, { Suspense } from 'react';
import { ResolvingMetadata, Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

import { Loader, MyAccount } from '@components';
import authOptions from '@auth';
import { Actions } from '@libs/actions';

type Props = {
  params: { locale: string; path?: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  const _defaultMetaData = await Actions.app.metaDataForTitleDescPageTemplate({ title: 'Profile', index: false });
  return _defaultMetaData.data ?? notFound();
}
const Page = async () => {
  const session = await getServerSession(authOptions);

  const {
    data: contact,
    serverError,
    validationErrors,
  } = await Actions.account.getContactDetails(session?.user?.memberId ?? '');

  if (serverError || validationErrors || contact?.error || !contact?.data) notFound();

  return (
    <Suspense fallback={<Loader />}>
      <MyAccount data={contact.data} />
    </Suspense>
  );
};

export default Page;
