import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';
import { DTO, Models } from '../types';

export abstract class ICartService extends IBaseService<IRepositories.ICartRepository> {
  protected defaultCartName = 'default';
  protected cartType = 'shopping-cart';

  abstract getOrCreateCart(
    type?: 'short' | 'full',
    inInventory?: string | undefined,
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract getOrCreateGroupedProductsCart(
    inInventory?: string | undefined,
    cartName?: string,
  ): Promise<Result<DTO.IGroupedProductsCartDTO>>;

  abstract clearCart(
    cartId: string,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract removeCart(cartId: string): Promise<Result<boolean>>;

  abstract addItemToCart(
    /** Product ID */
    productId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
    /** Comment */
    comment?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract changeCartItemQuantity(
    /** Line item Id */
    lineItemId: string,
    /** Quantity */
    quantity: number,
    cartId: string,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract addOrUpdateCartShipment(
    cartId: string,
    /** Shipment */
    shipment: Models.InputShipmentType,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract addOrUpdateCartPayment(
    cartId: string,
    /** Payment */
    payment: Models.InputPaymentType,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract removeCartItem(
    lineItemId: string,
    cartId: string,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract mergeCart(
    cartId: string,
    secondCartId: string,
    inInventory?: string | undefined,
    type?: 'short' | 'full',
    cartName?: string,
  ): Promise<Result<DTO.ICartDTO>>;

  abstract createOrderFromCart(cartId: string): Promise<Result<DTO.IInvoiceDTO>>;

  abstract mergeCartItemsByProductSKUs(
    cartId: string,
    items: Array<{ lineItemId: string; productName: string; productSku: string; quantity: number }>,
    originalItems: Array<{ lineItemId: string; productName: string; productSku: string; quantity: number }>,
    type?: 'short' | 'full',
  ): Promise<Result<DTO.ICartDTO>>;
}
