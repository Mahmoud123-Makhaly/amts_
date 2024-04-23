'use client';
import React, { ReactNode } from 'react';
import { Col, Row } from 'reactstrap';

import { Stepper } from '@components';

interface ICheckoutStepper {
  children: ReactNode;
  activeStep: number;
}
const CheckoutStepper = (props: ICheckoutStepper) => {
  const { children, activeStep } = props;
  const totalSteps = React.Children.count(children);
  const groups = React.Children.toArray(children);
  const stepLabels = ['personal data', 'payment', 'proceed'];
  return (
    <div className="flex-col-start">
      <Row className="w-100 border rounded">
        <Col className="col-12">
          <Stepper numOfSteps={totalSteps} className="pt-3" active={activeStep} stepLabels={stepLabels} />
        </Col>
      </Row>
      <React.Fragment>{groups[activeStep]}</React.Fragment>
    </div>
  );
};

export default CheckoutStepper;
