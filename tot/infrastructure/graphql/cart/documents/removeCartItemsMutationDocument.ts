import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const removeCartItemsDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    mutation RemoveCartItems($command: InputRemoveItemsType!) {
      removeCartItems(command: $command) {
        ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
      }
    }
  `;
};
