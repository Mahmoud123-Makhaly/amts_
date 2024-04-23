'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { DTO } from '@tot/core/types';
import { Actions } from '@libs/actions';
import { useTranslate, useAppStore, useToast, usePaymentPage } from '@app/hooks';
import { AppForm, ButtonMaker, FormFieldType, SubmitButton } from '@components';
import PaymentMethod from './PaymentMethod';
import { FormikErrors, FormikHelpers, FormikValues } from 'formik';
import { useRouter } from '@navigation';

interface IPaymentMethodFormProps {
  cart: DTO.ICartDTO;
}

const PaymentMethodForm = ({ cart }: IPaymentMethodFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const t = useTranslate('COMP_Checkout');

  const { changePreloader } = useAppStore(state => ({
    changePreloader: state.layout.changePreloader,
  }));

  const [selectedPayment, setSelectedPayment] = useState<DTO.IPaymentMethodTypeDTO | undefined>(
    cart.availablePaymentMethods?.find(
      item => item.code === (cart.payments?.at(0)?.paymentGatewayCode ?? 'DefaultManualPaymentMethod'),
    ),
  );

  const formFields: Array<FormFieldType> = [
    {
      name: 'cartPaymentMethod',
      type: 'hidden',
    },
  ];

  const validationSchema = Yup.object().shape({
    cartPaymentMethod: Yup.string().required(t('REQUIRED_SHIPMENT_ADDRESS')),
  });

  const applyPayment = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    const payment = {
      id: cart.payments?.at(0)?.id,
      paymentGatewayCode: selectedPayment?.code ?? '',
      amount: cart.total!.amount,
      billingAddress: {
        ...cart.shipments!.at(0)!.deliveryAddress!,
        id: cart.payments?.at(0)?.billingAddress?.id,
      },
    };

    const {
      data: updatedCart,
      validationErrors,
      serverError,
    } = await Actions.cart.addOrUpdateDefaultCartPayment({ cartId: cart.id!, type: 'full', payment });
    if (updatedCart?.data) {
      router.replace('/checkout/processed-order');
    } else {
      toast.error(t('GENERIC_ERR_MSG'));
    }

    changePreloader && changePreloader('disable');
  };

  const initialValues = {
    cartPaymentMethod: selectedPayment?.code,
  };

  const onChangePayment = (method: DTO.IPaymentMethodTypeDTO, address?: DTO.IMemberAddressDTO) => {
    setSelectedPayment(method);
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
          text={t('BACK')}
          type="button"
          design="text-white border py-2 px-3 pointer"
          onClick={() => router.replace('/checkout/add-address')}
        />
        <SubmitButton
          design="text-white border-0 d-flex align-items-center gap-1"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          <p>{t('NEXT')}</p>
          <i className="fa-solid fa-xs fa-arrow-right border rounded-circle outline-icon-20"></i>
        </SubmitButton>
      </div>
    );
  };

  const FieldComponent = ({ errors }: { errors: FormikErrors<FormikValues> }) => {
    return (
      <React.Fragment>
        <PaymentMethod cart={cart} onSubmitOrChangePayment={onChangePayment} />
        {errors.cartPaymentMethod && <small className="text-danger ps-3">{t('INVALID_ITEMS_SHIPMENTS_MSG')}</small>}
      </React.Fragment>
    );
  };

  return (
    <AppForm
      fields={formFields}
      initialValues={initialValues}
      onSubmit={applyPayment}
      validationSchema={validationSchema}
      ActionComponent={ActionComponent}
      formClassName="w-100"
      FieldComponent={FieldComponent}
    ></AppForm>
  );
};

export default PaymentMethodForm;
