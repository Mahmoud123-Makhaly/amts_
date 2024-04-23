'use client';

import React from 'react';
import { Row, Col, Container } from 'reactstrap';

import { ImageMaker } from '@components';

const LayoutBanner = () => {
  return (
    <div className=" py-5 layout-banner">
      <Container>
        <Row dir="ltr" className="flex-column-reverse flex-lg-row">
          <Col lg={7}>
            <div className="flex-col-start h-100 gap-3">
              <h4 className="fw-semibold">My Cart (3 Items)</h4>
              <p className="text-dark-gray">Home . myCart</p>
            </div>
          </Col>
          <Col lg={5}>
            <ImageMaker src="/images/cart/banner.png" width={300} height={300} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LayoutBanner;
