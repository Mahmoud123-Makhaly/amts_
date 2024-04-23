'use client';
import React, { useState } from 'react';

import { useTranslate } from '@app/hooks';
import { ButtonMaker } from '@components';

import Payment from './Payment';
import BookingSuccessfully from './BookingSuccessfully';
import CompletedInspectionCard from './CompletedInspectionCard';
import BookServices from './BookServices';
import { Col, Row } from 'reactstrap';

const CompletedInspection = () => {
  const [toggleShow, SetToggleShow] = useState<'completed' | 'booking-services' | 'payment' | 'booking-successfully'>(
    'completed',
  );
  const t = useTranslate('COMP_Book_Services');

  const data = [
    {
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
      onClick: () => {
        SetToggleShow('booking-services');
      },
    },
    {
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
      onClick: () => {
        SetToggleShow('booking-services');
      },
    },
    {
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
      onClick: () => {
        SetToggleShow('booking-services');
      },
    },
    {
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
      onClick: () => {
        SetToggleShow('booking-services');
      },
    },
  ];

  return (
    <div className="my-4">
      {toggleShow === 'completed' && (
        <Row>
          {data.map((item, index) => (
            <Col sm={12} md={6} lg={12} key={index}>
              <CompletedInspectionCard data={item}  className="border rounded">
                <div className="d-flex d-lg-block mt-3 mt-lg-0">
                  <ButtonMaker text={t('BOOK_SERVICES')} design="mb-2 w-100 h-100" onClick={item.onClick} />
                  <ButtonMaker
                    text={t('MORE_DETAILS')}
                    design="mb-2 bg-transparent border-primary  w-100 text-primary ms-3 ms-lg-0 h-100"
                  />
                </div>
              </CompletedInspectionCard>
            </Col>
          ))}
        </Row>
      )}

      {toggleShow === 'booking-services' && <BookServices SetToggleShow={SetToggleShow} />}
      {toggleShow === 'payment' && <Payment SetToggleShow={SetToggleShow} />}
      {toggleShow === 'booking-successfully' && <BookingSuccessfully SetToggleShow={SetToggleShow} />}
    </div>
  );
};

export default CompletedInspection;
