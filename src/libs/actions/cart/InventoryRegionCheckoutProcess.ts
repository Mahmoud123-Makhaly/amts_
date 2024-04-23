import { Contracts, Models, DTO } from '@tot/core/types';
import { env } from '@libs';
import zones from '../../../../public/egypt.json';

const errorMessages = {
  CHECK_INV_ADDRESS_PROC_ERR_DEF: {
    en: 'Before proceeding, please make sure to enter a delivery address within the same region as the selected inventory.',
    ar: 'عذرًا! يرجى التأكد من إدخال عنوان التسليم ضمن نفس المنطقة المحددة للمخزون.',
  },
  CHECK_INV_ADDRESS_PROC_ERR_ADDRESS_REQUIRED: {
    ar: 'عذرًا! يرجى التأكد من إدخال عنوان التسليم قبل المتابعة.',
    en: 'Before proceeding, please make sure to enter the delivery address.',
  },
};

export const InventoryRegionCheckoutProcess: Models.ICheckoutProcess = {
  isValid: async (
    cart: DTO.ICartDTO,
    lang?: 'ar' | 'en',
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Contracts.Result<boolean>> => {
    const regions = Object(zones)[env.STORE_ID] ?? zones['tot'];
    try {
      if (!cart.shipments?.at(0)?.deliveryAddress) {
        return {
          error: {
            code: 'CheckoutService.InventoryRegionCheckoutProcess',
            message: errorMessages.CHECK_INV_ADDRESS_PROC_ERR_ADDRESS_REQUIRED[lang ?? 'en'],
          },
        } as Contracts.Result<boolean>;
      }
      //cart.shipments?.at(0)?.deliveryAddress?.regionId
      const _selectedInventory = selectedInventory?.name ?? selectedInventory?.id;

      const selectedRegion: {
        id: string;
        ar: string;
        en: string;
        districts?: Array<{ id: string; ar: string; en: string }>;
      } = regions.find(
        (r: { id: string; ar: string; en: string; districts?: Array<{ id: string; ar: string; en: string }> }) =>
          r.id === _selectedInventory || r.ar === _selectedInventory || r.en === _selectedInventory,
      );
      if (
        !selectedRegion ||
        !selectedRegion.districts?.some(city => city.id === cart.shipments?.at(0)?.deliveryAddress?.postalCode)
      ) {
        return {
          error: {
            code: 'CheckoutService.InventoryRegionCheckoutProcess',
            message: errorMessages.CHECK_INV_ADDRESS_PROC_ERR_DEF[lang ?? 'en'],
          },
        } as Contracts.Result<boolean>;
      }
    } catch (exc) {
      return {
        error: {
          code: 'CheckoutService.InventoryRegionCheckoutProcess',
          message: errorMessages.CHECK_INV_ADDRESS_PROC_ERR_DEF[lang ?? 'en'],
          exception: exc,
        },
      } as Contracts.Result<boolean>;
    }
    return { data: true } as Contracts.Result<boolean>;
  },
};
