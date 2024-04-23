'use client';
import React from 'react';
import { useLocale } from 'next-intl';

import { CarouselMaker, ReviewCard } from '@components';
import { reviews } from './data';
import { useTranslate } from '@app/hooks';

const OurClients = () => {
  const t = useTranslate('COMP_Our_Clients');
  const locale: 'ar' | 'en' = useLocale() as 'ar' | 'en';
  const cards = reviews[locale].map((card, index) => (
    <ReviewCard
      className="border"
      key={index}
      name={card.name}
      rating={card.rate}
      imgSrc={card.imgsrc}
      review={card.review}
      date={card.date}
    />
  ));
  return (
    <div className="py-4 ourClient">
      <div className="flex-col gap-3 mb-4">
        <h4 className="fw-semibold">{t('OUR_CLIENT_TITLE')}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur elit</p>
      </div>
      <CarouselMaker items={cards} numVisible={3} spaceBetween={20} style={{ paddingTop: '50px !important' }} />
    </div>
  );
};

export default OurClients;
