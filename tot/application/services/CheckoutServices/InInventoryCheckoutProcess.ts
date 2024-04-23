import { Contracts, Models, DTO } from '../../types';
import { ErrorService } from '..';

export const InInventoryCheckoutProcess: Models.ICheckoutProcess = {
  isValid: async (
    cart: DTO.ICartDTO,
    lang?: 'ar' | 'en',
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> => {
    try {
      const items = [...(cart.items ?? [])];
      let _outOfStockLineItems: Array<DTO.ILineItemTypeDTO> = [];
      if (
        (cart.shipments?.length ?? 0) > 0 &&
        cart.shipments?.at(0)?.fulfillmentCenterId &&
        items.some(lineItem => {
          const _inventory = lineItem.product?.availabilityData?.inventories?.find(
            inv => inv.fulfillmentCenterId === cart.shipments?.at(0)?.fulfillmentCenterId,
          );
          const status = (lineItem.quantity ?? 0) > (_inventory?.inStockQuantity ?? 0);
          if (status) _outOfStockLineItems.push(lineItem);
          return status;
        })
      ) {
        return {
          error: {
            code: 'CheckoutService.InInventoryCheckoutProcess',
            message: ErrorService.get(
              'CHECK_INV_STOCK_PROC_ERR_OUT_OF_STOCK',
              {
                products: _outOfStockLineItems.map(item => item.name ?? '').join(','),
              },
              lang,
            ),
          },
        } as Contracts.Result<boolean>;
      }
      _outOfStockLineItems = [];
      if (
        selectedInventory &&
        (selectedInventory.id || selectedInventory.name) &&
        items.some(lineItem => {
          const _inventory = lineItem.product?.availabilityData?.inventories?.find(
            inv =>
              inv.fulfillmentCenterId === selectedInventory.id || inv.fulfillmentCenterName === selectedInventory.name,
          );
          const status =
            !_inventory ||
            (_inventory.inStockQuantity ?? 0) <= 0 ||
            (lineItem.quantity ?? 0) > _inventory.inStockQuantity;
          if (status) _outOfStockLineItems.push(lineItem);
          return status;
        })
      ) {
        return {
          error: {
            code: 'CheckoutService.InInventoryCheckoutProcess',
            message: ErrorService.get(
              'CHECK_INV_STOCK_PROC_ERR_OUT_OF_STOCK',
              {
                products: _outOfStockLineItems.map(item => item.name ?? '').join(','),
              },
              lang,
            ),
          },
        } as Contracts.Result<boolean>;
      }
    } catch (exc) {
      return {
        error: {
          code: 'CheckoutService.InInventoryCheckoutProcess',
          message: ErrorService.get('CHECK_INV_STOCK_PROC_ERR_DEFAULT', undefined, lang),
          exception: exc,
        },
      } as Contracts.Result<boolean>;
    }
    return { data: true } as Contracts.Result<boolean>;
  },
};
