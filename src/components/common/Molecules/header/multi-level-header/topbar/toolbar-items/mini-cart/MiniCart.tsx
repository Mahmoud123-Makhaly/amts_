'use client';
import React from 'react';

import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { ImageMaker, OffcanvasMaker } from '@components';

import MiniCartItem from './MiniCartItem';

const MiniCart = ({
  cart,
  cartCanvas,
  setCartCanvas,
}: {
  cart: DTO.ICartDTO | undefined;
  cartCanvas: boolean;
  setCartCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslate('COMP_MiniCart');
  return (
    <OffcanvasMaker
      offcavasToggler={() => setCartCanvas(false)}
      direction="end"
      headerClass="bg-light-blue p-4"
      isOpen={cartCanvas}
      header={
        <h6 className="fw-semibold">
          {t('SHOPPING_CART')} ({cart?.itemsCount})
        </h6>
      }
      canvasBody={
        <div className="px-3">
          {cart?.items?.length ? (
            <div>
              <div>
                <div className="overflow-auto flex-col-start justify-content-start mini-cart-items">
                  {cart?.items?.map(item => <MiniCartItem key={item.id} item={item} />)}
                </div>
                <div className="flex-between py-2 border-top  align-items-center border-light-gray">
                  <h6 className="text-black mb-0">{t('SUBTOTAL')}</h6>
                  <h6 className="mb-0">{cart?.subTotal?.formattedAmount}</h6>
                </div>
              </div>
              <div className="flex-col gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setCartCanvas(false)}
                  className="text-primary text-center px-3 border border-primary py-2 rounded w-100"
                >
                  {t('CART_LINK')}
                </Link>
                <Link
                  href="/checkout/add-address"
                  onClick={() => setCartCanvas(false)}
                  className={`text-white text-center px-3 bg-primary rounded py-2 w-100 ${!cart?.isValidInventoryQuantity?.data ? 'disabled' : ''}`}
                >
                  {t('CHECKOUT_LINK')}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex-col gap-4 p-4 p-md-5">
              <ImageMaker src={'/images/cart/cart.png'} />
              <h5 className="text-primary text-center">{t('EMPTY_CART_MESSAGE')}</h5>
              <Link className="btn-primary px-3 py-2" href={'/list'} onClick={() => setCartCanvas(false)}>
                {t('SHOP_NOW')}
              </Link>
            </div>
          )}
        </div>
      }
    />
  );
};

export default MiniCart;
