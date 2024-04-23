import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const changeCartItemQuantityDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    mutation ChangeCartItemQuantity($command: InputChangeCartItemQuantityType!) {
      changeCartItemQuantity(command: $command) {
        ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
      }
    }
  `;
};
