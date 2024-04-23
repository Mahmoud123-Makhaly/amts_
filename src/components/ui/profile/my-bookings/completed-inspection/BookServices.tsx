'use client';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';

import { ButtonMaker, ImageMaker, TimeLine } from '@components';
import { useTranslate } from '@app/hooks';

import CompletedInspectionCard from './CompletedInspectionCard';

interface IBookServicesProps {
  SetToggleShow: React.Dispatch<
    React.SetStateAction<'completed' | 'booking-services' | 'payment' | 'booking-successfully'>
  >;
}
const BookServices = (props: IBookServicesProps) => {
  const { SetToggleShow } = props;
  const t = useTranslate('COMP_Book_Services');
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [time, setTime] = useState<Nullable<Date>>(null);

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
    <React.Fragment>
      <div className="border rounded p-4">
        <h4 className="font-24 fw-semibold mb-0">{t('BOOK_SERVICES')}</h4>

        <TimeLine
          events={orderEvents}
          activeIndex={0}
          activeColor="primary"
          restColor="medium-gray"
          mode="cumulative"
        />
        <CompletedInspectionCard data={data} className="border-bottom " />
        <div>
          <Row>
            <Col md={4}>
              <p className="mb-2">
                {t('DATE_PICKER')} <i className="fa-solid fa-earth-americas ms-1"></i>
              </p>
              <div className="card flex flex-wrap gap-3 p-fluid">
                <span className="p-float-label">
                  <Calendar inputId="../../../" value={date} onChange={e => setDate(e.value)} />
                </span>
              </div>
              <p className="my-2 font-12 text-light-gray">description line</p>
            </Col>
            <Col md={3}>
              <p className="mb-2">
                {t('TIME_PICKER')} <i className="fa-solid fa-earth-americas ms-1"></i>
              </p>
              <div className="card flex flex-wrap gap-3 p-fluid">
                <span className="p-float-label">
                  <Calendar value={time} onChange={e => setTime(e.value)} timeOnly />
                </span>
              </div>
              <p className="my-2 font-12 text-light-gray">description line</p>
            </Col>
            <Col md={5}>
              <ImageMaker src="/images/profile/booking/time.jpg" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <ButtonMaker text={t('BOOK_APPOINTMENT')} design="my-3" onClick={() => SetToggleShow('payment')} />
      </div>
    </React.Fragment>
  );
};

export default BookServices;
