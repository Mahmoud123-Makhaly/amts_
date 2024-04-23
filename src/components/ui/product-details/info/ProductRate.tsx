'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { ButtonMaker } from '@components';

const ProductRate = () => {
  return (
    <div>
      <Row>
        <Col md={3} className="flex-col-start border-end">
          <h4>التقييم العام</h4>
          <h4 className="text-black">4.5</h4>
          rate
          <p className="text-medium-gray font-10">بناءً على 10 تقييمات</p>
        </Col>
        <Col md={9} className="paddingx-30 ">
          <div className="border-bottom flex-col-start gap-3 pb-4">
            <div className="flex-between border-bottom pb-4 w-100">
              <h4>8 تقييمات العملاء</h4>
              select
            </div>
            <div className="flex-between w-100">
              <div className="d-flex align-items-center gap-3">
                <h5 className="text-black">ابراهيم القاضي</h5>
                <div className="d-flex  text-success gap-2 align-items-center">
                  <i className="fa-solid fa-circle-check"></i>
                  <p>تم الطلب</p>
                </div>
              </div>
              rate
            </div>
            <p>16 مايو 2023</p>
            <h6 className="text-medium-gray text-start">
              إنه مكان جيد لعشاق الطعام ذي الميزانية المحدودة ، والأشياء جيدة ، وأنا أتناول كعك البراونيز الساخن من
              اختيارك هنا
            </h6>
            <div className="w-100 d-flex gap-3">
              <ButtonMaker text="مفيد" />
              <ButtonMaker text="غير مفيد" design="bg-transparent text-primary" />
            </div>
          </div>
        </Col>
        <Col className="mt-3">
          <div className="flex-col-start gap-3 pb-4">
            <h4 className="text-black fw-normal">كيف تتم التقييمات؟</h4>
            <h6 className="text-medium-gray">التقييمات من عملاء الخباز الذين اشتروا المنتج وكتبوا تقييم</h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductRate;
