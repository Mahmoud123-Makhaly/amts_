import { DTO } from '@tot/core/types';

export interface AppAccountState {
  appAccount: {
    user?: DTO.IUserDTO;
    defaultWishlistId?: string;
    selectedInventory?: DTO.IFulfillmentCenterDTO;
    setUser: (user: DTO.IUserDTO) => void;
    setDefaultWishlistId: (id: string) => void;
    setSelectedInventory: (inventory: DTO.IFulfillmentCenterDTO) => void;
  };
}

export const initialValues: AppAccountState = {
  appAccount: {
    user: undefined,
    defaultWishlistId: undefined,
    selectedInventory: undefined,
    setUser: (user: DTO.IUserDTO) => {},
    setDefaultWishlistId: (id: string) => {},
    setSelectedInventory: (inventory: DTO.IFulfillmentCenterDTO) => {},
  },
};
