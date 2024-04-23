'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Return from '@assets/svgs/cart/return.svg';
import check from '@assets/svgs/order-return/check.svg';
import warning from '@assets/svgs/order-return/vector.svg';

import { useTranslate } from '@app/hooks';
import { BackButton, ButtonMaker, CardMaker } from '@components';
import { orderReturnData } from './OrderReturnData';

const ReturnedOrdersList = () => {
  const t = useTranslate('COMP_OrderReturn');

  return (
    <div>
      <div className="d-flex justify-content-end my-4 ">
        <BackButton />
      </div>
      <div className="py-2 rounded">
        {orderReturnData.map((item, index) => (
          <div className="bg-light-gray rounded p-2 p-md-4  mb-4" key={index}>
            <div className="flex-start  pb-4 border-bottom">
              <div className="pe-2 pe-md-4 border-end d-inline-block me-4">
                <h6 className="fw-semibold  text-black text-nowrap">{item.odrerNumber}</h6>
                <p className="text-gray my-3"> {item.date} </p>
                {item.returning && (
                  <div className="flex-start">
                    <Image src={Return} alt="return" />
                    <p className="text-black ms-2"> {t('RETURNING')} </p>
                  </div>
                )}
                {item.returnDone && (
                  <div className="flex-start">
                    <Image src={check} alt="return" />
                    <p className="text-black ms-2"> {t('RETURNING_DONE')} </p>
                  </div>
                )}
              </div>
              <div>
                <h6 className="text-black mb-3 text-wrap">{t('RETURN_ADDRESS')} </h6>
                <p className="text-gray">{item.CustomerName}</p>
                <p className="text-gray">{item.customerAddress} </p>
                <p className="text-gray"> {item.phoneNumber} </p>
              </div>
            </div>
            <div className="flex-start  flex-wrap flex-lg-nowrap">
              {item.products.map((product, index) => {
                return (
                  <CardMaker key={index} img={product.imgSrc} className="flex-row bg-transparent align-items-center  ">
                    <div className="ms-3">
                      <h5 className="text-nowrap"> {product.productTitle}</h5>
                      <h6 className="my-3 text-gray"> {product.productPrice}</h6>
                      <p className="text-gray"> {product.productDesc} </p>
                    </div>
                  </CardMaker>
                );
              })}
            </div>
            {item.valid === false ? (
              <div className="border-top pt-3">
                <div className="flex-start">
                  <Image src={warning} alt="warning" />
                  <p className="ms-2 text-gray"> {t('OLD_ORDER')} !</p>
                </div>
                <p className=" text-gray">
                  {t('DO_YOU_HAVE_PROBLEM')}
                  <Link href="/contact-us" className="text-black fw-bold ms-2 text-decoration-underline">
                    {t('CONTACT_SUPPORT_TEAM')}
                  </Link>
                </p>
              </div>
            ) : (
              <div className="flex-center">
                <Link href={'/profile/order/123'} className="padding-10 rounded bg-primary text-white ">
                  {t('SHOW_RETURN_DETAILS')}
                </Link>
              </div>
            )}
          </div>
        ))}
        <p className="text-center">pagination</p>
      </div>
    </div>
  );
};

export default ReturnedOrdersList;
