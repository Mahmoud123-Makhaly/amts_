'use client';

import React from 'react';
import * as Yup from 'yup';
import { FormikErrors, FormikHelpers } from 'formik';

import { Actions } from '@libs/actions';
import { AppForm, ButtonMaker, FormFieldType, FormikValues, SubmitButton } from '@components';
import { useTranslate, useToast, usePaymentPage } from '@app/hooks';
import { useRouter } from '@navigation';
import { DTO } from '@tot/core/types';
import { appRegx } from '@libs/regx';
import { Utils } from '@libs';

import ProcessedOrder from './ProcessedOrder';

interface IProcessedOrderFormFormProps {
  cart: DTO.ICartDTO;
}

const ProcessedOrderForm = ({ cart }: IProcessedOrderFormFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const t = useTranslate('COMP_Checkout');
  const paymentGateway = usePaymentPage();

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

  const onCheckout = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (
      (cart.total?.amount ?? 0) > 0 &&
      (cart.items?.length ?? 0) > 0 &&
      (cart.shipments?.length ?? 0) > 0 &&
      cart.shipments?.at(0)?.deliveryAddress
    ) {
      const { data: checkoutStatus } = await Actions.cart.checkout();
      if (!checkoutStatus?.data) formikHelpers.setFieldError('errorSummary', checkoutStatus?.error?.message);
      else {
        const { data: order, serverError, validationErrors } = await Actions.cart.createOrderFromCart(cart.id!);
        if (!order?.data || !order.data.number || !order.data.inPayments.at(0)!.gatewayCode) {
          toast.error(t('GENERIC_ERR_MSG'));
        } else {
          const {
            data: orderSource,
            serverError: orderSourceServerError,
            validationErrors: orderSourceValidationErrors,
          } = await Actions.order.updateOrderSource({
            orderId: order.data.id,
          });
          const {
            data: paymentHasGateway,
            serverError,
            validationErrors,
          } = await Actions.payment.isPaymentMethodHasGateway({
            methodName: order.data.inPayments.at(0)!.gatewayCode!,
          });
          if (paymentHasGateway?.data) {
            const {
              data: paymentConfiguration,
              serverError,
              validationErrors,
            } = await Actions.payment.loadConfiguration({
              methodName: 'QnbMethod',
              params: { orderId: order.data.id },
            });
            if (paymentConfiguration?.data) {
              paymentGateway.pay('QnbMethod', paymentConfiguration.data);
            }
          } else {
            router.replace(`/order-confirmed/${order.data.id}`);
          }
        }
      }
    } else formikHelpers.setFieldError('errorSummary', t('INVALID_ITEMS_SHIPMENTS_MSG'));
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
          design="text-white bg-primary p-2 pointer"
          onClick={() => router.replace('/checkout/add-payment')}
        />
        <SubmitButton
          design="text-white border-0 d-flex align-items-center gap-1"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          <p>{t('COMPLETE_PURCHASE')}</p>
          <i className="fa-solid fa-xs fa-arrow-right border rounded-circle outline-icon-20"></i>
        </SubmitButton>
      </div>
    );
  };

  const initialValues = {
    deliveryAddress: {
      ...cart.shipments?.at(0)?.deliveryAddress,
      ...Object(Utils.addressFormatter('extract', cart.shipments?.at(0)?.deliveryAddress?.formattedAddress ?? '')),
    },
    cartShipmentMethod:
      cart.shipments?.at(0)?.shipmentMethodCode ?? (cart.availableShippingMethods?.length ?? 0) <= 1
        ? cart.availableShippingMethods?.at(0)?.code
        : undefined,
  };

  return (
    <AppForm
      fields={formFields}
      initialValues={initialValues}
      onSubmit={onCheckout}
      validationSchema={validationSchema}
      ActionComponent={ActionComponent}
      formClassName="w-100"
    >
      <ProcessedOrder address={cart?.shipments?.at(0)?.deliveryAddress} cart={cart} />
    </AppForm>
  );
};

export default ProcessedOrderForm;
