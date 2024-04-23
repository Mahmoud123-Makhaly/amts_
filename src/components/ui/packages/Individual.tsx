'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';

import { useTranslate } from '@app/hooks';
import { ButtonMaker } from '@components';

import { PackagesData } from './PackagesData';

const Individual = () => {
  const t = useTranslate('COMP_Packages');

  return (
    <Row>
      {PackagesData.map((item, index) => (
        <Col md={6} lg={4} key={index}>
          <div className="border rounded p-4">
            <div className="flex-between">
              <p className="mb-3">{item.type}</p>
              {item.recommended && <p className="bg-yellow fw-semibold px-3 py-1 rounded-pill ">Recommended</p>}
            </div>
            <div className="d-flex align-items-center pb-3 border-bottom">
              <h3 className="font-28 mb-0 fw-bold">{item.countPerWeek} AED </h3>
              <p className="ms-2">/ Week</p>
            </div>
            <div className="py-3">
              <ul>
                <li className="mb-2 d-flex align-items-center">
                  <i className="fa-solid fa-square-check me-2 text-primary fa-lg"></i>
                  <p>{item.servicesCount} Services</p>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="fa-solid fa-square-check me-2 text-primary fa-lg"></i>
                  <p>{item.staffCount} Staff</p>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="fa-solid fa-square-check me-2 text-primary fa-lg"></i>
                  <p> {item.appointMent}</p>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  {item.gallery ? (
                    <i className="fa-solid fa-square-check me-2 text-primary fa-lg"></i>
                  ) : (
                    <Image src="/images/packages/close.png" alt="xmark" width={18} height={18} className=" me-2 " />
                  )}
                  <p> Gallery </p>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  {item.additionServices ? (
                    <i className="fa-solid fa-square-check me-2 text-primary fa-lg"></i>
                  ) : (
                    <Image src="/images/packages/close.png" alt="xmark" width={18} height={18} className=" me-2 " />
                  )}
                  <p> Addition Services </p>
                </li>
              </ul>
            </div>
            <ButtonMaker text={t('CHOOSE')} block design="rounded-3" />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Individual;
