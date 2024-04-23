'use client';
import { Field } from 'formik';
import React, { ReactNode } from 'react';
import { Input, InputProps, Label } from 'reactstrap';
interface ICheckInput extends InputProps {
  type: 'checkbox' | 'radio';
  as?: 'field' | 'input';
  children: ReactNode;
  name: string;
  className?: string;
  value?: string | number | readonly string[];
  id?: string;
}
const CheckInput = (props: ICheckInput) => {
  const { type, children, className, value, name, id, as = 'input', ...rest } = props;
  const randomId = `input-${Math.random().toString(10)}`;
  return (
    <div className="check-box">
      {as === 'field' ? (
        <Field type={type} id={id ?? randomId} className="box-radio d-none" name={name} value={value} {...rest} />
      ) : (
        <Input type={type} id={id ?? randomId} className="box-radio d-none" name={name} value={value} {...rest} />
      )}
      <Label htmlFor={id ?? randomId} className={`w-100 box-label ${className}`}>
        {children}
      </Label>
    </div>
  );
};

export default CheckInput;
