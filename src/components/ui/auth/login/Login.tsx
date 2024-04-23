'use client';

import React from 'react';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { Field, FormikHelpers } from 'formik';
import { useSearchParams } from 'next/navigation';

import { FormFieldType, AppForm, SubmitButton } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';
import { Link } from '@navigation';
import { Utils } from '@libs';

import SocialLogin from '../SocialLogin';
import Image from 'next/image';
import { Divider } from 'primereact/divider';
import { Col, Row } from 'reactstrap';

const Login = () => {
  const t = useTranslate('COMP_LoginForm');
  const searchParams = useSearchParams();
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL'),
      type: 'text',
      design: 'mb-0',
    },
    {
      name: 'password',
      label: t('PASSWORD'),
      type: 'password',
    },
  ];
  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const {
      data: jwt,
      validationErrors: jwtValidationError,
      serverError: jwtServerError,
    } = await Actions.account.login({ email: values.email, password: values.password });

    if (!jwt?.data || jwt?.error || jwtValidationError || jwtServerError) {
      if (
        jwt &&
        Utils.hasPropertyWithSpecificValue(
          { ...jwt.error },
          'errorDescription',
          'The username/password couple is invalid.',
        )
      )
        formikHelpers.setFieldError('errorSummary', t('INVALID_EMAIL_OR_PASSWORD'));
      else formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
    } else {
      const {
        data: user,
        validationErrors: userValidationError,
        serverError: userServerError,
      } = await Actions.account.getCurrentUser({ accessToken: jwt?.data?.accessToken });

      if (!user?.data || user?.error || userValidationError || userServerError) {
        formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      } else {
        const session = { jwt: jwt.data, user: user.data };
        const setupSessionStatus = await Actions.session.setupSession(session.user);
        signIn('default', {
          jwt: JSON.stringify(session.jwt),
          user: JSON.stringify(session.user),
          callbackUrl: new URL(searchParams.get('redirectURL') || '', window.location.origin).toString(),
        });
      }
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    password: Yup.string().required(t('REQUIRED_PASSWORD')),
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
    <div className="align-items-center">
      <SubmitButton design=" py-0" disabled={!isValid || !dirty || isSubmitting} isLoading={isSubmitting} block={true}>
        {t('LOGIN')}
      </SubmitButton>
    </div>
  );
  return (
    <div className="auth-form">
      <Row>
        <Col>
          <h5 className="auth-header fw-semibold m-0">{t('GREETING')}</h5>
          <Divider />
        </Col>
      </Row>
      <AppForm
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        fields={formFields}
        ActionComponent={ActionComponent}
        onSubmit={onSubmit}
      >
        <div className="flex-between mb-4 flex-wrap">
          <div className="d-flex align-items-center pe-2 ">
            <Field
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              title={t('REMEMBER_ME')}
              className="me-2 text-dark-blue form-check-input border-primary mt-0"
            />
            <label htmlFor="rememberMe" className="mb-0">
              {t('REMEMBER_ME')}
            </label>
          </div>
          <Link className="border-bottom border-dark-blue" href={`/auth/forgot-password`}>
            {t('DID_FORGOT_PASSWORD')}
          </Link>
        </div>
      </AppForm>
      {/* <SocialLogin /> */}
      <div className="flex-center mt-4 gap-1">
        <h6 className="text-black fw-normal m-0 ">{t('DONT_HAVE_EMAIL')}</h6>
        <Link className="font-14 fw-bold" href={'/auth/sign-up'}>
          {t('SIGNUP')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
