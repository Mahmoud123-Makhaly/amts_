import React from 'react';
import { CardMaker } from '../index';
import { Container, Row } from 'reactstrap';

const PageBanner = ({ title }: { title: string }) => {
  const bannerContent = (
    <Container>
      <Row>
        <div className="banner-title">
          <h2 className="fw-bold">{title} </h2>
        </div>
      </Row>
    </Container>
  );
  return (
    <React.Fragment>
      <CardMaker
        img="/images/banner.jpg"
        overlay
        overlayContent={bannerContent}
        className="page-desktop-banner d-none d-md-block w-100"
      />
      <CardMaker
        img="/images/mobile-banner.jpg"
        overlay
        overlayContent={bannerContent}
        className="page-mobile-banner d-md-none w-100"
      />
    </React.Fragment>
  );
};

export default PageBanner;
