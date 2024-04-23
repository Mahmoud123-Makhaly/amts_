import React from 'react';
import { CarouselMaker, ReviewCard } from '../../index';
import { Col, Row } from 'reactstrap';

const ClientsReviews = ({
  data,
}: {
  data: Array<{ imgsrc: string; rate: number; review: string; name: string; date: string }>;
}) => {
  const cards = data.map((card, index) => (
    <ReviewCard
      key={index}
      name={card.name}
      rating={card.rate}
      imgSrc={card.imgsrc}
      review={card.review}
      date={card.date}
    />
  ));
  return (
    <React.Fragment>
      <h4 className="fw-semibold text-center mb-5">What Our Client Says</h4>
      {cards.length > 3 ? (
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

export default ClientsReviews;
