'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { ImageMaker, ServiceCard } from '@components';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

import { data } from './data';

const ServicesDetails = () => {
  const t = useTranslate('COMP_Services_Details');
  const servicesData = [
    {
      title: t('SERVICES_DETAILS'),
      desc: ' Need a cleaner to come by? Book with FilKhedma for the best cleaners in Egypt at the best prices. SAB is the  leading home services company in UAE and has been a dominant pioneer in the field since 2014. So, you don’t need to worry, all our cleaners are highly trained and specialised in their field. All you need to do is  choose the time andthe place and review the order price before placing it. Cleaning is always easier with SAB.',
    },
    {
      title: t('AFFORDABLE_WAY'),
      desc: ' Need a cleaner to come by? Book with FilKhedma for the best cleaners in Egypt at the best prices. SAB is the  leading home services company in UAE and has been a dominant pioneer in the field since 2014. So, you don’t need to worry, all our cleaners are highly trained and specialised in their field. All you need to do is  choose the time andthe place and review the order price before placing it. Cleaning is always easier with SAB.',
    },
    {
      title: t('CLEANING_SERVICES'),
      desc: ' Need a cleaner to come by? Book with FilKhedma for the best cleaners in Egypt at the best prices. SAB is the  leading home services company in UAE and has been a dominant pioneer in the field since 2014. So, you don’t need to worry, all our cleaners are highly trained and specialised in their field. All you need to do is  choose the time andthe place and review the order price before placing it. Cleaning is always easier with SAB.',
    },
    {
      title: t('CLEANING_SERVICES'),
      desc: ' Need a cleaner to come by? Book with FilKhedma for the best cleaners in Egypt at the best prices. SAB is the  leading home services company in UAE and has been a dominant pioneer in the field since 2014. So, you don’t need to worry, all our cleaners are highly trained and specialised in their field. All you need to do is  choose the time andthe place and review the order price before placing it. Cleaning is always easier with SAB.',
    },
    {
      title: t('AFFORDABLE_WAY'),
      desc: ' Need a cleaner to come by? Book with FilKhedma for the best cleaners in Egypt at the best prices. SAB is the  leading home services company in UAE and has been a dominant pioneer in the field since 2014. So, you don’t need to worry, all our cleaners are highly trained and specialised in their field. All you need to do is  choose the time andthe place and review the order price before placing it. Cleaning is always easier with SAB.',
    },
  ];
  const actionButton = (
    <Link className="p-1 px-2 text-primary fw-bold" href={'/'}>
      {t('GET_INSPECTION')}
      <Image src="/images/svgs/arrow.svg" alt="arrow" width={32} height={32} />
    </Link>
  );
  return (
    <div>
      <Row>
        <h3 className="fw-bold font-24 my-3">{t('SERVICES_TITLE')}</h3>
      </Row>
      <Row>
        <Col lg={9} className="p-0">
          <div className="position-relative">
            <ImageMaker src="/images/services/services1.jpg" />
            {/* <ButtonMaker text={t('GET_INSPECTION')} design="position-absolute bottom-0 m-4 " /> */}
            <Link href="/" className="position-absolute bottom-0 m-4 btn btn-primary">
              {t('GET_INSPECTION')}{' '}
            </Link>
          </div>
        </Col>
        <Col lg={3} className="p-0">
          <Row>
            <div className="position-relative p-0 ps-lg-3">
              <ImageMaker src="/images/services/services2.jpg" />
              <div className="position-absolute  top-50 translate-middle-y end-0 bg-white p-2 rounded-pill ">
                <Link href="https://wa.me/(971)528358482" target="_blank" className="flex-between flex-row-reverse">
                  <p className="m-0">{t('CONTACT_US')}</p>
                  <Image src="/images/services/whatsapp.svg" alt="whatsapp" width={30} height={30} className="me-2" />
                </Link>
              </div>
            </div>
            <div className="ps-lg-3  p-0">
              <ImageMaker src="/images/services/services3.jpg" />
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <div className="my-3">
          {servicesData.map((item, index) => (
            <div className="mb-4" key={index}>
              <h4 className="fw-semibold mb-3 font-16">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Row>
      <div className="my-3">
        <Row>
          <p className="fw-semibold mb-3">{t('GALLERY')}</p>
          <Col md={6} lg={3}>
            <ImageMaker src="/images/services/gallery1.jpg" />
          </Col>
          <Col md={6} lg={3}>
            <ImageMaker src="/images/services/gallery2.jpg" />
          </Col>
          <Col md={6} lg={3}>
            <ImageMaker src="/images/services/gallery3.jpg" />
          </Col>
          <Col md={6} lg={3}>
            <ImageMaker src="/images/services/gallery2.jpg" />
          </Col>
        </Row>
      </div>
      <Row>
        <div className="my-3">
          <p className="fw-semibold mb-3">{t('VIDEO')}</p>
          <ImageMaker src="/images/services/video.jpg" />
        </div>
      </Row>
      <div className="my-3">
        <Row className="p-0">
          <p className="fw-semibold mb-3">{t('RELATED_SERVICES')}</p>
        </Row>
      </div>
    </div>
  );
};

export default ServicesDetails;
