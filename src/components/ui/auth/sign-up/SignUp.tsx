'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Col, FormGroup, Row } from 'reactstrap';
import { ErrorMessage, Field, FormikHelpers } from 'formik';

import { Link, useRouter } from '@navigation';
import { Actions } from '@libs/actions';
import { useTranslate } from '@app/hooks';
import { appRegx } from '@libs/regx';
import { FormFieldType, AppForm, Modal, SubmitButton } from '@components';
import { usePathname } from '@navigation';

import SocialLogin from '../SocialLogin';
import ConfirmModal from './ConfirmModal';
import { Divider } from 'primereact/divider';

const SignUp = () => {
  const t = useTranslate('COMP_SignUpForm');
  const [successModal, setSuccessModal] = useState(false);

  const FormFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL_ADDRESS'),
      type: 'text',
    },
    {
      name: 'firstName',
      label: t('FIRST_NAME'),
      type: 'text',
      col: 6,
    },
    {
      name: 'lastName',
      label: t('LAST_NAME'),
      type: 'text',
      col: 6,
    },

    {
      name: 'password',
      label: t('PASSWORD'),
      type: 'password',
    },
    {
      name: 'confirmPassword',
      label: t('CONFIRM_PASSWORD'),
      type: 'password',
    },
  ];

  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const { firstName, lastName, email, password, termsAndConditions, organizationName } = values;
    const isEmailUnique = await Actions.account.checkEmailUniqueness(email);
    if (isEmailUnique.data?.error || isEmailUnique.serverError || isEmailUnique.validationErrors) {
      formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
    } else if (isEmailUnique.data?.data) {
      const result = await Actions.account.signUp({
        firstName,
        lastName,
        email,
        password,
        termsAndConditions,
      });
      if (result.data?.error || result.serverError || result.validationErrors) {
        formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));
      } else {
        setSuccessModal(true);
      }
    } else {
      formikHelpers.setFieldError('email', t('ALREADY_EMAIL_EXISTS'));
    }
  };

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('REQUIRED_FIRST_NAME')),
    lastName: Yup.string().required(t('REQUIRED_LAST_NAME')),
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    password: Yup.string().required(t('REQUIRED_PASSWORD')).matches(appRegx.PasswordRegExp, t('PASSWORD_REGX_MESSAGE')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('REQUIRED_PASSWORD')),
    termsAndConditions: Yup.boolean()
      .oneOf([true], t('REQUIRED_TERMS_CONDITIONS'))
      .required(t('REQUIRED_TERMS_CONDITIONS')),
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
      <SubmitButton
        design="text-white border-0 py-0 flex-center"
        disabled={!isValid || !dirty || isSubmitting}
        isLoading={isSubmitting}
        block={true}
      >
        {t('SIGNUP')}
      </SubmitButton>
    </div>
  );
  return (
    <div className="flex-col">
      <Modal isOpen={successModal}>
        <ConfirmModal />
      </Modal>

      <div className="auth-form ">
        <Row>
          <Col>
            <h4 className="auth-header">{t('SIGNUP')}</h4>
            <Divider />
          </Col>
        </Row>
        <AppForm
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAndConditions: false,
          }}
          validationSchema={ValidationSchema}
          fields={FormFields}
          ActionComponent={ActionComponent}
          onSubmit={onSubmit}
        >
          <FormGroup>
            <div className="flex gap-2 my-2">
              <Field type="checkbox" name="termsAndConditions" className="form-check-input" />
              <div className="fw-semibold">
                <label htmlFor="termsAndConditions" className="px-1">
                  {t('ACCEPT')}
                </label>
                <Link
                  href={'/content/terms-and-conditions'}
                  target="_blank"
                  className=" text-primary border-bottom border-primary"
                >
                  {t('TERMS_AND_CONDITIONS')}
                </Link>
              </div>
            </div>
            <ErrorMessage name="termsAndConditions" component="small" className="text-danger" />
          </FormGroup>
        </AppForm>
        <p className="mt-4 text-center">
          {t('HAVE_AN_ACCOUNT')}
          <Link className="fw-bold font-14 ms-1" href={'/auth/login'}>
            {t('LOGIN')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
