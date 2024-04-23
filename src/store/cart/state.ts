import { DTO } from '@tot/core/types';

export interface CartState {
  cart: {
    default?: DTO.ICartDTO;
    isLoaded: boolean;
    changeDefaultCart: (action: DTO.ICartDTO) => void;
    reload: () => void;
  };
}

export const initialValues: CartState = {
  cart: { isLoaded: false, changeDefaultCart: (action: DTO.ICartDTO) => {}, reload: () => {} },
};
