import { Contracts, Models, DTO } from '../../types';
import { ErrorService } from '..';

export const AvailabilityCheckoutProcess: Models.ICheckoutProcess = {
  isValid: async (cart: DTO.ICartDTO, lang?: 'ar' | 'en'): Promise<Contracts.Result<boolean>> => {
    try {
      const items = [...(cart.items ?? [])];
      if (items.length <= 0)
        return {
          error: {
            code: 'CheckoutService.AvailabilityCheckoutProcess',
            message: ErrorService.get('CHECK_AVAIL_PROC_EMPTY_ITEMS', undefined, lang),
          },
        } as Contracts.Result<boolean>;
      if (
        items.some(
          lineItem =>
            !lineItem.quantity ||
            lineItem.quantity === 0 ||
            lineItem.quantity > (lineItem.product?.availabilityData?.availableQuantity ?? 0),
        )
      ) {
        return {
          error: {
            code: 'CheckoutService.AvailabilityCheckoutProcess',
            message: ErrorService.get(
              'CHECK_AVAIL_PROC_OUT_OF_STOCK',
              {
                products: items
                  .filter(
                    lineItem => (lineItem.quantity ?? 0) > (lineItem.product?.availabilityData?.availableQuantity ?? 0),
                  )
                  .map(item => item.name ?? '')
                  .join(','),
              },
              lang,
            ),
          },
        } as Contracts.Result<boolean>;
      }
    } catch (exc) {
      return {
        error: {
          code: 'CheckoutService.AvailabilityCheckoutProcess',
          message: ErrorService.get('CHECK_AVAIL_ERR_DEFAULT', undefined, lang),
          exception: exc,
        },
      } as Contracts.Result<boolean>;
    }
    return { data: true } as Contracts.Result<boolean>;
  },
};
