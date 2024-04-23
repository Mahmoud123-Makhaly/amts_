'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';

import { client } from '../client';
import { Schema } from './schema';
import { InventoryRegionCheckoutProcess } from './InventoryRegionCheckoutProcess';

export const getOrCreateDefaultCart = cache(
  client(Schema.getOrCreateCart, async (type, { _context, selectedInventory }) => {
    return _context.cartServices?.getOrCreateCart(
      !['short', 'full'].some(x => x === type) ? 'short' : (type as 'short' | 'full'),
      selectedInventory?.id,
    );
  }),
);

export const getOrCreateDefaultGroupedProductsCart = cache(
  client(Schema.getOrCreateDefaultGroupedProductsCart, async (type, { _context, selectedInventory }) => {
    return _context.cartServices?.getOrCreateGroupedProductsCart(selectedInventory?.id);
  }),
);

export const mergeCartItemsByProductSKUs = cache(
  client(Schema.mergeCartItemsByProductSKUs, async (inputs, { _context, selectedInventory }) => {
    const { cartId, items, originalItems } = inputs;
    return _context.cartServices?.mergeCartItemsByProductSKUs(cartId, items, originalItems);
  }),
);

export const addProductToCart = client(Schema.addProductToCart, async (inputs, { _context, selectedInventory }) => {
  const { productId, cartId, type, quantity } = inputs;
  const response = await _context.cartServices?.addItemToCart(productId, quantity, cartId, selectedInventory?.id, type);
  if (response?.data) {
    revalidatePath('/[locale]/(main)/(container)/profile/wishlist', 'page');
    revalidatePath('/[locale]/(main)/list/[[...path]]', 'page');
    revalidatePath('/[locale]/(main)/(container)/product/[...slug]', 'page');
    revalidatePath('/[locale]/(main)/(container)/cart', 'page');
    revalidatePath('/[locale]/(checkout)/checkout', 'page');
  }
  return response;
});

export const changeProductQuantityInCart = client(
  Schema.changeProductQuantityInCart,
  async (inputs, { _context, selectedInventory }) => {
    const { lineItemId, cartId, type, quantity } = inputs;
    const response = await _context.cartServices?.changeCartItemQuantity(
      lineItemId,
      quantity,
      cartId,
      selectedInventory?.id,
      type,
    );
    if (response?.data) {
      revalidatePath('/[locale]/(main)/(container)/cart', 'page');
      revalidatePath('/[locale]/(checkout)/checkout', 'page');
    }

    return response;
  },
);

export const clearCart = client(Schema.clearCart, async (inputs, { _context, selectedInventory }) => {
  const { cartId, type } = inputs;
  const response = await _context.cartServices?.clearCart(cartId, selectedInventory?.id, type);
  if (response?.data) {
    revalidatePath('/[locale]/(main)/(container)/cart', 'page');
    revalidatePath('/[locale]/(checkout)/checkout', 'page');
  }

  return response;
});

export const removeCartItem = client(Schema.removeCartItem, async (inputs, { _context, selectedInventory }) => {
  const { cartId, type, lineItemId } = inputs;
  const response = await _context.cartServices?.removeCartItem(lineItemId, cartId, selectedInventory?.id, type);
  if (response?.data) {
    revalidatePath('/[locale]/(main)/(container)/cart', 'page');
    revalidatePath('/[locale]/(checkout)/checkout', 'page');
  }

  return response;
});

export const addOrUpdateDefaultCartShipment = client(
  Schema.addOrUpdateDefaultCartShipment,
  async (inputs, { _context, selectedInventory }) => {
    const { cartId, type, shipment } = inputs;
    const response = await _context.cartServices?.addOrUpdateCartShipment(
      cartId,
      shipment,
      selectedInventory?.id,
      type,
    );
    if (response?.data) {
      revalidatePath('/[locale]/(main)/(container)/cart', 'page');
      revalidatePath('/[locale]/(checkout)/checkout', 'page');
    }

    return response;
  },
);

export const addOrUpdateDefaultCartPayment = client(
  Schema.addOrUpdateDefaultCartPayment,
  async (inputs, { _context, selectedInventory }) => {
    const { cartId, type, payment } = inputs;
    const response = await _context.cartServices?.addOrUpdateCartPayment(cartId, payment, selectedInventory?.id, type);
    if (response?.data) {
      revalidatePath('/[locale]/(main)/(container)/cart', 'page');
      revalidatePath('/[locale]/(checkout)/checkout', 'page');
    }

    return response;
  },
);

export const mergeCart = client(Schema.mergeCart, async (inputs, { _context, selectedInventory }) => {
  const { cartId, type, secondCartId } = inputs;
  const response = await _context.cartServices?.mergeCart(cartId, secondCartId, selectedInventory?.id, type);
  if (response?.data) {
    revalidatePath('/[locale]/(main)/(container)/cart', 'page');
    revalidatePath('/[locale]/(checkout)/checkout', 'page');
    revalidatePath('/[locale]/(main)/(container)/profile/wishlist', 'page');
  }

  return response;
});

export const checkout = client(Schema.checkout, async (inputs, { _context, selectedInventory }) => {
  const response = await _context.checkoutServices?.checkout(undefined, {
    id: selectedInventory?.id,
    name: selectedInventory?.name,
  });
  if (response?.data) {
    revalidatePath('/[locale]/(main)/(container)/cart', 'page');
    revalidatePath('/[locale]/(checkout)/checkout', 'page');
    revalidatePath('/[locale]/(main)/(container)/profile/wishlist', 'page');
  }

  return response;
});

export const createOrderFromCart = client(Schema.createOrderFromCart, async (cartId, { _context }) => {
  const response = await _context.cartServices?.createOrderFromCart(cartId);
  if (response?.data && response?.data.number) revalidatePath('/');

  return response;
});
