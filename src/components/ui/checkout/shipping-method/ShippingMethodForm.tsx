'use client';
import React from 'react';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import { FormikErrors, FormikHelpers, FormikValues } from 'formik';

import { Utils } from '@libs';
import { useRouter } from '@navigation';
import { appRegx } from '@libs/regx';
import { DTO } from '@tot/core/types';
import { Actions } from '@libs/actions';
import { useTranslate, useAppStore, useToast } from '@app/hooks';
import { AppForm, ButtonMaker, FormFieldType, SubmitButton } from '@components';

import ShippingMethod from './ShippingMethod';

interface IShippingMethodFormProps {
  cart: DTO.ICartDTO;
  availableAddresses?: DTO.IMemberAddressDTO[] | undefined;
}

const ShippingMethodForm = ({ cart, availableAddresses }: IShippingMethodFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslate('COMP_Checkout');
  const { changePreloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
  }));

  const formFields: Array<FormFieldType> = [
    {
      name: 'deliveryAddress',
      type: 'hidden',
    },
    {
      name: 'cartShipmentMethod',
      type: 'hidden',
    },
  ];

  const onSubmitOrChangeShipment = async (method: DTO.IShippingMethodTypeDTO, address?: DTO.IMemberAddressDTO) => {
    changePreloader && changePreloader('disable');

    if (session?.isAuthorized && session?.user?.memberId && address) {
      try {
        const updateMyAddressesStatus = address.id
          ? Actions.account.updateMyAddress({
              memberId: session?.user?.memberId!,
              address: { ...address, key: address.id },
            })
          : Actions.account.addMyAddress({ memberId: session?.user?.memberId!, address: address });
      } catch (exc) {}
    }

    const shipment = {
      id: cart.shipments?.at(0)?.id,
      shipmentMethodCode: method.code!,
      deliveryAddress: address
        ? {
            ...address,
            key: cart.shipments?.at(0)?.deliveryAddress?.id,
            id: cart.shipments?.at(0)?.deliveryAddress?.id,
          }
        : undefined,
    };

    const {
      data: updatedCart,
      validationErrors,
      serverError,
    } = await Actions.cart.addOrUpdateDefaultCartShipment({ cartId: cart.id!, type: 'full', shipment });

    if (updatedCart?.data) window.location.reload();
    else {
      toast.error(t('GENERIC_ERR_MSG'));
    }

    changePreloader && changePreloader('disable');
  };

  const onSubmit = async (values: any, formikHelpers: FormikHelpers<FormikValues>) => {
    router.replace('/checkout/add-payment');
  };

  const addressSchema = Yup.object().shape({
    addressType: Yup.string().min(1).required(t('REQUIRED_SHIPMENT_ADDRESS')),
    firstName: Yup.string()
      .min(3, t('REQUIRED_SHIPMENT_ADDRESS', { length: 3 }))
      .max(128, t('REQUIRED_SHIPMENT_ADDRESS', { length: 128 }))
      .required(t('REQUIRED_SHIPMENT_ADDRESS')),
    lastName: Yup.string()
      .min(3, t('REQUIRED_SHIPMENT_ADDRESS', { length: 3 }))
      .max(128, t('REQUIRED_SHIPMENT_ADDRESS', { length: 128 }))
      .required(t('REQUIRED_SHIPMENT_ADDRESS')),
    email: Yup.string().email(t('REQUIRED_SHIPMENT_ADDRESS')).required(t('REQUIRED_SHIPMENT_ADDRESS')),
    phone: Yup.string()
      .required(t('REQUIRED_SHIPMENT_ADDRESS'))
      .matches(appRegx.PhoneRegExp, t('REQUIRED_SHIPMENT_ADDRESS')),
    regionId: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
    city: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
    building: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
    floor: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
    flat: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
    address: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
  });

  const validationSchema = Yup.object().shape({
    deliveryAddress: addressSchema,
    cartShipmentMethod: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
  });

  const initialValues = {
    deliveryAddress: {
      ...cart?.shipments?.at(0)?.deliveryAddress,
      ...Object(Utils.addressFormatter('extract', cart.shipments?.at(0)?.deliveryAddress?.formattedAddress ?? '')),
    },
    cartShipmentMethod:
      cart.shipments?.at(0)?.shipmentMethodCode ?? (cart.availableShippingMethods?.length ?? 0) <= 1
        ? cart.availableShippingMethods?.at(0)?.code
        : undefined,
  };

  const ActionComponent = ({
    children,
    isValid,
    isSubmitting,
    errors,
  }: {
    children: React.ReactNode;
    isValid: boolean;
    isSubmitting: boolean;
    errors: FormikErrors<FormikValues>;
  }) => {
    return (
      <div className="my-3 d-flex align-items-center justify-content-end gap-3">
        <ButtonMaker
          text={t('CANCEL')}
          type="button"
          design="text-white border py-2 px-3 pointer"
          onClick={() => router.back()}
        />
        <SubmitButton
          design="text-white border-0 d-flex align-items-center gap-2"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          <p className="text-white">{t('NEXT')}</p>
          <i className="fa-solid fa-xs fa-arrow-right border rounded-circle outline-icon-20"></i>
        </SubmitButton>
      </div>
    );
  };

  const FieldComponent = ({ errors }: { errors: FormikErrors<FormikValues> }) => {
    return (
      <React.Fragment>
        <ShippingMethod
          cart={cart}
          onSubmitOrChangeShipment={onSubmitOrChangeShipment}
          availableAddresses={availableAddresses}
        />
        {errors.deliveryAddress && <small className="text-danger ps-3">{t('INVALID_ITEMS_SHIPMENTS_MSG')}</small>}
      </React.Fragment>
    );
  };

  return (
    <AppForm
      formClassName="w-100"
      fields={formFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      ActionComponent={ActionComponent}
      FieldComponent={FieldComponent}
    ></AppForm>
  );
};

export default ShippingMethodForm;
