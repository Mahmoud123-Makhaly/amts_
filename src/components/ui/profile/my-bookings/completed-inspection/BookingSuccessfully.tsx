'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { ButtonMaker, CartSummary, ImageMaker, TimeLine } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

import CompletedInspectionCard from './CompletedInspectionCard';
interface IBookingProps {
  SetToggleShow: React.Dispatch<
    React.SetStateAction<'completed' | 'booking-services' | 'payment' | 'booking-successfully'>
  >;
}
const BookingSuccessfully = (props: IBookingProps) => {
  const { SetToggleShow } = props;
  const t = useTranslate('COMP_Booking_Successfully');

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
  return (
    <div>
      <div className="border rounded p-4">
        <h4 className="font-24 fw-semibold mb-0">{t('BOOK_SERVICES')}</h4>
        <TimeLine
          events={orderEvents}
          activeIndex={0}
          activeColor="primary"
          restColor="medium-gray"
          mode="cumulative"
        />
        <div className="p-3 border-top mb-3">
          <Row>
            <Col md={4}>
              <ImageMaker src="/images/profile/booking/success.jpg" />
            </Col>
            <Col md={8}>
              <div>
                <h3 className="font-22 fw-bold mb-5">{t('SUCCESS_MSG')}</h3>
                <div>
                  <Link href="/" className="btn btn-primary">
                    <i className="fa-solid fa-arrow-left me-2 border rounded-circle width-23 height-23 py-1"></i>

                    {t('GO_TO_HOME')}
                  </Link>
                  <Link href="/" className="btn border-primary text-primary ms-3">
                    {t('BOOKING_HISTORY')}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <CompletedInspectionCard data={data} className="p-0" />
        <div className="border-top border-bottom py-3">
          <span className="border border-primary font-18 rounded-pill px-4 py-2">{t('CASH_PAYMENT_METHOD')}</span>
        </div>
        <CartSummary data={orderReviewSummary} className="cart-summary" />
        <div className="flex-between rounded bg-success py-2 px-3 my-3 text-white">
          <p>Discound 20 %</p>
          <Link href="" className="text-decoration-underline">
            {t('REMOVE')}
          </Link>
        </div>
        <ButtonMaker text={t('CONFIRM')} block design="bg-dark-blue" onClick={() => SetToggleShow('completed')} />
      </div>
    </div>
  );
};

export default BookingSuccessfully;
