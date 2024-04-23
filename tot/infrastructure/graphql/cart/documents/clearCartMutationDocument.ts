import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const clearCartDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    mutation ClearCart($command: InputClearCartType!) {
      clearCart(command: $command) {
        ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
      }
    }
  `;
};
