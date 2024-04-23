'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { Col, Row } from 'reactstrap';

import { SubmitButton, IFormControl, FormMaker } from '@components';

interface IFormProps extends IFormControl {
  children?: React.ReactNode;
  ActionComponent?: React.ComponentType<any>;
  FieldComponent?: React.ComponentType<any>;
  formClassName?: string;
}
const AppForm = (props: IFormProps) => {
  const {
    title,
    subtitle,
    initialValues,
    fields,
    validationSchema,
    children,
    buttonText = 'OK',
    ActionComponent,
    FieldComponent,
    onSubmit,
    formClassName,
  } = props;

  return (
    <React.Fragment>
      {title && <h3 className="form-title text-center">{title}</h3>}
      {subtitle && <h6>{subtitle}</h6>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={formAction}
        onSubmit={onSubmit}
        validateOnBlur
        validateOnChange
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitCount,
          isValid,
          dirty,
          setSubmitting,
          status,
          getFieldProps,
          validateField,
          validateForm,
          setFieldValue,
          setFieldError,
          /* and other goodies */
        }) => (
          <Form className={`formMaker ${formClassName ?? ''}`}>
            {'errorSummary' in errors && (
              <Row>
                <Col className="p-0 mb-2">
                  <small className="text-danger">{errors.errorSummary?.toString()}</small>
                </Col>
              </Row>
            )}

            {FieldComponent ? (
              <FieldComponent
                {...{
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  submitCount,
                  isValid,
                  dirty,
                  setSubmitting,
                  status,
                  getFieldProps,
                  validateField,
                  validateForm,
                  setFieldValue,
                  setFieldError,
                }}
              >
                <FormMaker fields={fields} handling={{ getFieldProps, values, errors }} />
              </FieldComponent>
            ) : (
              <FormMaker fields={fields} handling={{ getFieldProps, values, errors }} />
            )}
            <Row>
              <Col>
                {children}
                {ActionComponent ? (
                  <ActionComponent
                    {...{
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitCount,
                      isValid,
                      dirty,
                      setSubmitting,
                      status,
                      getFieldProps,
                      validateField,
                      validateForm,
                      setFieldValue,
                      setFieldError,
                    }}
                  >
                    <SubmitButton
                      block={true}
                      text={buttonText}
                      design="text-white border-0"
                      disabled={!isValid || !dirty || isSubmitting}
                      isLoading={isSubmitting}
                    />
                  </ActionComponent>
                ) : (
                  <SubmitButton
                    block={true}
                    text={buttonText}
                    design="text-white border-0"
                    disabled={!isValid || !dirty || isSubmitting}
                    isLoading={isSubmitting}
                  />
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default AppForm;
