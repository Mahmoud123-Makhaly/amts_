import { StateCreator } from 'zustand';

import type { AppAccountState } from './state';
import { initialValues } from './state';

export const appAccountSlice: StateCreator<AppAccountState> = (set, get) => ({
  appAccount: {
    ...initialValues.appAccount,
    setUser: action => set(state => ({ appAccount: { ...state.appAccount, user: action } })),
    setDefaultWishlistId: action => set(state => ({ appAccount: { ...state.appAccount, defaultWishlistId: action } })),
    setSelectedInventory: action => set(state => ({ appAccount: { ...state.appAccount, selectedInventory: action } })),
  },
});
