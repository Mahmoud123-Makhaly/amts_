'use client';
import React from 'react';
import { Row, Col } from 'reactstrap';
import { AvatarGroup } from 'primereact/avatargroup';

import { ImageMaker, Avatar, AccordionMaker } from '@components';
import { useTranslate } from '@app/hooks';

const WhyChooseUs = () => {
  const t = useTranslate('COMP_Why_Choose_Us');
  const occordionItems = [
    {
      header: <p className="fw_semibold">{t('SERVICES_OFFER')}</p>,
      content: <p className="font-14">{t('SERVICES_DESC')}</p>,
      id: '1',
    },
    {
      header: <p className="fw_semibold">{t('PROVIDE_SERVICES')}</p>,
      content: <p className="font-14">{t('SERVICES_DESC')}</p>,
      id: '2',
    },
    {
      header: <p className="fw_semibold">{t('AREA_SERVICES')}</p>,
      content: <p className="font-14">{t('SERVICES_DESC')}</p>,
      id: '3',
    },
  ];
  return (
    <div className="py-5">
      <Row>
        <Col md={6}>
          <ImageMaker src="/images/about/choose.png" />
          <p className="font-14 my-3">{t('TRUSTED_PEOPLE')}</p>
          <AvatarGroup>
            <Avatar size="large" img="/images/home/avatars/1.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/2.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/3.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/4.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/5.png" shape="circle" />
            <Avatar size="large" img="/images/home/avatars/6.png" shape="circle" />
            <Avatar label="500+" size="large" className="bg-secondary font-14" shape="circle" />
          </AvatarGroup>
        </Col>
        <Col md={6}>
          <div className="ps-lg-5">
            <h3 className="font-20 fw-semibold">{t('WHY_CHOOSE_US')}</h3>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim minim veniam, quis nostrud exercitation
            </p>
            <AccordionMaker items={occordionItems} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhyChooseUs;
