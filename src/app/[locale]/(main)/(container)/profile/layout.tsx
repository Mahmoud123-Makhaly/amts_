'use server';

import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { ResolvingMetadata, Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import authOptions from '@auth';
import { Actions } from '@libs/actions';
import { Col, Row } from 'reactstrap';
import { ProfileTabs } from '@components';

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

const ContainerLayout = async ({ children, params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.isAuthorized || !session.user) redirect(`/auth/login?redirectURL=${params.path ?? '/'}`);

  return (
    <Row>
      <Col lg={3}>
        <ProfileTabs />
      </Col>
      <Col lg={9}>{children}</Col>
    </Row>
  );
};
export default ContainerLayout;
