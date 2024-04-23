'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

interface IMobileAppProps {
  data: {
    title: string;
    description: string;
    imgSrc: string;
  };
}
const MobileApp = (props: IMobileAppProps) => {
  const { data } = props;
  const t = useTranslate('COMP_Mobile_App');
  return (
    <Row>
      <div className="mobile-app p-3 p-lg-4 my-4 rounded-4">
        <Row className="align-items-center">
          <Col lg={5} className="ps-lg-0">
            <ImageMaker src={data.imgSrc} sizes="(max-width: 768px) 100% " className="w-100" />
          </Col>
          <Col lg={7}>
            <div className="ps-lg-4 flex-col-start gap-4">
              <h4 className="fw-bold mb-0">{data.title}</h4>
              <p className="fw-light">{data.description}</p>
              <div className="d-flex gap-3 justify-content-end w-100">
                <Link target="_blank" href="https://play.google.com/store/games?hl=en&gl=US">
                  <ImageMaker src="/images/home/mobile-app/googlePlay.png" width={135} height={40} />
                </Link>
                <Link target="_blank" href="https://www.apple.com/eg/app-store/">
                  <ImageMaker src="/images/home/mobile-app/appStore.png" width={135} height={40} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default MobileApp;
