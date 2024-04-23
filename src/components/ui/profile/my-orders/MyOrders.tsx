'use client';
import React from 'react';
import { Search, Tabs } from '@components';

import { Col, Row } from 'reactstrap';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

import { CurrentOrderCard } from './current-orders';
import { CompletedOrderCard } from './completed-orders';
import { CanceledOrderCard } from './canceled-orders';

const MyOrders = ({ orders }: { orders: Array<DTO.ICustomerOrderDTO> | undefined }) => {
  const t = useTranslate('COMP_MyOrders');

  return (
    <div className="mt-5">
      <div className="myOrders-title rounded mb-3 mt-3">
        <Row className="mb-4 align-items-center bg-light-blue p-3 rounded flex-between">
          <Col md={3}>
            <h6 className="text-black fw-bold">{t('MY_ORDERS')}</h6>
          </Col>
          <Col md={5}>
            <div className="flex-grow-1 px-5 d-none d-lg-block">
              <Search
                placeholder={t('PRODUCT_SEARCH')}
                searchButton={<i className="fa-solid fa-magnifying-glass"></i>}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Tabs
        className="frameless"
        align="between"
        tabs={[
          {
            header: t('CURRENT_ORDERS'),
            content: <CurrentOrderCard orders={orders?.filter(s => s.status !== 'Paid' && s.status !== 'Cancelled')} />,
          },
          {
            header: t('COMPLETED_ORDERS'),
            content: <CompletedOrderCard orders={orders?.filter(s => s.status === 'Paid')} />,
          },
          {
            header: t('CANCELED_ORDERS'),
            content: <CanceledOrderCard orders={orders?.filter(s => s.status === 'Cancelled')} />,
          },
        ]}
      />
    </div>
  );
};

export default MyOrders;
