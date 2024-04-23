'use client';

import React from 'react';
import { FormikHelpers } from 'formik';

import { FormikValues, AddressForm } from '@components';
import { useAppStore } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Utils } from '@libs';

const AddOrEditAddress = ({
  data,
  onAddressAddOrChange,
  cancel,
}: {
  data?: DTO.IMemberAddressDTO;
  onAddressAddOrChange: (address: DTO.IMemberAddressDTO) => Promise<void>;
  cancel: () => void;
}) => {
  const { changePreloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
  }));

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    changePreloader && changePreloader('enable');
    const _updatedAddress: DTO.IMemberAddressDTO = {
      key: values.id ?? undefined,
      addressType: Number.parseInt(values.addressType),
      firstName: Utils.convertArabicToEnglish(values.firstName),
      lastName: Utils.convertArabicToEnglish(values.lastName),
      phone: Utils.convertArabicToEnglish(values.phone),
      email: Utils.convertArabicToEnglish(values.email),
      countryName: Utils.convertArabicToEnglish(values.countryName),
      countryCode: Utils.convertArabicToEnglish(values.countryCode),
      postalCode: Utils.convertArabicToEnglish(values.city),
      city: Utils.convertArabicToEnglish(values.city),
      regionId: Utils.convertArabicToEnglish(values.regionId),
      regionName: Utils.convertArabicToEnglish(values.regionName),
      address: Utils.convertArabicToEnglish(values.address),
      building: Utils.convertArabicToEnglish(values.building),
      floor: Utils.convertArabicToEnglish(values.floor),
      flat: Utils.convertArabicToEnglish(values.flat),
    } as DTO.IMemberAddressDTO;
    onAddressAddOrChange(_updatedAddress);
  };

  return (
    <AddressForm
      onSubmit={onSubmit}
      initialValues={{
        id: data?.id ?? '',
        addressType: data?.addressType?.toString() ?? '',
        firstName: data?.firstName ?? '',
        lastName: data?.lastName ?? '',
        phone: data?.phone ?? '',
        email: data?.email ?? '',
        countryName: data?.countryName ?? 'Egypt',
        countryCode: data?.countryCode ?? 'EGY',
        postalCode: data?.city ?? '00202',
        regionId: data?.regionId ?? '',
        city: data?.city ?? '',
        address: data?.address ?? '',
        building: data?.building ?? '',
        floor: data?.floor ?? '',
        flat: data?.flat ?? '',
      }}
      onCancel={cancel}
    />
  );
};

export default AddOrEditAddress;
