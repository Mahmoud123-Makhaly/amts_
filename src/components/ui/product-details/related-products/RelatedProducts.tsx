'use client';
import React from 'react';
import { Col, Row } from 'reactstrap';

import { ButtonMaker, CardMaker } from '@components';
import { useTranslate } from '@app/hooks';

const RelatedProducts = () => {
  const t = useTranslate('COMP_ProductDetails.RelatedProducts');
  const product = {
    imgSrc: '',
    badge: true,
    title: 'دنش كستر',
    price: '30 ج.م',
    rating: true,
    ratingCount: '5',
    discount: true,
  };

  const productsArray = [];

  for (let i = 0; i < 3; i++) {
    productsArray.push({ ...product });
  }
  return (
    <div className="border border-light-gray padding-20 rounded mb-3">
      <h1 className="text-center">{t('TOGETHER_TITLE')}</h1>
      <Row className="g-1 mb-3 h-100">
        {productsArray.map((item, index) => (
          <Col lg={4} key={index}>
            <CardMaker className="rounded h-100" img={item.imgSrc}>
              <div className="border rounded-bottom pt-4 px-3 pb-2 h-100 flex-col-between">
                <div className="text-center w-100">
                  <h6 className="font-25 m-0 pb-3"> {item.title}</h6>
                  <div className="flex-center gap-2">
                    <h6 className=" text-medium-gray fw-bold">{item.price} </h6>
                    {item.discount && (
                      <React.Fragment>
                        <del className=" text-medium-gray font-15">40</del>
                        <span className='font-15 text-success  fw-normal"'> خصم 10%</span>
                      </React.Fragment>
                    )}
                  </div>
                </div>
                {item.rating && (
                  <div className="my-3 text-white flex-between">
                    <div className="bg-primary font-15 paddingx-10 rounded-pill">
                      <i className="fa-solid fa-star pe-1"></i>
                      <span>{item.ratingCount}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardMaker>
          </Col>
        ))}
        <Col md={12} className="px-3">
          <ButtonMaker text="اطلب 2 مع بعض بـ 50 ج.م " block />
        </Col>
      </Row>
    </div>
  );
};

export default RelatedProducts;
