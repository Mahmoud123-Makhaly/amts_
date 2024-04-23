'use client';
import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

import { useToast, useTranslate, useDebounce, useAppStore } from '@app/hooks';
import { ButtonMaker, CardMaker, CheckInput, Counter, FavoriteForm, ImageMaker } from '@components';
import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

const GroupedCartProduct = ({
  variations,
  isValidInventoryQuantity,
  setCartRemoval,
  cartRemoval,
}: {
  variations: Array<DTO.IProductLineItemTypeDTO>;
  isValidInventoryQuantity?: DTO.IProductQuantityValidatorDTO;
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
}) => {
  const t = useTranslate('COMP_Product_Summary');
  const toast = useToast();
  const { defaultCart, changeDefaultCart, changePreloader } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    defaultCart: state.cart.default,
    changePreloader: state.layout.changePreloader,
  }));
  const [cardData, setCardData] = useState<{
    variations: Array<DTO.IProductLineItemTypeDTO>;
    activeVariation: DTO.IProductLineItemTypeDTO;
  }>({ variations, activeVariation: variations.find(v => v.lineItemId) ?? variations[0] });
  const [changeQuantity, setChangeQuantity] = useState<
    { lineItemId?: string; productId: string; quantity: number } | undefined
  >(undefined);
  const debouncedQuantity = useDebounce(changeQuantity, 500);

  useEffect(() => {
    const handleChangeCount = async () => {
      if (
        debouncedQuantity &&
        debouncedQuantity.quantity > 0 &&
        defaultCart?.id &&
        (debouncedQuantity.lineItemId || debouncedQuantity.productId)
      ) {
        changePreloader && changePreloader('enable');
        const {
          data: cartResponse,
          validationErrors,
          serverError,
        } = debouncedQuantity.lineItemId
          ? await Actions.cart.changeProductQuantityInCart({
              cartId: defaultCart.id,
              lineItemId: debouncedQuantity.lineItemId,
              quantity: debouncedQuantity.quantity,
            })
          : await Actions.cart.addProductToCart({
              productId: debouncedQuantity.productId,
              cartId: defaultCart.id,
              quantity: debouncedQuantity.quantity,
            });

        if (validationErrors || serverError || cartResponse?.error) {
          toast.error(t('GENERIC_ERR_MSG'));
        } else {
          if (cartResponse?.data) {
            changeDefaultCart(cartResponse?.data);
            setChangeQuantity(undefined);
            window.location.reload();
          }
        }
        changePreloader && changePreloader('disable');
      }
    };
    handleChangeCount();
  }, [changeDefaultCart, changePreloader, debouncedQuantity, defaultCart, t, toast]);

  return (
    <React.Fragment key={cardData.activeVariation.id}>
      <CardMaker
        className="flex-row h-product-card bg-light-gray p-4 cart-card-item"
        img={cardData.activeVariation.imgSrc}
      >
        <div className="rounded-bottom px-3 flex-col-between h-100 w-75">
          <Link href={`/product/${cardData.activeVariation.slug}`} className="w-100">
            <div className="text-start w-100 ">
              <h5 className="m-0 pb-3"> {cardData.activeVariation.name}</h5>
              <div className="flex-start gap-2">
                <h6 className="text-primary fw-bold m-0">{cardData.activeVariation.price?.sale?.formattedAmount}</h6>
              </div>
            </div>
            {cardData.activeVariation.description && <p className="py-2">{cardData.activeVariation.description}</p>}
          </Link>
          <div
            role="group"
            aria-labelledby="variants"
            defaultValue={cardData.activeVariation.slug}
            className="d-flex align-items-center gap-2 mt-3 text-primary"
          >
            {cardData.variations.length > 1 &&
              cardData.variations.map((variant, indx) => (
                <CheckInput
                  type="radio"
                  key={variant.slug ?? `variant-${indx}`}
                  name="variants"
                  className={`border rounded py-2 box-shadow${cardData.activeVariation.slug !== variant.slug ? ' pointer bg-white' : 'bg-primary'}`}
                  defaultChecked={cardData.activeVariation.slug === variant.slug}
                  disabled={cardData.activeVariation.slug === variant.slug}
                  value={variant.slug}
                  onClick={() => {
                    setCardData(prev => ({ ...prev, activeVariation: variant }));
                  }}
                >
                  <p className=" px-2">{variant.name}</p>
                </CheckInput>
              ))}
          </div>
          <div className="d-flex align-items-center gap-2 mt-3">
            <Counter
              id={cardData.activeVariation.id}
              defaultValue={cardData.activeVariation.quantity ?? 0}
              min={0}
              max={cardData.activeVariation.inventoryAvailableQuantity}
              onChange={val => {
                setChangeQuantity({
                  productId: cardData.activeVariation.id,
                  lineItemId: cardData.activeVariation.lineItemId,
                  quantity: val,
                });
              }}
              design="bg-white box-shadow"
            />
            <FavoriteForm product={cardData.activeVariation!} enableActionNotification className="box-shadow" />
            {cardData.activeVariation.lineItemId && (
              <ButtonMaker
                design="bg-white box-shadow"
                onClick={() =>
                  setCartRemoval({
                    ...cartRemoval,
                    remove: true,
                    lineItemId: cardData.activeVariation.lineItemId ?? '',
                  })
                }
              >
                <ImageMaker alt="delete" src="/images/svgs/cart/delete.svg" />
              </ButtonMaker>
            )}
          </div>
        </div>
      </CardMaker>
      {isValidInventoryQuantity?.error.some(x => x.id === cardData.activeVariation.id) && (
        <Alert color="danger" className="bg-transparent d-inline-block ms-4 px-3 py-2 ">
          <div className="d-flex align-items-center gap-2">
            <ImageMaker src="/images/svgs/cart/info.svg" />
            <p className="font-14 text-danger">
              {t('INVALID_QUANTITY_MESSAGE', {
                quantity: isValidInventoryQuantity?.error.find(v => v.id === cardData.activeVariation.id)
                  ?.availableQuantity,
              })}
            </p>
          </div>
        </Alert>
      )}
    </React.Fragment>
  );
};
export default GroupedCartProduct;
