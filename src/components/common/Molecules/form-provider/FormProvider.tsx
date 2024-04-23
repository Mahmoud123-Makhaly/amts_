"use client";
import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { FormMaker, IFormControl } from "@components";

const FormProvider = (props: IFormControl) => {
  const { fields, initialValues, validationSchema, onSubmit, children } = props;
  const handling = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <FormikProvider value={handling}>
      <Form
        className="formMaker"
        onSubmit={(e) => {
          e.preventDefault();
          handling.handleSubmit();
          handling.validateOnChange;
        }}
      >
        <FormMaker fields={fields} handling={handling} />
        {children}
      </Form>
    </FormikProvider>
  );
};

export default FormProvider;
