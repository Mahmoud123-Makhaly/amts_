import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const addBulkItemsCartDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    mutation AddBulkItemsCart($command: InputAddBulkItemsType!) {
      addBulkItemsCart(command: $command) {
        cart {
          ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
        }
        errors {
            errorCode
            errorMessage
            objectId
            objectType
            errorParameters {
                key
                value
            }
        }
      }
    }
  `;
};
