'use client';
import React from 'react';
import { useTranslate } from '@app/hooks';
import { Message } from '@components';
import { Link } from '@navigation';

const EmptyCart = () => {
  const t = useTranslate('Comp_Empty_Template');

  return (
    <Message img="/images/cart/empty.png" className="flex-col gap-4 my-5" alt="empty cart">
      <p className="mt-3 text-dark-gray">{t('EMPTY_CART_MESSAGE')}</p>
      <Link href="/list" className="btn btn-secondary py-2 px-5 fw-medium">
        {t('SHOPPING_NOW')}
      </Link>
    </Message>
  );
};

export default EmptyCart;
