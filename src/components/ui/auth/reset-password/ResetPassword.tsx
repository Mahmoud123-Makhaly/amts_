'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';

import { AppForm, FormFieldType, Avatar, SubmitButton, ImageMaker, DividerText } from '@components';
import { useTranslate } from '@app/hooks';
import Image from 'next/image';
import { Link } from '@navigation';

const ResetPassword = () => {
  const t = useTranslate('COMP_ResetPassword');
  const [submit, setSubmit] = useState<boolean>(false);
  const formFields: Array<FormFieldType> = [
    {
      name: 'password',
      label: t('NEW_PASSWORD'),
      type: 'password',
    },
    {
      name: 'confirm',
      label: t('REPEAT_NEW_PASSWORD'),
      type: 'password',
    },
  ];
  const onSubmit = (values: any) => {
    setSubmit(true);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t('REQUIRED_PASSWORD')),
    confirm: Yup.string()
      .oneOf([Yup.ref('password')], t('PASSWORD_NOT_MATCHED'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),
  });
  const ActionComponent = ({
    isValid,
    dirty,
    isSubmitting,
  }: {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
  }) => (
    <React.Fragment>
      <SubmitButton
        design="text-white border-0 py-0  bg-dark-blue"
        disabled={!isValid || !dirty || isSubmitting}
        isLoading={isSubmitting}
        block={true}
      >
        {t('SAVE_CHANGE')}
        <i className="fa-solid fa-arrow-right ms-2 border rounded-circle width-23 height-23 py-1"></i>
      </SubmitButton>
    </React.Fragment>
  );
  return (
    <div className="rounded-3   ">
      <div className="bg-white  p-5  rounded border">
        {!submit ? (
          <React.Fragment>
            <div>
              <p className="font-25 fw-bold  mb-4 ">{t('RESET_PASSWORD')}</p>
              <p className="text-muted mb-3 w-100 text-start">{t('ENTER_PASSWORD')}</p>
            </div>
            <div className="w-100">
              <AppForm
                initialValues={{
                  password: '',
                  confirm: '',
                }}
                validationSchema={validationSchema}
                fields={formFields}
                ActionComponent={ActionComponent}
                onSubmit={onSubmit}
              ></AppForm>
            </div>
          </React.Fragment>
        ) : (
          <div className=" text-center p-5">
            <Image src="/images/auth/sent.png" width={100} height={100} alt="logo" />
            <h4 className="text-black fw-normal px-3 my-4 font-28 fw-bold">{t('SUCCESS')}</h4>
            <p className="mb-4 text-start">{t('CONFIRMATION_MSG')}</p>
            <Link href="/" className="bg-dark-blue btn text-white w-100">
              {t('VERIFY_AND_PROCEED')}
              <Image src="/images/auth/arrow.png" alt="arrow right" width={24} height={24} className="ms-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
