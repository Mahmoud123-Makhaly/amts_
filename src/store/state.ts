import type { LayoutState } from './layout';
import { initialValues as LayoutInitialValues } from './layout';
import type { AppAccountState } from './app-user';
import { initialValues as AccountInitialValues } from './app-user';
import type { CartState } from './cart';
import { initialValues as CartInitialValues } from './cart';

export type StoreStates = LayoutState & AppAccountState & CartState;
export const StoreInitialValues = { ...LayoutInitialValues, ...AccountInitialValues, ...CartInitialValues };
