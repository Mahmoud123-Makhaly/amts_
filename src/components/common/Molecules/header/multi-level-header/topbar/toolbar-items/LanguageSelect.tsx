'use client';
import React, { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@navigation';
import { ButtonMaker, ImageMaker } from '@components';

const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const url = searchParams.get('redirectURL') ? `${pathname}?redirectURL=${searchParams.get('redirectURL')}` : pathname;
  useEffect(() => {
    const savedLang = localStorage.getItem('I18N_LANGUAGE');
    if (savedLang && savedLang != locale) {
      router.push(url, { locale: savedLang });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ButtonMaker
      design="bg-transparent border-0 p-0 "
      onClick={() => {
        const newLang = locale === 'ar' ? 'en' : 'ar';
        localStorage.setItem('I18N_LANGUAGE', newLang);
        router.push(url, { locale: newLang });
      }}
    >
      <ImageMaker
        src={locale === 'ar' ? '/images/svgs/header/UK.svg' : '/images/svgs/header/EG.svg'}
        alt={'language'}
        className="rounded rounded-0 ms-2"
      />
    </ButtonMaker>
  );
};

export default LanguageSelect;
