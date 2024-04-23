'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { ServiceCard } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

interface IFeaturedServicesProps {
  data: Array<{
    imgSrc: string;
    name: string;
    slug: string;
  }>;
}
const FeaturedServices = (props: IFeaturedServicesProps) => {
  const { data } = props;
  const t = useTranslate('COMP_Featured_Services');

  return (
    <div className="py-3">
      <div className="text-center">
        <h4 className="fw-semibold mb-0">{t('FEATURED_SERVICES')}</h4>
        <p className="font-14 my-3">{t('FEATURES_DESCRIPTION')}</p>
      </div>
      <Row>
        {data.map((item, index) => (
          <Col md={6} lg={4} key={index}>
            <ServiceCard title={item.name} href={item.slug} imgSrc={item.imgSrc} product={item as DTO.IProductDTO} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedServices;
