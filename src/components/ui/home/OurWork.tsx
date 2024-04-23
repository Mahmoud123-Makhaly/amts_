import React from 'react';
import { Col, Row } from 'reactstrap';
import { CarouselMaker, WorkCard } from '@components';

const OurWork = ({ data }: { data: Array<{ imgSrc: string; header: string; description: string }> }) => {
  const cards = data.map((card, index) => (
    <WorkCard imgSrc={card.imgSrc} key={index} header={card.header} description={card.description} />
  ));
  return (
    <React.Fragment>
      <h4 className="fw-semibold">Our Work</h4>
      <p className="text-dark-gray mb-4">Browse through our impressive before and after photos</p>
      {cards.length < 3 ? (
        <CarouselMaker
          items={cards}
          numVisible={3}
          spaceBetween={20}
          breakpoints={{ 320: { slidesPerView: 1.5 }, 768: { slidesPerView: 2 }, 991: { slidesPerView: 3 } }}
        />
      ) : (
        <Row>
          {cards.map((card, index) => (
            <Col key={index}>{card}</Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};

export default OurWork;
