'use client';

import React, { useState } from 'react';
import { Alert, Badge, Col, Container, Row } from 'reactstrap';

import { ButtonMaker, CardMaker, CartSummary, DisplayDateText, ImageMaker, Modal, TimeLine } from '@components';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

const MyOrderDetails = ({ order }: { order: DTO.ICustomerOrderDTO | undefined }) => {
  const t = useTranslate('Comp_OrderDetails');

  const orderReviewSummary = [
    {
      text: t('SUB_TOTAL'),
      price: order?.subTotal?.formattedAmount ?? 0,
    },
    {
      text: t('DISCOUNT'),
      price: order?.discountTotalWithTax?.formattedAmount ?? 0,
    },
    {
      text: t('TAX'),
      price: order?.taxTotal?.formattedAmount ?? 0,
    },
    {
      text: t('SHIPPING_FEES'),
      price: order?.shippingTotal?.formattedAmount ?? 0,
    },
    {
      text: t('TOTAL'),
      price: order?.total?.formattedAmount ?? 0,
    },
  ];
  const address = order?.shipments?.at(0)?.deliveryAddress;
  const orderEvents = [
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('PROCESSING'),
    },
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('SHIPPING'),
    },
    {
      icon: <i className="fa-solid fa-check text-white"></i>,
      text: t('COMPLETED'),
    },
  ];
  const activeStatus = order?.status === 'Shipping' ? 1 : order?.status === 'Completed' || 'Paid' ? 2 : 0;

  return (
    <div className="my-order-details mt-5">
      <div className="border rounded mt-3 px-3">
        <div className=" border-bottom pb-2">
          <TimeLine
            events={orderEvents}
            activeIndex={activeStatus}
            activeColor="primary"
            restColor="medium-gray"
            mode="cumulative"
          />
        </div>
        <div className="py-3 border-bottom ">
          <div className="d-flex align-items-center mb-2 gap-2">
            <h5>{t('ORDER_NUMBER')} :</h5>
            <h5>{order?.number}</h5>
          </div>
          <div className="mb-2 d-flex align-items-center gap-2">
            <div>
              <h5 className="text-info">{t('ORDER_DATE')}</h5>
            </div>
            <div>
              <h5 className="text-info">
                <DisplayDateText date={order?.createdDate.toString()} format="DD MMMM YYYY" time="12" />
              </h5>
            </div>
          </div>
        </div>
        <div className="order-process py-3">
          <Row>
            {order?.items.map(item => (
              <Col className="col-12 px-0" key={item.id}>
                <Link href={`/product/${item.product?.slug}`}>
                  <CardMaker img={item.imageUrl} alt="product" className="mb-0 border p-2 flex-row gap-2 item-recap">
                    <div className="flex-col-start gap-md-2 h-100 border-start ps-3">
                      <p>{item.name}</p>
                      <div className="d-flex align-items-center">
                        <p>{t('QUANTITY')} :</p>
                        <p>{item.quantity}</p>
                      </div>
                      <p>{item.placedPrice?.formattedAmount}</p>
                    </div>
                  </CardMaker>
                </Link>
              </Col>
            ))}
          </Row>
          <Alert color="success" className="w-100 mt-3">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-circle-check text-success"></i>
              <p className="payment-method ps-3">{order?.inPayments?.at(0)?.gatewayCode}</p>
            </div>
          </Alert>
        </div>
      </div>
      <Row className="my-3">
        <Col md={6}>
          {order?.shipments && order?.shipments?.length > 0 && (
            <div className="flex-col-start gap-3 border rounded p-3">
              <div className="d-flex align-items-center gap-2">
                <ImageMaker src={'/images/svgs/address/address-type.svg'} />
                <h6 className="text-black m-0 fw-bold">
                  {order?.shipments?.at(0)?.deliveryAddress?.addressType === 2 ? t('HOME') : t('WORK')}
                </h6>
              </div>

              <div className="d-flex align-items-center gap-2 text-medium-gray ">
                <ImageMaker src={'/images/svgs/address/user.svg'} />
                <p className="fw-semibold">
                  {order?.shipments?.at(0)?.deliveryAddress?.firstName}{' '}
                  {order?.shipments?.at(0)?.deliveryAddress?.lastName}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 text-medium-gray">
                <ImageMaker src={'/images/svgs/address/address.svg'} />

                <p>
                  {`${t('BUILDING')}: ${address?.building}, ${t('FLOOR')}: ${address?.floor} , ${t('FLAT')}: ${address?.flat}`}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 text-medium-gray ">
                <ImageMaker src={'/images/svgs/address/phone.svg'} />
                <p> {order?.shipments?.at(0)?.deliveryAddress?.phone}</p>
              </div>
            </div>
          )}
        </Col>
        <Col md={6} className="mb-4">
          <div className="p-3 rounded border ">
            <CartSummary title={t('CART_SUMMARY')} data={orderReviewSummary} className="cart-summary" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyOrderDetails;
