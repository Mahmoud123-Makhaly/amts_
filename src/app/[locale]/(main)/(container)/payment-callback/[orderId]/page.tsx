'use client';

import React, { Suspense, useEffect } from 'react';

import { Actions } from '@libs/actions';
import { Loader } from '@components';
import { useRouter } from '@navigation';

const Page = ({ params, searchParams }: { searchParams: any; params: { locale: string; orderId: string } }) => {
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const paymentGatewaysDomainMap = { QnbMethod: 'https://qnbalahli' };
      const referer = window.document.referrer ?? '';

      if (referer && Object.entries(paymentGatewaysDomainMap).some(x => referer.startsWith(x[1]))) {
        const {
          data: paymentStatus,
          serverError,
          validationErrors,
        } = await Actions.payment.confirmPayment({
          methodName: Object.entries(paymentGatewaysDomainMap).find(x =>
            referer.startsWith(x[1]),
          )![0] as keyof typeof paymentGatewaysDomainMap,
          params: { orderId: params.orderId, query: searchParams },
        });
        if (paymentStatus?.data) router.replace(`/order-confirmed/${params.orderId}`);
        else router.replace(`/order-rejected/${params.orderId}`);
      } else router.replace(`/`);
    };
    checkPaymentStatus();
  });
  return (
    <Suspense fallback={<Loader />}>
      <></>
    </Suspense>
  );
};

export default Page;
