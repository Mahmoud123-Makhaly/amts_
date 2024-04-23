'use client';
import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

import { useToast, useTranslate, useDebounce, useAppStore } from '@app/hooks';
import { ButtonMaker, CardMaker, Counter, FavoriteForm, ImageMaker, Variation } from '@components';
import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';
import { Utils } from '@libs';

const SuccessorsCartProduct = ({
  item,
  isValidInventoryQuantity,
  setCartRemoval,
  cartRemoval,
  lineItems,
}: {
  item: DTO.ILineItemTypeDTO;
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
  lineItems: Array<DTO.ILineItemTypeDTO>;
}) => {
  const t = useTranslate('COMP_Product_Summary');
  const toast = useToast();
  const { defaultCart, changeDefaultCart, changePreloader } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    defaultCart: state.cart.default,
    changePreloader: state.layout.changePreloader,
  }));

  const [changeQuantity, setChangeQuantity] = useState<{ lineItemId?: string; quantity: number } | undefined>(
    undefined,
  );
  const debouncedQuantity = useDebounce(changeQuantity, 500);

  useEffect(() => {
    const handleChangeCount = async () => {
      if (debouncedQuantity && debouncedQuantity.quantity > 0 && defaultCart?.id && debouncedQuantity.lineItemId) {
        changePreloader && changePreloader('enable');
        const {
          data: cartResponse,
          validationErrors,
          serverError,
        } = await Actions.cart.changeProductQuantityInCart({
          cartId: defaultCart.id,
          lineItemId: debouncedQuantity.lineItemId,
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

  const onSuccessorSelect = async (lineItemId: string, productName: string, productSku: string, quantity: number) => {
    if (defaultCart?.id) {
      const filteredLineItems = lineItems.filter(x => x.id != lineItemId);
      const {
        data: mergeResponse,
        validationErrors,
        serverError,
      } = await Actions.cart.mergeCartItemsByProductSKUs({
        cartId: defaultCart.id,
        items: [
          { lineItemId, productName, productSku, quantity },
          ...((filteredLineItems
            .map(x => ({
              lineItemId: x.id,
              productName: x.name,
              productSku: x.sku,
              quantity: x.quantity,
            }))
            .filter(x => !!x.productName && !!x.productSku && !!x.quantity) ?? []) as Array<{
            quantity: number;
            productName: string;
            productSku: string;
            lineItemId: string;
          }>),
        ],
        originalItems: lineItems.map(item => ({
          lineItemId: item.id,
          productName: item.name,
          productSku: item.sku,
          quantity: item.quantity,
        })) as Array<{
          quantity: number;
          productName: string;
          productSku: string;
          lineItemId: string;
        }>,
      });
      if (validationErrors || serverError || mergeResponse?.error) {
        toast.error(t('GENERIC_ERR_MSG'));
      } else {
        if (mergeResponse?.data) {
          changeDefaultCart(mergeResponse?.data);
          window.location.reload();
        }
      }
    }
  };

  return (
    <React.Fragment>
      <CardMaker className="flex-row h-product-card bg-light-gray p-4 cart-card-item" img={item.imageUrl}>
        <div className="rounded-bottom px-3 flex-col-between h-100 w-75">
          <Link href={`/product/${item.product?.slug}`} className="w-100">
            <div className="text-start w-100 ">
              <h5 className="m-0 pb-3"> {item.name}</h5>
              <div className="flex-start gap-2">
                <h6 className="text-primary fw-bold m-0">{item.placedPrice?.formattedAmount}</h6>
              </div>
            </div>
            {item.product?.description && <p className="py-2">{item.product?.description}</p>}
          </Link>
          <div className="d-flex align-items-center gap-2 mt-3">
            {item.product?.hasVariations && item.product.variations?.length && (
              <Variation
                variations={[...item.product.variations, Utils.mapIProductDTOtoIVariantDTO(item.product)]}
                selectedVariantsSlugs={[item.product.slug ?? '']}
                onSelect={v => onSuccessorSelect(item.id, v.name ?? '', v.code ?? '', item.quantity ?? 1)}
              />
            )}
            {!item.product?.hasVariations && item.product?.masterVariation && (
              <Variation
                master={item.product.masterVariation}
                selectedVariantsSlugs={[item.product.slug ?? '']}
                onSelect={v => onSuccessorSelect(item.id, v.name ?? '', v.code ?? '', item.quantity ?? 1)}
              />
            )}
          </div>
          <div className="d-flex align-items-center gap-2 mt-3">
            <Counter
              id={item.id}
              defaultValue={item.quantity ?? 1}
              min={1}
              max={item.product?.inventoryAvailableQuantity}
              onChange={val =>
                setChangeQuantity({
                  lineItemId: item.id,
                  quantity: val,
                })
              }
              design="bg-white box-shadow"
            />
            <FavoriteForm product={item.product!} enableActionNotification className="box-shadow" />
            <ButtonMaker
              design="bg-white box-shadow"
              onClick={() => setCartRemoval({ ...cartRemoval, remove: true, lineItemId: item.id })}
            >
              <ImageMaker alt="delete" src="/images/svgs/cart/delete.svg" />
            </ButtonMaker>
          </div>
        </div>
      </CardMaker>
      {isValidInventoryQuantity?.error.some(x => x.id === item?.product?.id) && (
        <Alert color="danger" className="bg-transparent d-inline-block ms-4 px-3 py-2 ">
          <div className="d-flex align-items-center gap-2">
            <ImageMaker src="/images/svgs/cart/info.svg" />
            <p className="font-14 text-danger">
              {t('INVALID_QUANTITY_MESSAGE', {
                quantity: isValidInventoryQuantity?.error.find(v => v.id === item?.product?.id)?.availableQuantity,
              })}
            </p>
          </div>
        </Alert>
      )}
    </React.Fragment>
  );
};
export default SuccessorsCartProduct;
