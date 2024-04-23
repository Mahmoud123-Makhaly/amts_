'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Alert } from 'reactstrap';
import Image from 'next/image';

import { DTO } from '@tot/core/types';
import { useToast, useTranslate, useAppStore } from '@app/hooks';
import { useRouter } from '@navigation';
import { ButtonMaker, CartSummaryMaker } from '@components';
import { Actions } from '@libs/actions';

import CartProduct from './cart-list/CartProduct';
import EmptyCart from './EmptyCart';
import RemovalConfirmModals from './cart-list/RemovalConfirmModals';

const ShoppingCart = ({ cart }: { cart?: DTO.ICartDTO }) => {
  const [cartRemoval, setCartRemoval] = useState<{
    remove: boolean;
    clear: boolean;
    lineItemId: string;
  }>({ remove: false, clear: false, lineItemId: '' });
  const [remove, setRemove] = useState(true);
  const router = useRouter();
  const toast = useToast();
  const { changeDefaultCart, changePreloader } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    changePreloader: state.layout.changePreloader,
  }));
  const t = useTranslate('COMP_Product_Summary');

  const shoppingCartSummary = [
    {
      text: t('SUB_TOTAL'),
      price: cart?.subTotal?.formattedAmount ?? 0,
    },
    {
      text: t('COUPON_DISCOUNT'),
      price: cart?.discountTotalWithTax?.formattedAmount ?? 0,
    },
    {
      text: t('SHIPPING_FEES'),
      price: cart?.shippingTotal?.formattedAmount ?? 0,
    },
  ];
  const handleClearCart = async () => {
    setCartRemoval({ ...cartRemoval, clear: false });
    enablePreLoader();
    if (cart?.id) {
      const { data: cartResponse, serverError, validationErrors } = await Actions.cart.clearCart({ cartId: cart.id });
      if (validationErrors || serverError || cartResponse?.error) {
        toast.error(t('GENERIC_ERR_MSG'));
      } else {
        if (cartResponse?.data) {
          changeDefaultCart && changeDefaultCart(cartResponse.data);
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    if (cart && changePreloader) changePreloader('disable');
  }, [changePreloader, cart]);

  const enablePreLoader = () => {
    if (changePreloader) changePreloader('enable');
  };

  const handleRemoveCartItem = async () => {
    setCartRemoval({ ...cartRemoval, remove: false });
    enablePreLoader();
    if (cart?.id) {
      const {
        data: cartResponse,
        serverError,
        validationErrors,
      } = await Actions.cart.removeCartItem({
        lineItemId: cartRemoval.lineItemId,
        cartId: cart.id,
      });
      if (validationErrors || serverError || cartResponse?.error) {
        toast.error(t('GENERIC_ERR_MSG'));
      } else {
        if (cartResponse?.data) {
          changeDefaultCart && changeDefaultCart(cartResponse.data);
          window.location.reload();
        }
      }
    }
  };

  return (
    <div className="paddingy-30 shopping-cart">
      <RemovalConfirmModals
        setCartRemoval={setCartRemoval}
        cartRemoval={cartRemoval}
        handleRemoveCartItem={handleRemoveCartItem}
        handleClearCart={handleClearCart}
      />

      {cart?.items?.length ? (
        <Row className="my-3 row-gap-3">
          <Col lg={7} xl={8} className="flex-col justify-content-start gap-3 mb-lg-0">
            <div className="d-flex justify-content-end w-100  ">
              {cart?.items?.length ? (
                <ButtonMaker
                  text={t('CLEAR')}
                  design="bg-transparent text-primary  fw-semibold text-decoration-underline border-0 "
                  onClick={() => setCartRemoval({ ...cartRemoval, clear: true })}
                />
              ) : null}
            </div>
            <Row>
              {cart.items &&
                cart.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-light-gray w-100 rounded" key={`cart-line-item-var-${index}`}>
                      <CartProduct
                        isValidInventoryQuantity={cart.isValidInventoryQuantity}
                        item={item}
                        setCartRemoval={setCartRemoval}
                        cartRemoval={cartRemoval}
                        enablePreLoader={enablePreLoader}
                        cartId={cart.id}
                        changeDefaultCart={changeDefaultCart}
                      />
                    </div>
                  </React.Fragment>
                ))}
            </Row>
          </Col>
          <Col lg={5} xl={4}>
            <div>
              <CartSummaryMaker
                className="rounded border bg-light-gray"
                items={shoppingCartSummary}
                header={
                  <div className="flex-between pb-4 border-bottom">
                    <p className="fw-semibold">{t('TOTAL_ITEMS')}</p>
                    <p className="text-dark-gray">{cart.itemsQuantity}</p>
                  </div>
                }
                footer={
                  <div className="flex-between pt-4 border-top mt-4">
                    <p className="fw-semibold">{t('TOTAL_ORDER')}</p>
                    <p className="text-dark-gray fw-bold">{cart.total?.formattedAmount}</p>
                  </div>
                }
              ></CartSummaryMaker>
              <div className="flex-between mt-3  position-relative">
                <Input placeholder={t('ENTER_COUPON')} className=" me-2   py-2 pe-3 ps-5" />
                <div className="px-3 position-absolute start-0">
                  <Image src="/images/cart/ri.svg" alt="input-icon" className="" width={24} height={24} />
                </div>

                <ButtonMaker text={t('APPLY')} design="  py-2 px-3" onClick={() => setRemove(true)} />
              </div>
              {remove && (
                <Alert className="w-100 border-success fw-semibold px-2 my-3 flex-between py-2 align-items-center">
                  <div className="check-icon">
                    <Image src="/images/cart/check.svg" alt="check" width={32} height={32} />
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="payment-method ps-3 font-13 text-success ">
                      {t('DISCOUNT_ALERT')} {cart?.discountTotalWithTax?.formattedAmount ?? 0}
                    </p>
                  </div>

                  <ButtonMaker
                    text={t('REMOVE')}
                    design="bg-transparent text-primary  p-0 border-0 text-decoration-underline"
                    onClick={() => setRemove(false)}
                  />
                </Alert>
              )}
              <div className="text-center mt-3">
                <ButtonMaker
                  text={t('PROCEED_TO_PAY')}
                  onClick={() => router.push('/checkout/add-address')}
                  design={`align-items-center d-flex`}
                  disabled={!cart.isValidInventoryQuantity?.data}
                  block
                />
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default ShoppingCart;
