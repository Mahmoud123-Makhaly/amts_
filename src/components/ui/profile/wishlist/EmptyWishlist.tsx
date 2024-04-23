import React from 'react';
import { ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Link } from '@navigation';

const EmptyWishlist = () => {
  const t = useTranslate('COMP_Empty_Template');
  return (
    <div className="flex-col   w-100 my-5">
      <ImageMaker src="/images/profile/wishlist/empty.png" alt="empty" className="mb-5" />
      <p className="font-20 fw-semibold mb-4">{t('NO_FAVORITE_PRODUCTS')}</p>
      <Link href="/list" className="rounded-2 px-5 py-2 btn btn-primary">
        {t('SHOW_NOW')}
      </Link>
    </div>
  );
};

export default EmptyWishlist;
