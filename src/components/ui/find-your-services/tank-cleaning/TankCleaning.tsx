'use client';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import * as Yup from 'yup';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

import { AppForm, ButtonMaker, FormFieldType, ImageMaker, ServiceCard, Modal } from '@components';

interface ITankCleaningProps {
  data: Array<{
    imgSrc: string;
    name: string;
    slug: string;
  }>;
}
const TankCleaning = (props: ITankCleaningProps) => {
  const { data } = props;
  const t = useTranslate('COMP_Tank_Cleaning');
  const [toggleShow, setToggleShow] = useState(false);
  const onSubmit = (values: any) => {
    setToggleShow(false);
  };
  const formFields: Array<FormFieldType> = [
    {
      name: 'message',
      as: 'textarea',
      placeholder: t('HOW_CAN_I_HELP_YOU'),
      rows: 4,
    },
  ];
  const validationSchema = Yup.object().shape({
    message: Yup.string().required(t('REQUIRED_MESSAGE')),
  });
  const ActionComponent = ({ children }: { children: React.ReactNode }) => (
    <React.Fragment>
      <ButtonMaker type="submit" text={t('SEND_MESSAGE')} block design="mb-2" />
      <ButtonMaker
        design="bg-muted text-black"
        type="submit"
        text={t('CANCEL')}
        block
        onClick={() => setToggleShow(!toggleShow)}
      />
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <div className="p-0 py-lg-4 tank-cleaning">
        <Container>
          <Row dir="ltr" className="flex-column-reverse flex-lg-row">
            <Col lg={5}>
              <div className="flex-col-start h-100 gap-3">
                <h4 className="fw-semibold">{t('TANK_CLEANING_TITLE')}</h4>
                <p className="text-dark-gray">{t('TANK_CLEANING_DESCRIPTION')}</p>
              </div>
            </Col>
            <Col lg={7}>
              <ImageMaker
                src="/images/find-your-services/services.png"
                width={350}
                height={350}
                className="d-none d-lg-block"
              />
              <ImageMaker
                src="/images/find-your-services/small-bg.png"
                width={490}
                height={450}
                className="  d-lg-none"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <div className="py-3 py-lg-5 d-flex flex-column flex-lg-row justify-content-lg-between  ">
          <div>
            <h4 className=" fw-bold">{t('SERVICES_TANK_CLEANING')}</h4>
            <h4 className="fw-bold mb-0 pb-3 pb-lg-4">{t('WHAT_YOU_ARE_LOOKING_FOR')}</h4>

            <p className="text-dark-gray">{t('SERVICES_CLEANING_DESC')}</p>
          </div>
          <ButtonMaker
            onClick={() => setToggleShow(true)}
            text={t('SERVICES_YOU_HOPE_TO_ADD')}
            design="px-4 d-none d-lg-block"
          />
        </div>
      </Container>
      <Container>
        <Row className="pb-5">
          {data.map((item, index) => (
            <Col md={6} lg={4} key={index}>
              <ServiceCard title={item.name} href={item.slug} imgSrc={item.imgSrc} product={item as DTO.IProductDTO} />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal isOpen={toggleShow} toggleShow={() => setToggleShow(false)}>
        <div>
          <i className="fa-solid fa-xmark fa-lg pointer mb-3 text-dark-gray" onClick={() => setToggleShow(false)}></i>
          <div className="px-3">
            <h4 className="font-20 fw-semibold pb-4 mb-0 text-center  border-bottom">{t('MODAL_TITLE')}</h4>
            <p className="text-dark-gray py-4 text-center">{t('MODAL_DESC')}</p>
            <AppForm
              initialValues={{
                message: '',
              }}
              validationSchema={validationSchema}
              fields={formFields}
              ActionComponent={ActionComponent}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default TankCleaning;
