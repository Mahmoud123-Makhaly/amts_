'use client';
import React from 'react';
import { CardMaker, ImageMaker } from '@components';
import { Col, Row } from 'reactstrap';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

const ProcessedOrder = ({ address, cart }: { address: DTO.IMemberAddressDTO | undefined; cart: DTO.ICartDTO }) => {
  const t = useTranslate('COMP_Checkout');
  return (
    <div className="mt-4">
      <div className="p-4 mb-4 flex-between align-items-start border rounded">
        <div className="flex-col-start gap-3">
          <div className="d-flex align-items-center gap-2">
            <ImageMaker src={'/images/svgs/address/address-type.svg'} />
            <h6 className="text-black m-0 fw-bold">{address?.addressType === 2 ? t('HOME') : t('WORK')}</h6>
          </div>

          <div className="d-flex align-items-center gap-2 text-medium-gray ">
            <ImageMaker src={'/images/svgs/address/user.svg'} />
            <p className="fw-semibold">
              {address?.firstName} {address?.lastName}
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
            <p> {address?.phone}</p>
          </div>
        </div>
      </div>
      <div className="border p-4 rounded w-100">
        <div className="d-flex align-items-center gap-3 mb-3">
          <i className="fa-solid fa-lg fa-wallet"></i>
          <h5 className="mb-0">{t('PAYMENT_METHOD')}</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          {cart?.payments?.at(0)?.paymentGatewayCode === 'DefaultManualPaymentMethod' ? (
            <i className="fa-solid fa-money-bill-wave"></i>
          ) : (
            <i className="fa-regular fa-credit-card"></i>
          )}
          <p>{t(`${cart?.payments?.at(0)?.paymentGatewayCode}`)}</p>
        </div>
      </div>
      <Row className="mt-3">
        {cart?.items?.map(item => (
          <Col md={12} key={item.id} className="px-0">
            <Link href={`/product/${item.product?.slug}`}>
              <CardMaker
                img={item.imageUrl ?? '/images/HProductNoImg.png'}
                alt="product"
                className="mb-0 border p-2 flex-row gap-2 item-recap"
              >
                <div className="flex-col-start gap-md-2 h-100 border-start ps-3">
                  <p className="fw-bold">{item.name}</p>
                  <div className="flex-between w-100">
                    <p className="fw-bold">{item.placedPrice?.formattedAmount}</p>
                    <div className="d-flex align-items-center border px-2 py-1 rounded text-primary gap-2">
                      <p>{t('QUANTITY')} </p>
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                </div>
              </CardMaker>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProcessedOrder;
