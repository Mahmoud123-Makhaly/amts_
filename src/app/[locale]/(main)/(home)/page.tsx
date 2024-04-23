'use server';

import React from 'react';
import { Container } from 'reactstrap';
import { ResolvingMetadata, Metadata } from 'next';

import { AppMetadata, env } from '@libs';
import { FreeTrial, LogoSlider, MobileApp, data } from '@components';
import { HomeBanner, FeaturedServices, HowItWorks, ClientsReviews } from '@components';
import { DTO } from '@tot/core/types';
import { FreeTrialData, featuredServices, howItWorks, mobileApp, reviews, ourWork } from './data';
import OurWork from '../../../../components/ui/home/OurWork';
type Props = {
  params: { locale: string; path?: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DelayedComponent = async ({ children }: { children: React.ReactNode }) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return <React.Fragment>{children}</React.Fragment>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const rootMetadata = new AppMetadata('Home', env[`SITE_DESCRIPTION_${params.locale === 'en' ? 'EN' : 'AR'}`]);
  rootMetadata.bindOG({
    title: 'Home',
    description: env[`SITE_DESCRIPTION_${params.locale === 'en' ? 'EN' : 'AR'}`],
    siteName: env.SITE_NAME,
    locale: params.locale,
    url: new URL(params.path || '/', env.SITE_DOMAIN),
    images: new URL('/cover.jpg', env.SITE_DOMAIN),
  });
  return rootMetadata.build('none');
}

const page = async ({
  params,
}: {
  params: {
    locale: 'ar' | 'en';
  };
}) => {
  return (
    <React.Fragment>
      <Container>
        <HomeBanner />
      </Container>
      <section className="bg-gray py-4">
        <Container>
          <HowItWorks data={howItWorks.en} />
        </Container>
      </section>
      <section>
        <Container>
          <FeaturedServices data={featuredServices[params.locale]} />
        </Container>
      </section>
      <section className="bg-gray py-4">
        <Container>
          <OurWork data={ourWork[params.locale]} />
        </Container>
      </section>
      <section>
        <Container>
          <FreeTrial data={FreeTrialData[params.locale]} />
        </Container>
      </section>
      <section className="bg-gray py-4">
        <Container>
          <ClientsReviews data={reviews[params.locale]} />
        </Container>
      </section>
      <section>
        <LogoSlider />
      </section>
      <section>
        <Container>
          <MobileApp data={mobileApp[params.locale]} />
        </Container>
      </section>
      <Container></Container>
    </React.Fragment>
  );
};

export default page;
