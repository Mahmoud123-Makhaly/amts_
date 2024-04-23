'use client';

import React from 'react';
import * as Yup from 'yup';
import { useLocale } from 'next-intl';
import { FormGroup, Input, Label } from 'reactstrap';
import { Field, FormikErrors, FormikHelpers, FormikValues, useFormikContext } from 'formik';

import { useTranslate } from '@app/hooks';
import { AppForm, ButtonMaker, CheckInput, FormFieldType, SubmitButton } from '@components';
import zones from '../../../../public/egypt.json';
import { appRegx } from '@libs/regx';
import { env } from '@libs';

interface IAddAddressProps {
  onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => Promise<any>;
  onCancel: () => void;
  initialValues?: {
    id: string;
    addressType: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    countryName: string;
    countryCode: string;
    postalCode: string;
    city: string;
    regionId: string;
    building: string;
    floor: string;
    flat: string;
    address: string;
  };
  className?: string;
}

const DependentField = () => {
  const { values } = useFormikContext<any>();
  const t = useTranslate('COMP_AddressForm');
  const locale: 'ar' | 'en' = useLocale() as 'ar' | 'en';
  const egyptCities = Object(zones)[env.NEXT_PUBLIC_STORE_ID] ?? zones['tot'];

  const DistrictOptions = () => (
    <React.Fragment>
      <option value="">{t('DEFAULT_SELECT')}</option>
      {egyptCities
        .find((city: Record<string, string>) => city.id === values.regionId)
        ?.districts.sort((a: Record<string, string>, b: Record<string, string>) => a[locale].localeCompare(b[locale]))
        .map((dist: { id: string; ar: string; en: string }) => (
          <option key={dist.id} value={dist.id}>
            {dist[locale]}
          </option>
        ))}
    </React.Fragment>
  );

  return values.regionId ? <DistrictOptions /> : <option value="">{t('DEFAULT_SELECT')}</option>;
};

const AddressForm = (props: IAddAddressProps) => {
  const { onSubmit, onCancel, initialValues, className } = props;
  const t = useTranslate('COMP_AddressForm');
  const locale: 'ar' | 'en' = useLocale() as 'ar' | 'en';
  const egyptCities = Object(zones)[env.NEXT_PUBLIC_STORE_ID] ?? zones['tot'];

  const CityOptions = () => (
    <React.Fragment>
      <option value="">{t('DEFAULT_SELECT')}</option>
      {egyptCities
        .sort((a: Record<string, string>, b: Record<string, string>) => a[locale].localeCompare(b[locale]))
        .map(
          (city: {
            id: string;
            ar: string;
            en: string;
            districts: {
              id: string;
              ar: string;
              en: string;
            }[];
          }) => (
            <option key={city.id} value={city.id}>
              {city[locale]}
            </option>
          ),
        )}
    </React.Fragment>
  );

  const formFields: Array<FormFieldType> = [
    {
      name: 'firstName',
      label: t('FIRST_NAME'),
      type: 'text',
      design: 'me-3',
      col: 6,
      autoComplete: 'given-name',
    },
    {
      name: 'lastName',
      label: t('LAST_NAME'),
      type: 'text',
      design: 'me-3',
      col: 6,
      autoComplete: 'family-name',
    },
    {
      name: 'phone',
      label: t('PHONE_NUMBER'),
      type: 'text',
      design: 'me-3',
      col: 6,
      autoComplete: 'tel',
    },
    {
      name: 'email',
      label: t('EMAIL'),
      type: 'email',
      design: 'me-3',
      col: 6,
      autoComplete: 'tel',
    },

    {
      name: 'regionId',
      label: t('REGION'),
      as: 'select',
      design: 'me-3',
      col: 6,
      children: CityOptions(),
      autoComplete: 'address-level1',
    },
    {
      name: 'city',
      label: t('CITY'),
      as: 'select',
      design: 'me-3',
      col: 6,
      children: <DependentField />,
      autoComplete: 'address-level2',
    },
    {
      name: 'address',
      label: t('LINE1'),
      type: 'text',
      design: 'me-3',
      autoComplete: 'address-level3',
    },
    {
      name: 'building',
      label: t('BUILDING'),
      type: 'text',
      design: 'me-3',
      div: 4,
      autoComplete: 'on',
      col: 4,
    },
    {
      name: 'floor',
      label: t('FLOOR'),
      type: 'text',
      design: 'me-3',
      div: 4,
      autoComplete: 'on',
      col: 4,
    },
    {
      name: 'flat',
      label: t('FLAT'),
      type: 'text',
      design: 'me-3',
      div: 4,
      autoComplete: 'on',
      col: 4,
    },
    {
      name: 'countryName',
      label: '',
      type: 'hidden',
      value: 'Egypt',
    },
    {
      name: 'countryCode',
      label: '',
      type: 'hidden',
      value: 'EGY',
    },
    {
      name: 'postalCode',
      label: '',
      type: 'hidden',
      value: '0020',
    },
    {
      name: 'id',
      label: '',
      type: 'hidden',
    },
  ];

  const defaultValues = {
    id: '',
    addressType: '',
    firstName: '',
    lastName: '',
    phone: '',
    regionId: '',
    city: '',
    address: '',
    countryName: 'Egypt',
    countryCode: 'EGY',
    postalCode: '0020',
  };

  const validationSchema = Yup.object().shape({
    addressType: Yup.string().min(1).required(t('REQUIRED_CITY')),
    firstName: Yup.string()
      .min(3, t('ERR_FIRST_NAME_MIN', { length: 3 }))
      .max(128, t('ERR_FIRST_NAME_MAX', { length: 128 }))
      .required(t('REQUIRED_FIRST_NAME')),
    lastName: Yup.string()
      .min(3, t('ERR_LAST_NAME_MIN', { length: 3 }))
      .max(128, t('ERR_LAST_NAME_MAX', { length: 128 }))
      .required(t('REQUIRED_LAST_NAME')),
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    phone: Yup.string().required(t('REQUIRED_PHONE_NUMBER')).matches(appRegx.PhoneRegExp, t('INVALID_PHONE_NUMBER')),
    regionId: Yup.string().required(t('REQUIRED_CITY')),
    city: Yup.string().required(t('REQUIRED_DISTRICT')),
    building: Yup.string().required(t('REQUIRED_BUILDING_NUMBER')),
    floor: Yup.string().required(t('REQUIRED_FLOOR_NUMBER')),
    flat: Yup.string().required(t('REQUIRED_FLAT_NUMBER')),
    address: Yup.string().required(t('REQUIRED_ADDRESS')),
  });

  const CancelBtn = ({
    children,
    isValid,
    dirty,
    isSubmitting,
  }: {
    children: React.ReactNode;
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
  }) => (
    <React.Fragment>
      <div className="flex-center">
        <SubmitButton
          text={t('SAVE')}
          design="text-white border-0 py-0"
          disabled={!isValid || !dirty || isSubmitting}
          isLoading={isSubmitting}
        />
        <ButtonMaker
          block={false}
          text={t('CANCEL')}
          design="my-2 text-primary  ms-3"
          type="button"
          onClick={onCancel}
          outline={true}
        />
      </div>
    </React.Fragment>
  );

  const FieldComponents = ({
    children,
    values,
    errors,
  }: {
    children: React.ReactNode;
    values: FormikValues;
    errors: FormikErrors<FormikValues>;
  }) => (
    <React.Fragment>
      <FormGroup>
        <div
          className="d-flex align-items-center gap-3"
          role="group"
          aria-labelledby="addressType"
          defaultValue={initialValues?.addressType ?? defaultValues.addressType}
        >
          <CheckInput
            name="addressType"
            id="addressType-home"
            value="2"
            type="radio"
            as="field"
            className="border border-primary rounded p-2 d-flex gap-1 align-items-center address-type"
          >
            <i className="fa-solid fa-house fs-3 me-2"></i>
            <p>{t('HOME')}</p>
          </CheckInput>
          <CheckInput
            name="addressType"
            id="addressType-work"
            value="1"
            type="radio"
            as="field"
            className="border border-primary rounded p-2 d-flex gap-1 align-items-center address-type"
          >
            <i className="fa-solid fa-briefcase fs-3 me-2"></i>
            <p>{t('WORK')}</p>
          </CheckInput>
        </div>
        {errors.addressType && <small className="text-danger">{t('REQUIRED_ADDRESS_TYPE')}</small>}
      </FormGroup>
      {children}
      {/* <div className="d-flex align-items-center gap-3 mb-3">
        <Input type="checkbox" id="default" />
        <label htmlFor="default" className="text-medium-gray">
          {t('Default_ADDRESS')}
        </label>
      </div> */}
    </React.Fragment>
  );

  return (
    <div>
      <div className={`paddingy-32 paddingx-42 mb-4 ${className}`}>
        <AppForm
          initialValues={initialValues ?? defaultValues}
          validationSchema={validationSchema}
          fields={formFields}
          buttonText={t('SAVE')}
          onSubmit={(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
            return onSubmit(
              {
                ...values,
                regionName: egyptCities.find((city: Record<string, string>) => city.id === values.regionId).en,
              },
              formikHelpers,
            );
          }}
          ActionComponent={CancelBtn}
          FieldComponent={FieldComponents}
        />
      </div>
    </div>
  );
};

export default AddressForm;
