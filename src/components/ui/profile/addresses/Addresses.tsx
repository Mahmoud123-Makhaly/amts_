'use client';

import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useSession } from 'next-auth/react';
import { FormikHelpers } from 'formik';

import { ButtonMaker, FormikValues, AddressForm, EmptyAddress, Map } from '@components';
import { Actions } from '@libs/actions';
import { useTranslate, useToast } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Utils } from '@libs';

import AddressItem from './AddressItem';
import Empty from './Empty';

const Addresses = ({ data }: { data?: Array<DTO.IMemberAddressDTO> }) => {
  const t = useTranslate('COMP_Addresses');
  const { data: session } = useSession();
  const toast = useToast();
  const [addAddress, setAddAddress] = useState<{
    displayAddressForm: boolean;
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
  }>({ displayAddressForm: false });

  const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const _updatedAddress = {
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
    };

    const updateMyAddressesStatus = values.id
      ? await Actions.account.updateMyAddress({ memberId: session?.user?.memberId!, address: _updatedAddress })
      : await Actions.account.addMyAddress({ memberId: session?.user?.memberId!, address: _updatedAddress });

    if (
      updateMyAddressesStatus.data?.error ||
      updateMyAddressesStatus.serverError ||
      updateMyAddressesStatus.validationErrors
    ) {
      formikHelpers.setFieldError('errorSummary', t('GENERIC_ERR_MSG'));

      return false;
    } else {
      toast.success(t(`SUCCESS_${values.id ? 'UPDATE' : 'ADD'}_MSG`));
      setAddAddress({ displayAddressForm: false });
    }
  };

  const backToAddresses = () => {
    setAddAddress({ displayAddressForm: false });
  };

  const onEdit = (address: DTO.IMemberAddressDTO) => {
    const _address = {
      id: address.id ?? '',
      addressType: address.addressType?.toString() ?? '',
      firstName: address.firstName ?? '',
      lastName: address.lastName ?? '',
      phone: address.phone ?? '',
      email: address.email ?? '',
      countryName: address.countryName ?? 'Egypt',
      countryCode: address.countryCode ?? 'EGY',
      postalCode: address.city ?? '00202',
      regionId: address.regionId ?? '',
      city: address.city ?? '',
      address: address.address,
      building: address.building,
      floor: address.floor,
      flat: address.flat,
    };
    setAddAddress({ displayAddressForm: true, initialValues: _address });
  };

  return (
    <React.Fragment>
      <Row className="my-5">
        {!addAddress.displayAddressForm && (
          <React.Fragment>
            {data && data.length ? (
              data.map((address, index) => (
                <Col md={12} key={index}>
                  <AddressItem address={address} onEdit={onEdit} />
                </Col>
              ))
            ) : (
              <Empty />
            )}
            <Col md={12} className="d-flex justify-content-center">
              <ButtonMaker
                className="d-flex text-white py-2 px-4 rounded gap-2 align-items-center"
                onClick={() => setAddAddress({ displayAddressForm: true })}
              >
                <p>{t('ADD_NEW_ADDRESS')}</p>
                <i className="fa-solid fa-plus font-10 border border-white rounded-circle outline-icon-20"></i>
              </ButtonMaker>
            </Col>
          </React.Fragment>
        )}
        {addAddress.displayAddressForm && (
          <React.Fragment>
            <Col md={12}>
              <Map imgSrc="/images/map.jpg" />
            </Col>
            <Col md={12}>
              <AddressForm
                onSubmit={onSubmit}
                initialValues={addAddress.initialValues}
                onCancel={backToAddresses}
                className="rounded"
              />
            </Col>
          </React.Fragment>
        )}
      </Row>
    </React.Fragment>
  );
};

export default Addresses;
