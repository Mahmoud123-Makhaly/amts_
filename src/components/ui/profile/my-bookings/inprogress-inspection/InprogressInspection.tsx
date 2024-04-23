'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { ButtonMaker, ImageMaker, Modal } from '@components';

import { CompletedInspectionCard } from '../completed-inspection';
import { Col, Row } from 'reactstrap';

const InprogressInspection = () => {
  const t = useTranslate('COMP_Inprogress_Inspection');
  const [openModal, setOpenModal] = useState(false);
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
    },
  ];
  return (
    <div>
      <Row>
        {data.map((item, index) => (
          <Col sm={12} md={6} lg={12} key={index}>
            <CompletedInspectionCard data={item} className="border rounded p-3 mb-3">
              <div className="d-flex d-lg-block mt-3 mt-lg-0">
                <a
                  href={'tel:(971) 52 835 8482'}
                  className="btn py-1 mb-2 gap-1 d-flex align-items-center border-primary w-100 h-100"
                >
                  <ImageMaker src={'/images/profile/booking/whats-app.svg'} />
                  <p>{t('CONTACT_US')}</p>
                </a>

                <ButtonMaker
                  text={t('CANCEL_SERVICES')}
                  design="mb-2 bg-danger w-100 ms-3 ms-lg-0 h-100"
                  onClick={() => setOpenModal(true)}
                />
              </div>
            </CompletedInspectionCard>
          </Col>
        ))}
      </Row>
      <Modal isOpen={openModal} toggleShow={() => setOpenModal(true)}>
        <div className="p-4  ">
          <div className="d-flex justify-content-end mb-4">
            <i
              className="fa-regular fa-circle-xmark fa-lg text-end pointer text-light-gray"
              onClick={() => setOpenModal(false)}
            ></i>
          </div>
          <div className="flex-col mb-3">
            <Image src="/images/profile/booking/cancel.png" width={60} height={60} alt="cancel" />
            <p className="my-3 fw-bold">{t('CANCEL_SERVICES')} ?</p>
            <p>{t('CANCEL_CONFIRMATION')}</p>
          </div>
          <div className="flex-center ">
            <ButtonMaker text={t('YES')} onClick={() => setOpenModal(false)} design="bg-danger me-3 text-black px-3" />
            <ButtonMaker
              text={t('NO')}
              onClick={() => setOpenModal(false)}
              design="bg-transparent border-danger text-danger px-3"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InprogressInspection;
