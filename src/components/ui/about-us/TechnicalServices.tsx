'use client';
import React from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslate } from '@app/hooks';
import { ImageMaker } from '@components';

const TechnicalServices = () => {
  const t = useTranslate('COMP_Technical_Services');
  return (
    <div className="py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="flex-col-start gap-3">
            <div>
              <h5 className="font-20 fw-semibold">{t('FIRST_TITLE')}</h5>
              <h5 className="font-20 fw-semibold">{t('SECOND_TITLE')}</h5>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim minim veniam, quis nostrud exercitation ullamco laboris nisi esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem Accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inverte veritatis and semi-architectural Beatae vitae dicta sunt
              explicabo.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <ImageMaker src="/images/about/technical.jpg" />
        </Col>
      </Row>
    </div>
  );
};

export default TechnicalServices;
