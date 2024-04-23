'use client';
import React from 'react';
import { AppForm, FormFieldType, FormikValues } from '../index';
import { useToast } from '@app/hooks';
import { Form, Input } from 'reactstrap';
import { ButtonMaker } from '../../index';

const Subscribe = () => {
  const toast = useToast();
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'Your email address',
      col: 6,
    },
  ];
  const onSubmit = () => {
    toast.success('Subscribed successfully, check your email');
  };
  return (
    <Form className="d-flex gap-3">
      <Input type="text" placeholder="Your email address" />
      <ButtonMaker type="submit" text="Submit" outline design="bg-white border-primary fw-semibold" />
    </Form>
  );
};

export default Subscribe;
