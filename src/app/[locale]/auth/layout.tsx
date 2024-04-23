'use server';

import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

import authOptions from '@auth';
import { Actions } from '@libs/actions';
import { Col, Container, Row } from 'reactstrap';
import AuthHeader from '../../../components/common/Molecules/header/AuthHeader';
import { ImageMaker } from '@components';
import { Link } from '@navigation';

export async function generateMetadata(): Promise<Metadata | null> {
  const _defaultMetaData = await Actions.app.defaultLayoutMetaData();
  return _defaultMetaData;
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session && session.isAuthorized) redirect('/');

  return (
    <React.Fragment>
      <AuthHeader />
      <main className="auth-page">
        <Row className="flex w-100 ">
          <Col md={6} className="px-0">
            <ImageMaker src="/images/auth/desktop.jpg" className="d-none d-md-block" width={700} height={1000} />
            <ImageMaker src="/images/auth/mobile-view.jpg" className="d-md-none" width={500} height={500} />
          </Col>
          <Col md={6} className="px-md-5 py-4 py-md-0 flex-col-start gap-4">
            <Link className="mb-5" href={'/'}>
              <ImageMaker src="/images/logo.png " alt="amts" width={150} height={52} />
            </Link>
            {children}
          </Col>
        </Row>
      </main>
    </React.Fragment>
  );
}
