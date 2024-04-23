import React from 'react';
import { Col, Row } from 'reactstrap';
import { CardMaker } from '../../index';
import useTranslate from '../../../hooks/useTranslate';

interface IWorkStepsProps {
  data: { title: string; subtitle: string; cards: Array<{ imgSrc: string; title: string; description: string }> };
}
const HowItWorks = (props: IWorkStepsProps) => {
  const { title, subtitle, cards } = props.data;
  const t = useTranslate('COMP_How_Works');
  return (
    <Row>
      <Col className="col-12">
        <div className="py-3 flex-col gap-3">
          <h4 className="fw-semibold">{title}</h4>
          <p className="text-dark-gray">{subtitle}</p>
        </div>
      </Col>
      {cards.map((card, index) => (
        <Col  sm={6} lg={3} key={index}>
          <CardMaker
            img={card.imgSrc}
            imgWidth={140}
            imgHeight={140}
            className="p-2 flex-col gap-3 border-0 rounded-3 p-2 p-lg-4 text-center h-100"
          >
            <h6>{card.title}</h6>
            <p>{card.description}</p>
          </CardMaker>
        </Col>
      ))}
    </Row>
  );
};

export default HowItWorks;
