'use client';

import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { SubmitButton, AppForm, FormFieldType, FormikValues } from '@components';
import { useTranslate } from '@app/hooks';

const ShowMore = ({
  btnText,
  take,
  skip,
  design,
  onSubmit,
}: {
  btnText?: string;
  take: number;
  skip: number;
  design: string;
  onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>;
}) => {
  const t = useTranslate('COMP_ShowMore');

  const formFields: Array<FormFieldType> = [
    {
      name: 'take',
      type: 'hidden',
    },
    {
      name: 'skip',
      type: 'hidden',
    },
  ];

  const defaultValues = {
    take,
    skip: skip + take,
  };

  const validationSchema = Yup.object().shape({
    take: Yup.number(),
    skip: Yup.number(),
  });

  const ActionComponent = ({
    isSubmitting,
    isValid,
    dirty,
  }: {
    isSubmitting: boolean;
    isValid: boolean;
    dirty: boolean;
  }) => {
    return (
      <SubmitButton
        outline
        design={design}
        disabled={!isValid || dirty || isSubmitting}
        isLoading={isSubmitting}
        text={btnText ?? t('SHOW_MORE_BTN')}
      />
    );
  };

  return (
    <AppForm
      onSubmit={onSubmit}
      fields={formFields}
      initialValues={defaultValues}
      validationSchema={validationSchema}
      ActionComponent={ActionComponent}
    />
  );
};
export default ShowMore;
