import { Contracts, Models, DTO } from '../../types';
import { ErrorService } from '..';

export const StructureCheckoutProcess: Models.ICheckoutProcess = {
  isValid: async (
    cart: DTO.ICartDTO,
    lang?: 'ar' | 'en',
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> => {
    try {
      if (!cart.items || (cart.items?.length ?? 0) <= 0) {
        return {
          error: {
            code: 'CheckoutService.StructureCheckoutProcess',
            message: ErrorService.get('CHECK_STRUCT_PROC_ERR_ITEMS_REQUIRED', undefined, lang),
          },
        } as Contracts.Result<boolean>;
      }
      if (!cart.total || (cart.total?.amount ?? 0) <= 0) {
        return {
          error: {
            code: 'CheckoutService.StructureCheckoutProcess',
            message: ErrorService.get('CHECK_STRUCT_PROC_ERR_TOTAL_AMOUNT_INVALID', undefined, lang),
          },
        } as Contracts.Result<boolean>;
      }
      if (!cart.shipments || (cart.shipments?.length ?? 0) <= 0) {
        return {
          error: {
            code: 'CheckoutService.StructureCheckoutProcess',
            message: ErrorService.get('CHECK_STRUCT_PROC_ERR_SHIPMENT', undefined, lang),
          },
        } as Contracts.Result<boolean>;
      }
      if (!cart.payments || (cart.payments?.length ?? 0) <= 0) {
        return {
          error: {
            code: 'CheckoutService.StructureCheckoutProcess',
            message: ErrorService.get('CHECK_STRUCT_PROC_ERR_PAYMENT', undefined, lang),
          },
        } as Contracts.Result<boolean>;
      }
    } catch (exc) {
      return {
        error: {
          code: 'CheckoutService.StructureCheckoutProcess',
          message: ErrorService.get('CHECK_STRUCT_PROC_ERR_DEFAULT', undefined, lang),
          exception: exc,
        },
      } as Contracts.Result<boolean>;
    }
    return { data: true } as Contracts.Result<boolean>;
  },
};
