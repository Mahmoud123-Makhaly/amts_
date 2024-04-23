'use client';
import React from 'react';
import { SwitchButton } from '@components';
import { usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';

const PackagesHeader = () => {
  const t = useTranslate('COMP_Packages_Header');
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname.split('/')[2];

  return (
    <div className="flex-center my-4">
      <p>{t('CORPORATE')}</p>
      <SwitchButton
        className="mx-3  text-white"
        checked={url === 'individual' ? true : false}
        onClick={() => router.push(url === 'individual' ? '/packages/corporate' : '/packages/individual')}
      />
      <p>{t('INDIVIDUAL')}</p>
    </div>
  );
};

export default PackagesHeader;
