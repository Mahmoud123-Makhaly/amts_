'use client';
import React from 'react';
import { Alert, Col, Row } from 'reactstrap';

import { ButtonMaker, CardMaker, DisplayDateText, ImageMaker } from '@components';
import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import Empty from '../Empty';

interface ICompletedOrderCardProps {
  orders?: Array<DTO.ICustomerOrderDTO> | undefined;
}
const CurrentOrderCard = (props: ICompletedOrderCardProps) => {
  const { orders } = props;

  const t = useTranslate('Comp_CompletedOrderCard');
  return (
    <React.Fragment>
      {orders && orders.length ? (
        orders?.map(order => (
          <div className="border p-3 rounded mb-3 complete-order-card" key={order.id}>
            <div className="d-flex justify-content-between border-bottom ">
              <div className="flex-col-start gap-2">
                <strong className="order-number d-block">
                  {t('ORDER_NUMBER')}: {order?.number}
                </strong>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <strong>{t('ORDER_DATE')} :</strong>
                  <p className="py-0 m-0">
                    <DisplayDateText date={order?.createdDate.toString()} format="DD MMMM YYYY" time="12" fromNow />
                  </p>
                </div>
                {/* <div className=" evaluation my-3">
            <ButtonMaker text={t('EVALUATE')} design="bg-transparent text-primary" />
          </div> */}
              </div>

              <div>
                <Link
                  href={`/profile/order/${order.number}`}
                  className="d-flex align-items-center rounded-pill p-2 text-black border border-primary bg-light-blue"
                >
                  <p className="px-2 py-0">{t('DETAILS')}</p>
                  <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <Row className="mt-3">
              {order?.items.map(item => (
                <Col xl={4} md={6} key={item.id}>
                  <Link href={`/product/${item.product?.slug}`}>
                    <CardMaker img={item.imageUrl} alt="product" className="mb-0 border p-2 flex-row gap-2 item-recap">
                      <div className="flex-col-start gap-md-2 h-100 border-start ps-3">
                        <p className="fw-bold">{item.name}</p>
                        <p className="fw-bold">{item.placedPrice?.formattedAmount}</p>
                        <div className="d-flex align-items-center border px-2 py-1 rounded text-primary gap-2">
                          <p>{t('QUANTITY')} </p>
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                    </CardMaker>
                  </Link>
                </Col>
              ))}
              <Col md={12} className="flex-col-start gap-3 mt-3 w-100">
                <Alert color="success" className="w-100">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-circle-check text-success"></i>
                    <p className="payment-method ps-3">{order.inPayments.at(0)?.gatewayCode}</p>
                  </div>
                </Alert>
              </Col>
            </Row>
            {/* <div className="product-return">
          <ButtonMaker block={false} text={t('ORDER_RETURN')} design="bg-transparent border-gray text-gray" />
        </div> */}
          </div>
        ))
      ) : (
        <Empty />
      )}
    </React.Fragment>
  );
};

export default CurrentOrderCard;
