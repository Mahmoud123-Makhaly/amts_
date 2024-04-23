'use server';
import React, { ReactNode } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import '@style';
import { Actions } from '@libs/actions';

import AuthProvider from '../../AuthProvider';
import ToastProvider from './ToastProvider';

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

export default async function RootLayout(props: Props) {
  const { params, children } = props;

  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`)).default;
  } catch (error) {}

  if (!messages) return notFound();

  return (
    <html
      lang={params.locale}
      dir={params.locale === 'en' ? 'ltr' : 'rtl'}
      data-layout-dir={params.locale === 'en' ? 'ltr' : 'rtl'}
      data-preloader="disable"
    >
      <body dir={params.locale === 'en' ? 'ltr' : 'rtl'}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <AuthProvider>
            <ToastProvider locale={params.locale as 'en' | 'ar'} />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
