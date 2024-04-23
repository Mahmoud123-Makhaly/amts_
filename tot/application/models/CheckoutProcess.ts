import { Contracts, DTO } from '../types';

export interface ICheckoutProcess {
  isValid: (
    cart: DTO.ICartDTO,
    lang?: 'ar' | 'en',
    selectedInventory?: { id?: string; name?: string },
  ) => Promise<Contracts.Result<boolean>>;
}
