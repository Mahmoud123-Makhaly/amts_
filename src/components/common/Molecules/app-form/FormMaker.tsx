'use client';

import React from 'react';
import { Field } from 'formik';
import { Row, Col, FormGroup, Label } from 'reactstrap';

import { FormFieldType } from './FormMaker.types';

interface IFormMakerProps {
  fields: FormFieldType[];
  handling: any;
}

const FormMaker = (props: IFormMakerProps) => {
  const { fields, handling } = props;
  return (
    <Row>
      {fields &&
        fields.map((elem, indx) => {
          const { id, col, label, name, placeholder, type, design, children, html, max, min, as, ...rest } = elem;
          return (
            <React.Fragment key={id || 'form-elem-' + indx.toString()}>
              {type !== 'hidden' && !as && type !== 'html' ? (
                <Col md={col || 12} >
                  <FormGroup className={design}>
                    {label && (
                      <Label htmlFor={id || name} className="label">
                        {label}
                      </Label>
                    )}
                    <Field
                      name={name}
                      placeholder={placeholder}
                      type={type}
                      className="form-control rounded"
                      id={id || name}
                      value={handling.values[name!] ?? ''}
                      {...handling.getFieldProps({ name })}
                      {...rest}
                      max={max}
                      min={min}
                    />
                    {handling.errors[name!] && <small className="text-danger">{handling.errors[name!]}</small>}
                  </FormGroup>
                </Col>
              ) : as ? (
                <Col md={col || 12}>
                  <FormGroup className={design}>
                    {label && (
                      <Label htmlFor={id || name} className="label">
                        {label}
                      </Label>
                    )}
                    <Field
                      name={name}
                      placeholder={placeholder}
                      as={as}
                      className="form-control rounded"
                      id={id || name}
                      value={handling.values[name!] ?? ''}
                      {...handling.getFieldProps({ name })}
                      {...rest}
                    >
                      {children}
                    </Field>
                    {handling.errors[name!] && <small className="text-danger">{handling.errors[name!]}</small>}
                  </FormGroup>
                </Col>
              ) : type === 'html' ? (
                <React.Fragment>{html}</React.Fragment>
              ) : (
                <Field
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  className="form-control rounded"
                  id={id || name}
                  value={handling.values[name!] ?? ''}
                  {...handling.getFieldProps({ name })}
                  {...rest}
                />
              )}
            </React.Fragment>
          );
        })}
    </Row>
  );
};

export default FormMaker;
