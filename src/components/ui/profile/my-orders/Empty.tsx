import React from 'react';

import { useTranslate } from '@app/hooks';
import { ImageMaker } from '@components';
const Empty = () => {
  const t = useTranslate('COMP_EMPTY_ORDERS');
  return (
    <div className="flex-col py-5 text-center static-page">
      <div className="empty-wishlist-image mb-5">
        <ImageMaker src="/images/profile/my-orders/emptyOrders.png" alt="orders is empty" className="img-fluid" />
      </div>
      <div className="mt-3">
        <h2 className="m-0">{t('EMPTY_MSG')}</h2>
      </div>
    </div>
  );
};

export default Empty;
