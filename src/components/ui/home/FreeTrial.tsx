'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

interface IFreeTrialProps {
  data: {
    title: string;
    description: string;
    imgSrc: string;
  };
}
const FreeTrial = (props: IFreeTrialProps) => {
  const { data } = props;
  const t = useTranslate('COMP_Free_Trial');
  return (
    <div className="free-trial p-4 my-4 rounded-4">
      <Row className="align-items-center">
        <Col lg={5} className="ps-lg-0">
          <ImageMaker src={data.imgSrc} />
        </Col>
        <Col lg={7}>
          <div className="ps-lg-4 flex-col-start gap-4">
            <h4 className="fw-bold mb-0">{data.title}</h4>
            <p className="fw-light">{data.description}</p>
            <Link href="/contact-us" className="btn btn-primary ">
              <div className="d-flex  py-1">
                <span> {t('TRY_FREE_TRIAL')}</span>
                <i className="fa-solid fa-arrow-right ms-2 border rounded-circle outline-icon-22 flex-center"></i>
              </div>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FreeTrial;
