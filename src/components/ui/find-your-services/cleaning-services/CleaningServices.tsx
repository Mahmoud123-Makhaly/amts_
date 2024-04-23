'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { ImageMaker } from '@components';
import { Link } from '@navigation';

const CleaningServices = () => {
  const t = useTranslate('COMP_Cleaning_Services');
  return (
    <div className="pb-4 py-lg-4">
      <Row dir="ltr" className="flex-column-reverse flex-lg-row">
        <Col lg={5}>
          <div className="flex-col-start h-100 gap-4">
            <h4 className="fw-semibold">{t('CLEANING_SERVICES_TITLE')}</h4>
            <p className="text-dark-gray">{t('CLEANING_SERVICES_DESCRIPTION')}</p>
            <div>
              <Link href="/tank-cleaning" className="btn btn-primary mb-3  w-100 py-2">
                {t('TANK_CLEANING')}
              </Link>
              <Link href="/grease-cleaning" className="btn btn-primary   w-100 py-2">
                {t('GREASE_CLEANING')}
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <ImageMaker
            src="/images/find-your-services/services.png"
            width={490}
            height={450}
            className="d-none d-lg-block"
          />
          <ImageMaker src="/images/find-your-services/small-bg.png" width={490} height={450} className="  d-lg-none" />
        </Col>
      </Row>
    </div>
  );
};

export default CleaningServices;
