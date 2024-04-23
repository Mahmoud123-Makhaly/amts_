'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { ImageMaker } from '@components';
import { Link } from '@navigation';

const FindYourServices = () => {
  const t = useTranslate('COMP_Find_Your_Services');
  return (
    <div className="pb-4 py-lg-4">
      <Row dir="ltr" className="flex-column-reverse flex-lg-row">
        <Col lg={5}>
          <div className="flex-col-start h-100 gap-4">
            <h4 className="fw-semibold">{t('SERVICES_TYPE_TITLE')}</h4>
            <p className="text-dark-gray">{t('SERVICES_TYPE_DESCRIPTION')}</p>
            <div>
              <Link href="/cleaning-services" className="btn btn-primary mb-3  w-100 py-2">
                {t('CLEANING_SERVICES')}
              </Link>
              <Link href="/cleaning-services" className="btn btn-primary   w-100 py-2">
                {t('COOKING')}
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

export default FindYourServices;
