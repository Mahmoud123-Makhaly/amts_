import { StateCreator } from 'zustand';

import type { CartState } from './state';
import { initialValues } from './state';

export const cartSlice: StateCreator<CartState> = (set, get) => ({
  cart: {
    ...initialValues.cart,
    changeDefaultCart: action => set(state => ({ cart: { ...state.cart, default: action, isLoaded: true } })),
    reload: () => set(state => ({ cart: { ...state.cart, isLoaded: false } })),
  },
});
