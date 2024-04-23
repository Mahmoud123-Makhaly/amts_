import React from 'react';
import { useTranslate } from '@app/hooks';

const EmptyAddress = () => {
  const t = useTranslate('COMP_EmptyAddress');
  return (
    <div className="d-flex align-items-center gap-2 py-2 static-page text-dimmed">
      <i className="fa-solid fa-map-location-dot "></i>
      <p>{t('NO_ADDRESS')}</p>
    </div>
  );
};

export default EmptyAddress;
