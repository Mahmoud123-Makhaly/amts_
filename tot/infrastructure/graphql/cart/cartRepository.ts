import { IRepositories, Models, Entities } from '../../../domain';
import {
  CREATE_ORDER_FROM_CART,
  REMOVE_CART,
  addBulkItemsCartDocument,
  addCartItemDocument,
  addOrUpdateCartPaymentDocument,
  addOrUpdateCartShipmentDocument,
  changeCartItemQuantityDocument,
  clearCartDocument,
  getOrCreateCartDocument,
  mergeCartDocument,
  removeCartItemDocument,
  removeCartItemsDocument,
} from './documents';

export class CartRepository extends IRepositories.IEntityBaseRepository implements IRepositories.ICartRepository {
  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId);
  }

  getOrCreateCart = (
    type: 'short' | 'full' | 'withProductIDs',
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = getOrCreateCartDocument(type);
    return this._context
      .get<Required<Pick<Entities.Query, 'cart'>>, Entities.QueryCartArgs>({
        query: queryDocument,
        variables: {
          storeId: this.storeId,
          userId: this.userId,
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          cartName,
          cartType,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.getOrCreateCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.cart } as Models.Result<Entities.CartType>;
        }
      });
  };

  clearCart = (
    type: 'short' | 'full',
    cartId: string,
    cartName?: string | undefined,
    cartType?: string | undefined,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = clearCartDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'clearCart'>>, Entities.MutationsClearCartArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            cartId,
            cartName,
            cartType,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.clearCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.clearCart } as Models.Result<Entities.CartType>;
        }
      });
  };

  removeCart = (cartId: string): Promise<Models.Result<boolean>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'removeCart'>>, Entities.MutationsRemoveCartArgs>({
        mutation: REMOVE_CART,
        variables: {
          command: {
            userId: this.userId,
            cartId,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.removeCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.removeCart } as Models.Result<boolean>;
        }
      });
  };

  addItemToCart = (
    type: 'short' | 'full',
    productId: string,
    quantity: number,
    cartId: string,
    cartName: string,
    cartType: string,
    price?: number | undefined,
    comment?: string | undefined,
    dynamicProperties?:
      | Array<{ cultureName?: string | undefined; locale?: string | undefined; name: string; value?: any }>
      | undefined,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = addCartItemDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'addItem'>>, Entities.MutationsAddItemArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            cartId,
            cartName,
            cartType,
            productId,
            quantity,
            price,
            comment,
            dynamicProperties,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.addItemToCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.addItem } as Models.Result<Entities.CartType>;
        }
      });
  };

  addBulkItemsCart = (
    type: 'short' | 'full',
    cartId: string,
    cartItems: Array<Entities.InputNewBulkItemType>,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.BulkCartType>> => {
    const queryDocument = addBulkItemsCartDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'addBulkItemsCart'>>, Entities.MutationsAddBulkItemsCartArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            cartId,
            cartName,
            cartType,
            cartItems,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.addBulkItemsCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.BulkCartType>;
        } else {
          return { data: result.data?.addBulkItemsCart } as Models.Result<Entities.BulkCartType>;
        }
      });
  };

  changeCartItemQuantity = (
    type: 'short' | 'full',
    lineItemId: string,
    quantity: number,
    cartId: string,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = changeCartItemQuantityDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'changeCartItemQuantity'>>, Entities.MutationsChangeCartItemQuantityArgs>(
        {
          mutation: queryDocument,
          variables: {
            command: {
              storeId: this.storeId,
              userId: this.userId,
              cultureName: this.cultureName,
              currencyCode: this.currencyCode,
              cartId,
              cartName,
              cartType,
              lineItemId,
              quantity,
            },
          },
        },
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.changeCartItemQuantity',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.changeCartItemQuantity } as Models.Result<Entities.CartType>;
        }
      });
  };

  addOrUpdateCartShipment = (
    type: 'short' | 'full',
    cartId: string,
    shipment: Entities.InputShipmentType,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = addOrUpdateCartShipmentDocument(type);
    // console.log('repo inputs', {
    //   storeId: this.storeId,
    //   userId: this.userId,
    //   cultureName: this.cultureName,
    //   currencyCode: this.currencyCode,
    //   cartId,
    //   cartName,
    //   cartType,
    //   shipment,
    // });
    return this._context
      .post<
        Required<Pick<Entities.Mutations, 'addOrUpdateCartShipment'>>,
        Entities.MutationsAddOrUpdateCartShipmentArgs
      >({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            cartId,
            cartName,
            cartType,
            shipment,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.addOrUpdateCartShipment',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.addOrUpdateCartShipment } as Models.Result<Entities.CartType>;
        }
      });
  };

  addOrUpdateCartPayment = (
    type: 'short' | 'full',
    cartId: string,
    payment: Entities.InputPaymentType,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = addOrUpdateCartPaymentDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'addOrUpdateCartPayment'>>, Entities.MutationsAddOrUpdateCartPaymentArgs>(
        {
          mutation: queryDocument,
          variables: {
            command: {
              storeId: this.storeId,
              userId: this.userId,
              cultureName: this.cultureName,
              currencyCode: this.currencyCode,
              cartId,
              cartName,
              cartType,
              payment: { ...payment, currency: this.currencyCode },
            },
          },
        },
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.addOrUpdateCartPayment',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.addOrUpdateCartPayment } as Models.Result<Entities.CartType>;
        }
      });
  };

  removeCartItem = (
    type: 'short' | 'full',
    lineItemId: string,
    cartId: string,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = removeCartItemDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'removeCartItem'>>, Entities.MutationsRemoveCartItemArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            lineItemId,
            cartId,
            cartName,
            cartType,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.removeCartItem',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.removeCartItem } as Models.Result<Entities.CartType>;
        }
      });
  };

  removeCartItems = (
    type: 'short' | 'full',
    cartId: string,
    lineItemIds: Array<string>,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = removeCartItemsDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'removeCartItems'>>, Entities.MutationsRemoveCartItemsArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            lineItemIds,
            cartId,
            cartName,
            cartType,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.removeCartItems',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.removeCartItems } as Models.Result<Entities.CartType>;
        }
      });
  };

  mergeCart = (
    type: 'short' | 'full',
    cartId: string,
    secondCartId: string,
    cartName: string,
    cartType: string,
  ): Promise<Models.Result<Entities.CartType>> => {
    const queryDocument = mergeCartDocument(type);
    return this._context
      .post<Required<Pick<Entities.Mutations, 'mergeCart'>>, Entities.MutationsMergeCartArgs>({
        mutation: queryDocument,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            secondCartId,
            cartId,
            cartName,
            cartType,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.mergeCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CartType>;
        } else {
          return { data: result.data?.mergeCart } as Models.Result<Entities.CartType>;
        }
      });
  };

  createOrderFromCart = (cartId: string): Promise<Models.Result<Entities.CustomerOrderType>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'createOrderFromCart'>>, Entities.MutationsCreateOrderFromCartArgs>({
        mutation: CREATE_ORDER_FROM_CART,
        variables: {
          command: { cartId },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartRepository.createOrderFromCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CustomerOrderType>;
        } else {
          return { data: result.data?.createOrderFromCart } as Models.Result<Entities.CustomerOrderType>;
        }
      });
  };
}
