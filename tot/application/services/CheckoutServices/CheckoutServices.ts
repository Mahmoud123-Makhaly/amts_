import { Utils } from '../../common';
import { Contracts, Models, DTO } from '../../types';
import { Entities } from '../../../domain';
import { ErrorService } from '..';
import { AvailabilityCheckoutProcess, InInventoryCheckoutProcess, StructureCheckoutProcess } from './processes';
import { Mapper } from '../../mapper';

export class CheckoutService extends Contracts.ICheckoutService {
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

  private getErrorMessage = (code: string) => ErrorService.get(code);

  private getProcesses = (
    checks?: Models.ICheckoutProcess | Array<Models.ICheckoutProcess>,
  ): Array<Models.ICheckoutProcess> => {
    const externalChecks = checks ? (Array.isArray(checks) ? checks : [checks]) : [];
    const processes = [StructureCheckoutProcess, AvailabilityCheckoutProcess, ...externalChecks];

    if (this._configurations.checkoutProcesses?.some(x => x === 'InventoryStock'))
      processes.push(InInventoryCheckoutProcess);

    return processes;
  };

  private mapRepositoryCartTypeToApplicationCartDTO = (
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

  checkout(
    checks?: Models.ICheckoutProcess | Array<Models.ICheckoutProcess>,
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> {
    return this._context
      .getOrCreateCart('full', this.defaultCartName, this.cartType)
      .then<Contracts.Result<boolean>, Contracts.Result<boolean>>(
        cart => {
          if (!cart.data) {
            return {
              error: {
                code: 'CheckoutService.checkout',
                message: this.getErrorMessage('CHECK_CART_LOAD_ERR'),
                trace: [cart.error],
              },
            } as Contracts.Result<boolean>;
          }
          const _cart = this.mapRepositoryCartTypeToApplicationCartDTO(
            cart.data,
            selectedInventory?.id ?? selectedInventory?.name,
          );
          if (this._configurations.checkoutProcessMode === 'IfAny') {
            return this.all(_cart, this.getProcesses(checks), selectedInventory);
          } else return this.allSettled(_cart, this.getProcesses(checks), selectedInventory);
        },
        error => {
          return {
            error: {
              code: 'CheckoutService.checkout',
              message: this.getErrorMessage('CHECK_VALIDATION_ERR_DEFAULT'),
              trace: [error],
            },
          } as Contracts.Result<boolean>;
        },
      )
      .catch(exc => {
        return {
          error: {
            code: 'CheckoutService.checkout',
            message: this.getErrorMessage('CHECK_VALIDATION_ERR_DEFAULT'),
            trace: [exc],
          },
        } as Contracts.Result<boolean>;
      });
  }

  private allSettled(
    cart: DTO.ICartDTO,
    promises: Array<Models.ICheckoutProcess>,
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> {
    return Promise.allSettled<Contracts.Result<boolean>>(
      promises.map(x =>
        x.isValid(
          cart,
          this._configurations.defaultCultureName === Models.CultureNames.EG ? 'ar' : 'en',
          selectedInventory,
        ),
      ),
    )
      .then(
        results => {
          const errors = results.filter(
            process => process.status === 'rejected' || (process.status === 'fulfilled' && process.value.error),
          );

          if (!errors || errors.length <= 0) return { data: true } as Contracts.Result<boolean>;
          else {
            return {
              error: {
                code: 'CheckoutService.checkout',
                message: errors
                  .map(
                    (error: any) => error['value'].error.message.toString() ?? error['reason'].error.message.toString(),
                  )
                  .join(';'),
              },
            } as Contracts.Result<boolean>;
          }
        },
        error => {
          return {
            error: {
              code: 'CheckoutService.checkout',
              message: this.getErrorMessage('CHECK_VALIDATION_ERR_DEFAULT'),
              trace: [error],
            },
          } as Contracts.Result<boolean>;
        },
      )
      .catch(exc => {
        return {
          error: {
            code: 'CheckoutService.checkout',
            message: this.getErrorMessage('CHECK_VALIDATION_ERR_DEFAULT'),
            trace: [exc],
          },
        } as Contracts.Result<boolean>;
      });
  }

  private all(
    _cart: DTO.ICartDTO,
    _promises: Array<Models.ICheckoutProcess>,
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> {
    return new Promise(r => r({ data: false } as Contracts.Result<boolean>));
  }
}
