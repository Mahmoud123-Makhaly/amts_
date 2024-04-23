import React from 'react';
import Image from 'next/image';

import check from '@assets/images/auth/Check mark.svg';
import { ButtonMaker, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

const ContactUsModal = () => {
  const t = useTranslate('COMP_Modal_Content');
  return (
    <div className="py-4 px-3 text-center">
      <h5 className=" fw-bold m-0 font-20 pb-4 border-bottom">{t('THANKS_MESSAGE')} </h5>
      <p className="text-dark-gray  py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>

      <Link href={'/'} className="btn btn-primary text-white w-100 py-2">
        {t('GO_TO_HOME')}
      </Link>
    </div>
  );
};

export default ContactUsModal;
