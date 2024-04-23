'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';
import { Col, Row } from 'reactstrap';

const Page = ({ params, searchParams }: { searchParams: any; params: { locale: string; orderId: string } }) => {
  const t = useTranslate('ORDER_CONFIRMATION');
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timeoutId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      router.replace(`/profile/my-orders`);
    }
  }, [countdown, params.orderId, router, searchParams]);

  return (
    <Row className="mt-5 text-center">
      <Col className="mt-5">
        <div className="flex-col mt-5">
          <div className="flex-col gap-3 mt-5">
            <i className="fa-solid fa-circle-check text-success font-60"></i>
          </div>

          <h4 className="mt-4 text-black fw-normal">
            {t.rich('MSG', {
              br: () => <br />,
              strong: chunks => <strong className="text-success fw-normal">{chunks}</strong>,
              countdown,
            })}
          </h4>
        </div>
      </Col>
    </Row>
  );
};

export default Page;
