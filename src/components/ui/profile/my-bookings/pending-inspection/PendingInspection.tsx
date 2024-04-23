'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Alert, Col, Row } from 'reactstrap';
import Image from 'next/image';

import { AppForm, ButtonMaker, ImageMaker, Modal, FormFieldType, SubmitButton } from '@components';
import { useTranslate } from '@app/hooks';
import { CompletedInspectionCard } from '../completed-inspection';

const PendingInspection = () => {
  const t = useTranslate('COMP_Pending_Inspection');
  const [openModal, setOpenModal] = useState({
    formModal: false,
    cancelModal: false,
  });

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
  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      type: 'email',
      placeholder: t('PLEASE_ENTER_YOUR_MAIL'),
    },
  ];
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
  });
  const onSubmit = (values: any) => {
    setOpenModal({
      formModal: false,
      cancelModal: false,
    });
  };
  const ActionComponent = ({
    isValid,
    dirty,
    isSubmitting,
  }: {
    isValid: boolean;
    dirty: boolean;
    isSubmitting: boolean;
  }) => (
    <div className="flex-center">
      <ButtonMaker
        text={t('CANCEL')}
        onClick={() =>
          setOpenModal({
            formModal: false,
            cancelModal: false,
          })
        }
        design="text-black bg-transparent border-black"
      />
      <SubmitButton
        design="text-white border-0 py-0  bg-dark-blue d-flex align-items-center justify-content-center bg-dark-blue ms-3"
        disabled={!isValid || !dirty || isSubmitting}
        isLoading={isSubmitting}
      >
        <p>{t('SEND')}</p>
      </SubmitButton>
    </div>
  );
  return (
    <div>
      <Row>
        {data.map((item, index) => (
          <Col sm={12} md={6} lg={12} key={index}>
            <div className="border rounded p-3 mb-3">
              <CompletedInspectionCard data={item} badge={t('PENDING')}>
                <div className="d-flex d-lg-block mt-3 mt-lg-0">
                  <a
                    href={'tel:(971) 52 835 8482'}
                    className="btn py-1 mb-2 gap-1 d-flex align-items-center border-primary w-100 h-100"
                  >
                    <ImageMaker src={'/images/profile/booking/whats-app.svg'} />
                    <p>{t('CONTACT_US')}</p>
                  </a>

                  <ButtonMaker
                    onClick={() =>
                      setOpenModal({
                        formModal: false,
                        cancelModal: true,
                      })
                    }
                    text={t('CANCEL_SERVICES')}
                    design="mb-2 bg-danger w-100 h-100 ms-3 ms-lg-0"
                  />
                </div>
              </CompletedInspectionCard>
              <Alert color="warning" className="w-100 p-0 px-3">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-circle-exclamation text-warning"></i>{' '}
                  <p className="payment-method ps-3">{t('WAITING_FOR_COMMENT')}</p>
                  <ButtonMaker
                    text={t('YOUR_ACTION')}
                    onClick={() =>
                      setOpenModal({
                        formModal: true,
                        cancelModal: false,
                      })
                    }
                    design="bg-transparent text-black text-decoration-underline border-0 ms-3"
                  />
                </div>
              </Alert>
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        isOpen={openModal.formModal}
        toggleShow={() =>
          setOpenModal({
            formModal: true,
            cancelModal: false,
          })
        }
      >
        <div className="p-4 px-5">
          <div className="d-flex justify-content-end mb-4">
            <i
              className="fa-regular fa-circle-xmark fa-lg text-end pointer text-light-gray"
              onClick={() =>
                setOpenModal({
                  formModal: false,
                  cancelModal: false,
                })
              }
            ></i>
          </div>
          <div className="flex-center ">
            <div className="outline-icon-50 border border-warning bg-light-danger p-4 rounded-circle  ">
              <i className="fa-solid fa-circle-exclamation text-warning fa-lg"></i>
            </div>
          </div>
          <p className="my-3">{t('INCORRECT_EMAIL')} </p>
          <AppForm
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            fields={formFields}
            // buttonText={t('RESET_PASSWORD')}
            ActionComponent={ActionComponent}
            onSubmit={onSubmit}
          ></AppForm>
        </div>
      </Modal>
      <Modal
        isOpen={openModal.cancelModal}
        toggleShow={() =>
          setOpenModal({
            formModal: false,
            cancelModal: true,
          })
        }
      >
        <div className="p-4  ">
          <div className="d-flex justify-content-end mb-4">
            <i
              className="fa-regular fa-circle-xmark fa-lg text-end pointer text-light-gray"
              onClick={() =>
                setOpenModal({
                  formModal: false,
                  cancelModal: false,
                })
              }
            ></i>
          </div>{' '}
          <div className="flex-col mb-3">
            <Image src="/images/profile/booking/cancel.png" width={60} height={60} alt="cancel" />
            <p className="my-3 fw-bold">{t('CANCEL_SERVICES')} ?</p>
            <p>{t('CANCEL_CONFIRMATION')}</p>
          </div>
          <div className="flex-center ">
            <ButtonMaker
              text={t('YES')}
              onClick={() =>
                setOpenModal({
                  formModal: false,
                  cancelModal: false,
                })
              }
              design="bg-danger me-3 text-black px-2"
            />
            <ButtonMaker
              text={t('NO')}
              onClick={() =>
                setOpenModal({
                  formModal: false,
                  cancelModal: false,
                })
              }
              design="bg-transparent border-danger text-danger px-2"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PendingInspection;
