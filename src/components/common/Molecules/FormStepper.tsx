'use client';
import React, { ReactNode, useState } from 'react';
import { Col, Row } from 'reactstrap';
import * as Yup from 'yup';

import { AppForm, ButtonMaker, Stepper } from '@components';

interface IFormStepper {
  children: ReactNode;
  stepper?: boolean;
  success?: ReactNode;
  onSubmit: (values: any) => void;
  validationSchemas?: Yup.ObjectSchema<any>[];
}
const FormStepper = (props: IFormStepper) => {
  const { children, stepper = true, onSubmit, validationSchemas } = props;
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = React.Children.count(children);
  const groups = React.Children.toArray(children);

  const initialValues = React.Children.map(children, (child: any) => {
    const { fields } = child.props;
    const values: any = {};
    fields.forEach((field: any) => {
      values[field.name] = '';
    });
    return values;
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if (activeStep === totalSteps - 1) {
      onSubmit(values);
      setSubmitting(false);
    } else {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  return (
    <div className="flex-col-start">
      {stepper && (
        <Row className="w-100 ">
          <Col className="col-12">
            <Stepper numOfSteps={totalSteps} className="pb-4" active={activeStep} />
          </Col>
        </Row>
      )}
      <AppForm
        fields={[]}
        initialValues={initialValues[activeStep]}
        onSubmit={handleSubmit}
        ActionComponent={({ children }: { children: ReactNode }) => (
          <div>
            {activeStep === totalSteps - 1 ? (
              <div>
                <ButtonMaker text={'Back'} onClick={() => setActiveStep(prevStep => prevStep - 1)} />
                <ButtonMaker text={'Next'} type="submit" onClick={() => setActiveStep(prevStep => prevStep + 1)} />
              </div>
            ) : (
              <div>{children}</div>
            )}
          </div>
        )}
        FieldComponent={() => <React.Fragment>{groups[activeStep]}</React.Fragment>}
        validationSchema={validationSchemas ? validationSchemas[activeStep] : undefined}
      ></AppForm>
    </div>
  );
};

export default FormStepper;
