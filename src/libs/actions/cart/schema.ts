'server only';

import { z } from 'zod';
const getOrCreateCart = z.void().or(z.enum(['short', 'full']));
const getOrCreateDefaultGroupedProductsCart = z.void();

const addProductToCart = z.object({
  productId: z.string({ required_error: 'Product Id field is required' }),
  quantity: z.number({ required_error: 'Quantity field is required' }).min(1, 'Must be more than 1'),
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('short')),
});

const changeProductQuantityInCart = z.object({
  lineItemId: z.string({ required_error: 'Line Item Id field is required' }),
  quantity: z.number({ required_error: 'Quantity field is required' }).min(1, 'Must be more than 1'),
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('short')),
});

const clearCart = z.object({
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
});

const removeCartItem = z.object({
  lineItemId: z.string({ required_error: 'Line Item Id field is required' }),
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
});

const address = z.object({
  addressType: z.optional(z.number()),
  /** City */
  city: z.string({ required_error: 'City is required.' }),
  /** Country code */
  countryCode: z.optional(z.string()).default('EGY'),
  /** Country name */
  countryName: z.optional(z.string()).default('Egypt'),
  /** Email */
  email: z.optional(z.string()),
  /** First name */
  firstName: z.optional(z.string()),
  /** Id */
  id: z.optional(z.string()),
  /** Id */
  key: z.optional(z.string()),
  /** Last name */
  lastName: z.optional(z.string()),
  /** Line1 */
  formattedAddress: z.optional(z.string()),
  address: z.string({ required_error: 'address is required.' }),
  building: z.string({ required_error: 'building is required.' }),
  floor: z.string({ required_error: 'floor is required.' }),
  flat: z.string({ required_error: 'flat is required.' }),
  /** Phone */
  phone: z.optional(z.string()),
  /** Postal code */
  postalCode: z.optional(z.string()).default('00202'),
  /** Region id */
  regionId: z.optional(z.string()),
  regionName: z.optional(z.string()),
});

const addOrUpdateDefaultCartShipment = z.object({
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
  shipment: z.object({
    id: z.optional(z.string()),
    deliveryAddress: z.optional(address),
    shipmentMethodCode: z.string({ required_error: 'Shipment Method Code field is required' }),
    shipmentMethodOption: z.optional(z.nullable(z.string().nullish())).transform(value => value ?? undefined),
    fulfillmentCenterId: z.optional(z.string()),
  }),
});

const addOrUpdateDefaultCartPayment = z.object({
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
  payment: z.object({
    amount: z.number(),
    id: z.optional(z.string()),
    billingAddress: z.optional(address),
    paymentGatewayCode: z.string({ required_error: 'Payment Method Code field is required' }),
  }),
});

const mergeCart = z.object({
  secondCartId: z.string({ required_error: 'Second Cart Id field is required' }),
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
});

const mergeCartItemsByProductSKUs = z.object({
  cartId: z.string({ required_error: 'Cart Id field is required' }),
  items: z.array(
    z.object({
      lineItemId: z.string(),
      productName: z.string(),
      productSku: z.string(),
      quantity: z.number(),
    }),
  ),
  originalItems: z.array(
    z.object({
      lineItemId: z.string(),
      productName: z.string(),
      productSku: z.string(),
      quantity: z.number(),
    }),
  ),
});

const checkout = z.void();
const createOrderFromCart = z.string({ required_error: 'Cart Id field is required' });

export const Schema = {
  getOrCreateCart,
  addProductToCart,
  changeProductQuantityInCart,
  clearCart,
  removeCartItem,
  addOrUpdateDefaultCartShipment,
  addOrUpdateDefaultCartPayment,
  mergeCart,
  checkout,
  createOrderFromCart,
  getOrCreateDefaultGroupedProductsCart,
  mergeCartItemsByProductSKUs,
};
