'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormGroup } from 'reactstrap';
import { Rating } from 'primereact/rating';
import { Nullable } from 'primereact/ts-helpers';
import { FormikErrors, FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';

import { AppForm, FormFieldType, FormikValues } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';
import { usePathname, useRouter } from '@navigation';
import { DTO } from '@tot/core/types';

interface IProductRating {
  entityId: string;
  entityName: string;
  entityType: 'Product';
  submitText: string;
  postSubmit?: (review: DTO.ICustomerReviewDTO) => void;
  initialValues?: {
    rate: number;
    review: string;
  };
}

const ProductReview = ({ entityId, entityName, entityType, submitText, initialValues, postSubmit }: IProductRating) => {
  const [rating, setRating] = useState<Nullable<number>>(initialValues?.rate ?? null);
  const t = useTranslate('COMP_ProductReview');
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const formFields: Array<FormFieldType> = [
    {
      name: 'review',
      as: 'textarea',
      placeholder: '',
      rows: '4',
      cols: '50',
    },
  ];

  const defaultValues = {
    review: '',
    ...initialValues,
  };

  const validationSchema = Yup.object().shape({
    review: Yup.string().required(t('REVIEW_REQUIRED_ERR')),
  });

  const FieldComponents = ({
    children,
    validateForm,
  }: {
    children: React.ReactNode;
    validateForm: (values?: any) => Promise<FormikErrors<FormikValues>>;
  }) => (
    <React.Fragment>
      <FormGroup>
        <Rating
          value={rating ?? 0}
          onChange={e => {
            validateForm();
            setRating(e.value);
          }}
          cancel={false}
          name="rate"
        />
      </FormGroup>
      {children}
    </React.Fragment>
  );

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (!rating || rating <= 0) formikHelpers.setFieldError('errorSummary', t('RATE_REQUIRED_ERR'));
    else {
      const {
        data: reviewStatus,
        serverError,
        validationErrors,
      } = await Actions.account.addReview({
        userName: session!.user!.lastName ?? session!.user!.userName ?? session!.user!.email ?? 'Guest',
        entityId,
        entityName,
        entityType,
        review: values.review,
        title: '',
        rating: rating ?? 1,
        pathName,
      });

      if (serverError || validationErrors || reviewStatus?.error || !reviewStatus?.data) {
        if (reviewStatus?.error?.message === 'DUPLICATE')
          formikHelpers.setFieldError('errorSummary', t('DUPLICATE_REVIEW_ERR'));
        else formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      } else {
        postSubmit && postSubmit(reviewStatus?.data);
      }
    }
  };

  useEffect(() => {
    if (!session?.isAuthorized || !session.user) router.push(`/auth/login?redirectURL=${pathName}`);
  });

  return (
    <div className="border rounded-2 p-3 mt-3">
      <AppForm
        onSubmit={onSubmit}
        fields={formFields}
        initialValues={defaultValues}
        validationSchema={validationSchema}
        FieldComponent={FieldComponents}
        buttonText={submitText}
      />
    </div>
  );
};

export default ProductReview;
