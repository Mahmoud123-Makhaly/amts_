'use client';
import React from 'react';

import { useToast, useTranslate } from '@app/hooks';
import { ButtonMaker, CardMaker, Counter, FavoriteForm, HProductCard, ImageMaker } from '@components';
import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { Alert } from 'reactstrap';

interface CartProductProps {
  item: DTO.ILineItemTypeDTO;
  enablePreLoader: () => void;
  isValidInventoryQuantity?: DTO.IProductQuantityValidatorDTO;

  cartId: string | undefined;
  changeDefaultCart: (action: DTO.ICartDTO) => void;
  setCartRemoval: React.Dispatch<
    React.SetStateAction<{
      remove: boolean;
      clear: boolean;
      lineItemId: string;
    }>
  >;
  cartRemoval: {
    remove: boolean;
    clear: boolean;
    lineItemId: string;
  };
}
const CartProduct = ({
  item,
  isValidInventoryQuantity,
  enablePreLoader,
  cartId,
  changeDefaultCart,
  setCartRemoval,
  cartRemoval,
}: CartProductProps) => {
  const t = useTranslate('COMP_Product_Summary');
  const toast = useToast();

  const handleChangeCount = (lineItemId: string, quantity: number) => {
    setTimeout(async () => {
      if (quantity > 0 && document && cartId) {
        document.getElementById(lineItemId)?.setAttribute('disabled', 'true');
        enablePreLoader();
        const {
          data: cartResponse,
          validationErrors,
          serverError,
        } = await Actions.cart.changeProductQuantityInCart({
          cartId: cartId,
          lineItemId,
          quantity,
        });

        if (validationErrors || serverError || cartResponse?.error) {
          toast.error(t('GENERIC_ERR_MSG'));
        } else {
          if (cartResponse?.data) {
            changeDefaultCart(cartResponse?.data);
          }
        }

        document.getElementById(lineItemId)?.removeAttribute('disabled');
      }
    }, 1000);
  };

  return (
    <HProductCard
      className="border rounded p-3"
      product={item.product}
      img={item.imageUrl}
      actionButton={
        <div className="d-flex align-items-center gap-2 ">
          <Counter
            id={item.id}
            defaultValue={item.quantity ?? 1}
            min={1}
            max={item.product?.inventoryAvailableQuantity}
            onChange={val => handleChangeCount(item.id, val)}
            design="bg-white box-shadow"
          ></Counter>
          {isValidInventoryQuantity?.error.some(x => x.id === item?.product?.id) && (
            <Alert color="danger" className="bg-transparent d-inline-block ms-2 mb-0 px-3 ">
              <div className="d-flex align-items-center gap-2">
                <p className="font-14 text-danger">
                  {t('INVALID_QUANTITY_MESSAGE', {
                    quantity: isValidInventoryQuantity?.error.find(v => v.id === item?.product?.id)?.availableQuantity,
                  })}
                </p>
              </div>
            </Alert>
          )}
        </div>
      }
    >
      <ButtonMaker
        design="bg-transparent border-0 px-0 flex-center gap-2"
        onClick={() => setCartRemoval({ ...cartRemoval, remove: true, lineItemId: item.id })}
      >
        <ImageMaker alt="delete" src="/images/cart/remove.svg" width={22} height={24} />
        <p className="text-decoration-underline text-danger">{t('REMOVE')}</p>
      </ButtonMaker>
    </HProductCard>
  );
};

export default CartProduct;
