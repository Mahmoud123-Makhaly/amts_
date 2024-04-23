'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';

import { useTranslate } from '@app/hooks';
import { AppForm, ButtonMaker, DividerText, FormFieldType, ImageMaker, SubmitButton } from '@components';
import sent from '@assets/images/auth/sent.svg';
import Link from 'next/link';
import Image from 'next/image';

const ForgotPassword = () => {
  const t = useTranslate('COMP_ForgotPassword');
  const [submit, setSubmit] = useState<boolean>(false);
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL_PHONE'),
      type: 'email',
      placeholder: t('EMAIL_PHONE'),
      design: 'fw-bold',
    },
  ];
  const onSubmit = (values: any) => {
    setSubmit(true);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL_OR_PHONE')),
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
        design="text-white border-0 py-0  bg-dark-blue d-flex align-items-center justify-content-center"
        disabled={!isValid || !dirty || isSubmitting}
        isLoading={isSubmitting}
        block={true}
      >
        <p>{t('SEND')}</p>
        <i className="fa-solid fa-xs fa-arrow-right ms-2 border rounded-circle outline-icon-20 py-1"></i>
      </SubmitButton>
    </React.Fragment>
  );
  return (
    <div className="flex-col gap-3 p-5">
      <div className="bg-white p-4 px-md-5 py-md-5 flex-colauth-form">
        {!submit ? (
          <React.Fragment>
            <div className="flex-col mb-3">
              <p className="font-28 mb-4 text-info">{t('RESET_PASSWORD')}</p>
              <p className="text-center text-12 mb-2">{t('ENTER_EMAIL')}</p>
              <p className=" text-12 w-100 text-start fw-bold">
                {t('SIGN_IN_WITH')}{' '}
                <Link href="/auth/forgot-password" className="text-dark-blue">
                  {t('PHONE')}
                </Link>
              </p>
            </div>
            <div className="w-100">
              <AppForm
                initialValues={{
                  email: '',
                }}
                validationSchema={validationSchema}
                fields={formFields}
                // buttonText={t('RESET_PASSWORD')}
                ActionComponent={ActionComponent}
                onSubmit={onSubmit}
              ></AppForm>
              <p className="mt-4 text-center">
                {t('REMEMBER_ME')}{' '}
                <Link href="/auth/login " className="text-dark-blue fw-bold ">
                  {t('LOGIN')}
                </Link>
              </p>
            </div>
          </React.Fragment>
        ) : (
          <div className="flex-col gap-3 auth-form">
            <ImageMaker src="/images/auth/sent.png" />

            <h4 className="text-black fw-normal px-3 ">{t('MESSAGE_WAS_SENDED')}</h4>
            <p className="text-center mb-3">{t('CHECK_EMAIL_BOX_MESSAGE')}</p>
            <Link href="/auth/login"></Link>
            <div className="flex-center gap-1">
              <p>{t('NO_EMAIL')}</p>
              <span className="border-bottom border-primary text-primary pointer">{t('RESEND')}</span>
            </div>
            <DividerText text={t('OR')} />
            <div className="flex-center gap-1">
              <p>{t('BACK_TO')}</p>
              <Link href="/auth/login" className="border-bottom border-primary text-primary pointer font-14">
                {t('LOGIN')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
