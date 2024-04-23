'use client';

import React, { useState } from 'react';
import { Row, Col, Input } from 'reactstrap';
import Image from 'next/image';

import { DTO } from '@tot/core/types';
import { usePathname } from '@navigation';
import { useTranslate } from '@app/hooks';
import { ButtonMaker, CartSummaryMaker, CheckoutStepper } from '@components';

import { PaymentMethodForm } from './payment-method';
import { ShippingMethodForm } from './shipping-method';
import { ProcessedOrderForm } from './processed-order';
import { OrderSummary } from './order-summary';

let active: number;

const Checkout = ({
  data: cart,
  availableAddresses,
  order,
}: {
  order?: DTO.IInvoiceDTO | undefined;
  data?: DTO.ICartDTO | undefined;
  availableAddresses?: Array<DTO.IMemberAddressDTO> | undefined;
}) => {
  const t = useTranslate('COMP_Checkout');
  const pathname = usePathname();
  const [remove, setRemove] = useState(true);

  const orderReviewSummary = [
    {
      text: t('SUB_TOTAL'),
      price: cart?.subTotal?.formattedAmount
        ? cart?.subTotal?.formattedAmount
        : order?.subTotal?.formattedAmount
          ? order?.subTotal?.formattedAmount
          : 0,
    },
    {
      text: t('DISCOUNT'),
      price: cart?.discountTotalWithTax?.formattedAmount
        ? cart?.discountTotalWithTax?.formattedAmount
        : order?.discountTotalWithTax?.formattedAmount
          ? order?.discountTotalWithTax?.formattedAmount
          : 0,
    },
    {
      text: t('SHIPPING_FEES'),
      price: cart?.shippingTotal?.formattedAmount
        ? cart?.shippingTotal?.formattedAmount
        : order?.shippingTotal?.formattedAmount
          ? order?.shippingTotal?.formattedAmount
          : 0,
    },
    {
      text: t('TOTAL'),
      price: cart?.total?.formattedAmount
        ? cart?.total?.formattedAmount
        : order?.total?.formattedAmount
          ? order?.total?.formattedAmount
          : 0,
    },
  ];

  if (pathname.includes('add-address')) {
    active = 0;
  } else if (pathname.includes('add-payment')) {
    active = 1;
  } else if (pathname.includes('processed-order')) {
    active = 2;
  } else if (pathname.includes('order-summary')) {
    active = 3;
  }

  return (
    <Row className="pt-4">
      <Col md={8}>
        <CheckoutStepper activeStep={active}>
          <ShippingMethodForm cart={cart!} availableAddresses={availableAddresses} />
          <PaymentMethodForm cart={cart!} />
          <ProcessedOrderForm cart={cart!} />

          <OrderSummary order={order} />
        </CheckoutStepper>
      </Col>
      <Col md={4} className="mb-3">
        <CartSummaryMaker
          className="rounded border bg-light-gray"
          items={orderReviewSummary}
          header={
            <div className="flex-between pb-4 border-bottom">
              <p className="fw-semibold">{t('TOTAL_ITEMS')}</p>
              <p className="text-dark-gray">{cart?.itemsQuantity}</p>
            </div>
          }
          footer={
            <div className="flex-between pt-4 border-top mt-4">
              <p className="fw-semibold">{t('TOTAL_ORDER')}</p>
              <p className="text-dark-gray fw-bold">{cart?.total?.formattedAmount}</p>
            </div>
          }
        ></CartSummaryMaker>
        <div className="flex-between mt-3  position-relative">
          <Input placeholder={t('ENTER_COUPON')} className="me-2 py-2 pe-3 ps-5" />
          <div className="px-3 position-absolute start-0">
            <Image src="/images/cart/ri.svg" alt="input-icon" width={24} height={24} />
          </div>
          <ButtonMaker text={t('APPLY')} design="  py-2 px-3" onClick={() => setRemove(true)} />
        </div>
      </Col>
    </Row>
  );
};

export default Checkout;
