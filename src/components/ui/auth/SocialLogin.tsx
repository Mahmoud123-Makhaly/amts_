'use client';
import React from 'react';
import Image from 'next/image';

import { DividerText } from '@components';
import { useTranslate } from '@app/hooks';

const SocialLogin = () => {
  const t = useTranslate('COMP_LoginForm.SocialLogin');
  return (
    <React.Fragment>
      <DividerText text={t('OR')} />
      <div className="w-100 ">
        <button className="d-flex align-items-center justify-content-center w-100 bg-light-blue p-2 rounded mb-3 border">
          <div>
            <Image src="/images/svgs/google.svg" alt="google login" width={0} height={0} />
          </div>
          <span className="px-3 text-dark fw-normal">{t('GOOGLE_LOGIN')}</span>
        </button>
        <button className="d-flex align-items-center justify-content-center w-100 bg-light-blue p-2 rounded border ">
          <div>
            <Image src="/images/svgs/facebook.svg" alt="facebook login" width={0} height={0} />
          </div>
          <span className="px-3 text-dark fw-normal ">{t('FACEBOOK_LOGIN')}</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default SocialLogin;
