import { ICartService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO, Models } from '../types';
import { Entities } from '../../domain/index';
import { Mapper } from '../mapper';
import { ProductServices } from './ProductServices';

export class CartServices extends ICartService {
  private _productServices = new ProductServices(this._configurations, this._repos, this._client);

  protected setContext() {
    this._context = new this._repos.CartRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  mapRepositoryCartTypeToApplicationCartDTO = (
    cart: Entities.CartType,
    inInventory?: string | undefined,
  ): DTO.ICartDTO => {
    const isValidInventoryQuantity: DTO.IProductQuantityValidatorDTO = { data: true, error: [] };
    return {
      ...cart,
      addresses: cart.addresses?.map(address => ({
        ...address,
        ...Object(Utils.addressFormatter('extract', address.line1 ?? '')),
      })),
      payments: cart.payments?.map(payment => ({
        ...payment,
        billingAddress: {
          ...payment.billingAddress,
          ...Object(Utils.addressFormatter('extract', payment.billingAddress?.line1 ?? '')),
        },
      })),
      shipments: cart.shipments?.map(shipment => ({
        ...shipment,
        deliveryAddress: {
          ...shipment.deliveryAddress,
          ...Object(Utils.addressFormatter('extract', shipment.deliveryAddress?.line1 ?? '')),
        },
      })),
      items: cart.items?.map(item => {
        const updatedItem = {
          ...item,
          product: item?.product ? { ...Mapper.mapEntitiesProductToProductDTO(item.product, inInventory) } : undefined,
        };
        if (
          updatedItem?.quantity &&
          updatedItem?.product &&
          updatedItem?.product?.inventoryAvailableQuantity < updatedItem.quantity
        ) {
          isValidInventoryQuantity.error.push({
            id: item.product?.id,
            name: item.name,
            availableQuantity: updatedItem.product?.inventoryAvailableQuantity,
          });
        }
        return updatedItem;
      }),
      isValidInventoryQuantity: { ...isValidInventoryQuantity, data: isValidInventoryQuantity.error.length <= 0 },
    } as DTO.ICartDTO;
  };

  async getOrCreateCart(
    type: 'short' | 'full' = 'short',
    inInventory?: string | undefined,
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.ICartDTO>('CartServices.getOrCreateCart');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getOrCreateCart(type, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.getOrCreateCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  async getOrCreateGroupedProductsCart(
    inInventory?: string | undefined,
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.IGroupedProductsCartDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.IGroupedProductsCartDTO>(
      'CartServices.getOrCreateGroupedProductsCart',
    );
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getOrCreateCart('withProductIDs', cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.getOrCreateGroupedProductsCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IGroupedProductsCartDTO>;
      } else {
        const isValidInventoryQuantity: DTO.IProductQuantityValidatorDTO = { data: true, error: [] };
        const cartLineItems = result.data.items;
        const newCartObj = { ...result.data, products: undefined };

        if (cartLineItems && cartLineItems.length > 0) {
          const filterProductList = [
            ...new Set(cartLineItems?.map(x => x.product?.masterVariation?.id ?? x.productId ?? '').filter(x => !!x)),
          ];
          return this._productServices
            .getProducts(
              undefined,
              undefined,
              {},
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              filterProductList,
              undefined,
              inInventory,
            )
            .then(productsList => {
              if (productsList.error) {
                return {
                  error: {
                    code: 'CartServices.getOrCreateGroupedProductsCart',
                    message: productsList.error?.message,
                    trace: [productsList.error],
                  },
                } as Contracts.Result<DTO.IGroupedProductsCartDTO>;
              } else {
                const cartProducts: Array<DTO.IProductLineItemsTypeDTO | undefined> = filterProductList
                  .map(fpl => {
                    const selectedFPL = productsList.data.items?.find(p => p.id === fpl);
                    if (selectedFPL) {
                      const selectedFPLVariations = [...(selectedFPL?.variations ?? [])];
                      delete selectedFPL['variations'];
                      const selectedFPLLineItem = cartLineItems.find(li => li.productId === selectedFPL.id);
                      if (
                        selectedFPLLineItem &&
                        selectedFPLLineItem?.quantity &&
                        selectedFPL.inventoryAvailableQuantity < selectedFPLLineItem.quantity
                      ) {
                        isValidInventoryQuantity.error.push({
                          id: selectedFPL.id,
                          name: selectedFPL.name,
                          availableQuantity: selectedFPL.inventoryAvailableQuantity,
                        });
                      }
                      const variations: Array<DTO.IProductLineItemTypeDTO> = [
                        {
                          ...selectedFPL,
                          lineItemId: selectedFPLLineItem?.id,
                          quantity: selectedFPLLineItem?.quantity ?? 0,
                        },
                      ];
                      if (selectedFPLVariations && selectedFPLVariations.length > 0) {
                        selectedFPLVariations.map(v => {
                          const selectedVariationLineItem = cartLineItems.find(li => li.productId === v.id);
                          if (
                            selectedVariationLineItem &&
                            selectedVariationLineItem?.quantity &&
                            v.inventoryAvailableQuantity < selectedVariationLineItem.quantity
                          ) {
                            isValidInventoryQuantity.error.push({
                              id: v.id,
                              name: v.name,
                              availableQuantity: v.inventoryAvailableQuantity,
                            });
                          }
                          variations.push({
                            ...v,
                            id: v.id ?? '',
                            name: v.name ?? '',
                            inWishlist: false,
                            code: v.code ?? '',
                            imgSrc: v.images?.at(0)?.url,
                            lineItemId: selectedVariationLineItem?.id,
                            quantity: selectedVariationLineItem?.quantity ?? 0,
                          });
                        });
                      }
                      return {
                        variations,
                      };
                    } else return undefined;
                  })
                  .filter(x => !!x);
                return {
                  data: {
                    ...newCartObj,
                    products: cartProducts,
                    isValidInventoryQuantity: {
                      ...isValidInventoryQuantity,
                      data: isValidInventoryQuantity.error.length <= 0,
                    },
                  },
                } as Contracts.Result<DTO.IGroupedProductsCartDTO>;
              }
            });
        } else return { data: newCartObj } as Contracts.Result<DTO.IGroupedProductsCartDTO>;
      }
    });
  }

  clearCart(
    cartId: string,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context.clearCart(type, cartId, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.clearCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  removeCart(cartId: string): Promise<Contracts.Result<boolean>> {
    return this._context.removeCart(cartId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.removeCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  addItemToCart(
    productId: string,
    quantity: number,
    cartId: string,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
    comment?: string | undefined,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context
      .addItemToCart(type, productId, quantity, cartId, cartName, this.cartType, undefined, comment)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartServices.addItemToCart',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.ICartDTO>;
        } else {
          const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
          return { data } as Contracts.Result<DTO.ICartDTO>;
        }
      });
  }

  changeCartItemQuantity(
    lineItemId: string,
    quantity: number,
    cartId: string,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context
      .changeCartItemQuantity(type, lineItemId, quantity, cartId, cartName, this.cartType)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'CartServices.changeCartItemQuantity',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.ICartDTO>;
        } else {
          const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
          return { data } as Contracts.Result<DTO.ICartDTO>;
        }
      });
  }

  addOrUpdateCartShipment(
    cartId: string,
    shipment: Models.InputShipmentType,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _address = { ...shipment.deliveryAddress };
    Utils.removeKeysDeep(_address, ['formattedAddress', 'address', 'building', 'floor', 'flat', '__typename']);
    const _repoShipment = {
      ...shipment,
      deliveryAddress: {
        ..._address,
        line1: Utils.addressFormatter('format', {
          building: shipment.deliveryAddress?.building ?? '',
          floor: shipment.deliveryAddress?.floor ?? '',
          flat: shipment.deliveryAddress?.flat ?? '',
          address: shipment.deliveryAddress?.address ?? '',
        }),
      },
    };
    return this._context.addOrUpdateCartShipment(type, cartId, _repoShipment, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.addOrUpdateCartShipment',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  addOrUpdateCartPayment(
    cartId: string,
    payment: Models.InputPaymentType,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _address = { ...payment.billingAddress };
    Utils.removeKeysDeep(_address, ['formattedAddress', 'address', 'building', 'floor', 'flat', '__typename']);
    const _repoPayment = {
      ...payment,
      billingAddress: {
        ..._address,
        line1: Utils.addressFormatter('format', {
          building: payment.billingAddress?.building ?? '',
          floor: payment.billingAddress?.floor ?? '',
          flat: payment.billingAddress?.flat ?? '',
          address: payment.billingAddress?.address ?? '',
        }),
      },
    };
    return this._context.addOrUpdateCartPayment(type, cartId, _repoPayment, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.addOrUpdateCartPayment',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  removeCartItem(
    lineItemId: string,
    cartId: string,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    return this._context.removeCartItem(type, lineItemId, cartId, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.removeCartItem',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  async mergeCart(
    cartId: string,
    secondCartId: string,
    inInventory?: string | undefined,
    type: 'short' | 'full' = 'short',
    cartName: string = this.defaultCartName,
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.ICartDTO>('CartServices.mergeCart');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;
    return this._context.mergeCart(type, cartId, secondCartId, cartName, this.cartType).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.mergeCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICartDTO>;
      } else {
        const data = this.mapRepositoryCartTypeToApplicationCartDTO(result.data, inInventory);
        return { data } as Contracts.Result<DTO.ICartDTO>;
      }
    });
  }

  createOrderFromCart(cartId: string): Promise<Contracts.Result<DTO.IInvoiceDTO>> {
    return this._context.createOrderFromCart(cartId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'CartServices.createOrderFromCart',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IInvoiceDTO>;
      } else {
        const data: DTO.IInvoiceDTO = {
          id: result.data.id,
          createdDate: result.data.createdDate,
          shipments: result.data.shipments?.map(shipment => ({
            ...shipment,
            deliveryAddress: {
              ...shipment.deliveryAddress,
              ...Object(Utils.addressFormatter('extract', shipment.deliveryAddress?.line1 ?? '')),
            },
            ...Object(Utils.removeKeysDeep(shipment, ['discounts'])),
          })),
          items: result.data.items.map(item => ({
            ...item,
            ...Object(Utils.removeKeysDeep(item, ['discounts'])),
            product: item?.product ? { ...Mapper.mapEntitiesProductToProductDTO(item.product) } : undefined,
          })),
          number: result.data.number,
          subTotal: result.data.subTotal,
          total: result.data.total,
          discountTotalWithTax: result.data.discountTotalWithTax,
          shippingTotal: result.data.shippingTotal,
          taxTotal: result.data.taxTotal,
          inPayments: result.data.inPayments,
        };
        return { data } as Contracts.Result<DTO.IInvoiceDTO>;
      }
    });
  }

  mergeCartItemsByProductSKUs(
    cartId: string,
    items: Array<{ lineItemId: string; productName: string; productSku: string; quantity: number }>,
    originalItems: Array<{ lineItemId: string; productName: string; productSku: string; quantity: number }>,
    type: 'short' | 'full' = 'short',
  ): Promise<Contracts.Result<DTO.ICartDTO>> {
    type Item = { lineItemId: string; productName: string; productSku: string; quantity: number };

    if (!cartId || !items?.length)
      return Promise.resolve<Contracts.Result<DTO.ICartDTO>>({
        error: {
          code: 'CartServices.mergeCartItemsByProductSKUs',
          message: 'Items and Cart Id are required to start the merge.',
        },
      } as Contracts.Result<DTO.ICartDTO>);
    else {
      const groupedItems = items.reduce((acc: { [key: string]: Item }, curr: Item) => {
        const key = curr.productSku;
        if (!acc[key]) {
          acc[key] = { ...curr, quantity: 0 };
        }
        acc[key].quantity += curr.quantity;

        return acc;
      }, {});

      const groupedArray = Object.values(groupedItems);

      const changedItems = groupedArray.filter(groupedItem => {
        const originalItem = originalItems.find(item => item.lineItemId === groupedItem.lineItemId);
        return (
          originalItem &&
          (originalItem.quantity !== groupedItem.quantity || originalItem.productSku !== groupedItem.productSku)
        );
      });
      const omittedItems = originalItems.filter(
        item => !groupedArray.some(groupedItem => groupedItem.lineItemId === item.lineItemId),
      );

      if (changedItems && changedItems.length > 0) {
        return this._context
          .removeCartItems(
            type,
            cartId,
            [...changedItems.map(x => x.lineItemId), ...omittedItems.map(x => x.lineItemId)],
            this.defaultCartName,
            this.cartType,
          )
          .then(removeStatus => {
            if (removeStatus.error) {
              return {
                error: {
                  code: 'CartServices.mergeCartItemsByProductSKUs',
                  message: 'Removing items failed in the process.',
                },
              } as Contracts.Result<DTO.ICartDTO>;
            } else {
              return this._context
                .addBulkItemsCart(
                  type,
                  cartId,
                  changedItems.map(x => ({ productSku: x.productSku, quantity: x.quantity })),
                  this.defaultCartName,
                  this.cartType,
                )
                .then(addItemsStatus => {
                  if (addItemsStatus.error) {
                    return {
                      error: {
                        code: 'CartServices.mergeCartItemsByProductSKUs',
                        message: 'Adding items failed in the process.',
                      },
                    } as Contracts.Result<DTO.ICartDTO>;
                  } else if (addItemsStatus.data.errors && addItemsStatus.data.errors.length > 0) {
                    return {
                      error: {
                        code: 'CartServices.mergeCartItemsByProductSKUs',
                        message: 'Some items failed through adding process.',
                        exception: addItemsStatus.data.errors,
                      },
                    } as Contracts.Result<DTO.ICartDTO>;
                  } else return { data: addItemsStatus.data.cart } as Contracts.Result<DTO.ICartDTO>;
                });
            }
          });
      } else
        return Promise.resolve<Contracts.Result<DTO.ICartDTO>>({
          error: {
            code: 'CartServices.createOrderFromCart',
            message: 'Nothing changed',
          },
        } as Contracts.Result<DTO.ICartDTO>);
    }
  }
}
