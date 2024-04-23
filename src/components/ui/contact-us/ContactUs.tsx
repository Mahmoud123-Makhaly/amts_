'use client';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Col, Container, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { AppForm, ButtonMaker, CardMaker, FormFieldType, ImageMaker, Map, Modal } from '@components';

import ContactUsModal from './ContactUsModal';
import Link from 'next/link';

interface IContactUs {
  data: Array<{
    imgSrc: string;
    title: string;
    description: string;
  }>;
}
const ContactUs = (props: IContactUs) => {
  const { data } = props;
  const t = useTranslate('COMP_ContactUs');
  const [toggleShow, setToggleShow] = useState(false);

  const formFields: Array<FormFieldType> = [
    {
      name: 'email',
      label: t('EMAIL_ADDRESS'),
      type: 'email',
      placeholder: t('ENTER_EMAIL_ADDRESS'),
    },
    {
      name: 'location',
      label: t('LOCATION'),
      type: 'text',
      placeholder: t('ENTER_LOCATION'),
    },

    {
      name: 'phone',
      label: t('MOBILE_NUMBER'),
      type: 'tel',
      placeholder: t('MOBILE_PLACEHOLDER'),
    },
    {
      name: 'subject',
      label: t('SUBJECT'),
      type: 'text',
      placeholder: t('ENTER_SUBJECT'),
    },
    {
      name: 'message',
      label: t('MESSAGE'),
      as: 'textarea',
      placeholder: t('TYPE_MESSAGE'),
      rows: 10,
    },
  ];
  const onSubmit = () => {
    setToggleShow(true);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('INVALID_EMAIL')).required(t('REQUIRED_EMAIL')),
    phone: Yup.string().required(t('REQUIRED_PHONE')),
    location: Yup.string().required(t('REQUIRED_LOCATION')),
    subject: Yup.string().required(t('REQUIRED_SUBJECT')),
  });

  const ActionComponent = ({ children }: { children: React.ReactNode }) => (
    <div className="d-flex justify-content-end w-100">
      <ButtonMaker type="submit" text={t('SEND_MESSAGE')} design="px-5" />
    </div>
  );

  return (
    <React.Fragment>
      <ImageMaker src="/images/contact-us/contact-banner.jpg" className="mb-5" sizes="100vw" />
      <div className="my-5">
        <Container>
          <Row className="w-100">
            <Col lg={6}>
              <div className="border rounded py-3 px-2 ">
                <Row>
                  <h3 className="font-18 fw-semibold mb-0 ">{t('POPULAR_SERVICES')}</h3>
                  {data.map((item, index) => (
                    <Col sm={6} key={index}>
                      <CardMaker className="p-3 border rounded  h-100 text-center ">
                        <div className="d-flex flex-column justify-content-between align-items-center h-100 gap-2">
                          <ImageMaker width={120} height={70} src={item.imgSrc} className="width-120" />
                          <p className="fw-semibold  ">{item.title}</p>
                          <p className="font-14 text-dark-gray">{item.description}</p>
                          <Link href="/services/1" className="btn btn-primary w-100">
                            {t('SPECIAL_OFFERS')}
                          </Link>
                        </div>
                      </CardMaker>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col>
                    <Link href="/services" className="btn btn-secondary w-100 mt-3">
                      {t('VIEW_ALL')}
                    </Link>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <AppForm
                  initialValues={{
                    location: '',
                    email: '',
                    phone: '',
                    message: '',
                  }}
                  validationSchema={validationSchema}
                  fields={formFields}
                  ActionComponent={ActionComponent}
                  onSubmit={() => onSubmit()}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={toggleShow} toggleShow={() => setToggleShow(false)}>
        <ContactUsModal />
      </Modal>
    </React.Fragment>
  );
};

export default ContactUs;
