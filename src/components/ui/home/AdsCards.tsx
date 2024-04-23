import React from 'react';
import { Col, Row } from 'reactstrap';
import { ImageMaker } from '../../index';
import { Link } from '@navigation';

const AdsCards = () => {
  return (
    <Row>
      <Col md={6}>
        <Row className="rounded-4 overflow-hidden">
          <Col className="px-0">
            <ImageMaker src={'/images/home/engineer.jpg'} />
          </Col>
          <Col className="px-0 bg-primary flex-col gap-3 gap-lg-5 text-white">
            <div className="text-center fw-semibold">
              <h4>Inspection</h4>
              <h4>For Free</h4>
            </div>
            <Link href={'/'} className="btn-outline px-2 fw-medium">
              Go To Service
            </Link>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row className="rounded-4 overflow-hidden">
          <Col className="px-0">
            <ImageMaker src={'/images/home/worker.jpg'} />
          </Col>
          <Col className="px-0 bg-primary flex-col gap-3 gap-lg-5 text-white">
            <div className="text-center fw-semibold">
              <h4>Enjoy With </h4>
              <h4>Our Service</h4>
            </div>
            <Link href={'/'} className="btn-outline px-2 fw-medium">
              Get Inspection
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AdsCards;
