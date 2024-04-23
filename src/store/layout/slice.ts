import { StateCreator } from 'zustand';

import type { LayoutState } from './state';
import { initialValues } from './state';

export const layoutSlice: StateCreator<LayoutState> = (set, get) => ({
  layout: {
    ...initialValues.layout,
    changePreloader: action => set(state => ({ layout: { ...state.layout, preloader: action } })),
  },
});
