'use client';
import React from 'react';
import { Alert, Input, Label } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, CartSummary, TimeLine } from '@components';

import CompletedInspectionCard from './CompletedInspectionCard';

interface IPaymentProps {
  SetToggleShow: React.Dispatch<
    React.SetStateAction<'completed' | 'booking-services' | 'payment' | 'booking-successfully'>
  >;
}
const Payment = (props: IPaymentProps) => {
  const { SetToggleShow } = props;
  const t = useTranslate('COMP_PAYMENT');
  const data = {
    details: [
      {
        label: t('BOOKING_DATE'),
        value: ': 20/7/2024',
      },
      {
        label: t('PRICE'),
        value: ': 150 AED',
      },
      {
        label: t('LOCATION'),
        value: ': Ras el khema , UAE',
      },
      {
        label: t('CUSTOMER'),
        value: ': Mohamed . Moh@gmail.com . (+971) 600 555 555',
      },
    ],
  };
  const orderReviewSummary = [
    {
      text: t('SERVICES_PROVIDER'),
      price: 'Ahmed',
    },
    {
      text: t('SUB_TOTAL'),
      price: '150.00 AED',
    },
    {
      text: t('COUPON_DISCOUNT'),
      price: '5.00 AED',
    },
    {
      text: t('SERVICES_CHARGE'),
      price: '10.00 AED',
    },
    {
      text: t('TOTAL'),
      price: '150.00 AED',
    },
  ];
  const orderEvents = [
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('APPOINTMENT'),
    },
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('PAYMENT'),
    },
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('DONE'),
    },
  ];
  return (
    <div className="border rounded p-4">
      <h4 className="font-24 fw-semibold mb-0">{t('BOOK_SERVICES')}</h4>
      <TimeLine events={orderEvents} activeIndex={0} activeColor="primary" restColor="medium-gray" mode="cumulative" />
      <CompletedInspectionCard data={data} className="border-top border-bottom " />

      <div>
        <div className="mb-3 border rounded py-2  ">
          <div className="pointer px-3">
            <Input id="visa" className="form-check-input pointer" type="radio" name="payment" />

            <Label htmlFor="visa" className="text-gray ms-2 mb-0 pointer">
              {t('CASH')}
            </Label>
          </div>
        </div>

        <div className="mb-3 border rounded py-2  ">
          <div className="pointer px-3">
            <Input id="debit" className="form-check-input pointer" type="radio" name="payment" />

            <Label htmlFor="debit" className="text-gray ms-2 mb-0 pointer">
              {t('CREDIT_DEDIT_CARD')}
            </Label>
          </div>
        </div>
        <CartSummary data={orderReviewSummary} className="cart-summary" />
        <div className="flex-between mt-3">
          <Input placeholder={t('COUPON_CODE')} className=" me-2" />
          <ButtonMaker text={t('APPLY')} design="bg-dark-blue px-5" />
        </div>

        <Alert color="success" className="w-100 my-3">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-circle-check text-success"></i>
            <p className="payment-method ps-3">{t('SUCCESS')}</p>
          </div>
        </Alert>
        <Alert color="danger" className="w-100">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-circle-exclamation text-danger"></i>
            <p className="payment-method ps-3">{t('COUPON_ERR')}</p>
          </div>
        </Alert>
        <Alert color="warning" className="w-100">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-circle-exclamation text-warning"></i>
            <p className="payment-method ps-3">{t('PENDING')}</p>
          </div>
        </Alert>
      </div>
      <ButtonMaker
        text={t('CONFIRM')}
        block
        design="bg-dark-blue"
        onClick={() => SetToggleShow('booking-successfully')}
      />
    </div>
  );
};

export default Payment;
