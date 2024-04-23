'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';

const ConfirmModal = () => {
  const t = useTranslate('COMP_SignUpForm.ConfirmModal');
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (countdown > 0) {
      const timeoutId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      // Redirect when the countdown reaches 0
      router.push(
        `/auth/login${searchParams.get('redirectURL') ? `?redirectURL=${searchParams.get('redirectURL')}` : ''}`,
      );
    }
  }, [countdown, router, searchParams]);

  return (
    <div className="flex-col">
      <i className="fa-solid fa-circle-check text-success font-50"></i>
      <p className="mt-1">{t('SUCCESS_MSG')}</p>
      <div className="flex-center mt-1">
        <p>{t('SUCCESS_MSG_COUNTER', { countdown })}</p>
      </div>
    </div>
  );
};
export default ConfirmModal;
