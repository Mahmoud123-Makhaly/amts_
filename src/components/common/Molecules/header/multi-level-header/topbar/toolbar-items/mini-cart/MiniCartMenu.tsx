'use client';

import React, { useEffect, useState } from 'react';

import { ButtonMaker, DropDown, ImageMaker } from '@components';
import { Actions } from '@libs/actions';
import { useAppStore } from '@app/hooks';
import MiniCart from './MiniCart';

const MiniCartMenu = () => {
  const [cartCanvas, setCartCanvas] = useState<boolean>(false);
  const { changeDefaultCart, cart, user, isCartLoaded } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    cart: state.cart.default,
    isCartLoaded: state.cart.isLoaded,
    user: state.appAccount.user,
  }));

  useEffect(() => {
    const loadDefaultCart = async () => {
      if (user && !isCartLoaded && (!cart || !cart.id)) {
        const { data: cartResponse, serverError, validationErrors } = await Actions.cart.getOrCreateDefaultCart();
        if (cartResponse?.data) {
          changeDefaultCart && changeDefaultCart(cartResponse.data);
        } else {
        }
      }
    };
    loadDefaultCart();
  }, [cart, changeDefaultCart, isCartLoaded, user]);

  return (
    <React.Fragment>
      <MiniCart cart={cart} cartCanvas={cartCanvas} setCartCanvas={() => setCartCanvas(!cartCanvas)} />
      <ButtonMaker design="p-0 bg-transparent border-0 " onClick={() => setCartCanvas(true)}>
        <div className="position-relative flex-center border-end rounded-0 pe-2">
          <ImageMaker src="/images/svgs/header/cart.svg" alt={'cart'} />
          {(cart?.items?.length ?? 0) > 0 && (
            <span className="bg-dark-blue ms-3 mb-3 font-10 rounded-circle position-absolute outline-icon-15 text-white mini-cart-summary">
              {cart?.items?.length}
            </span>
          )}
        </div>
      </ButtonMaker>
    </React.Fragment>
  );
};

export default MiniCartMenu;
