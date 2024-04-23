import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const mergeCartDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : Fragments.FULL_CART_FIELDS}
    mutation MergeCart($command: InputMergeCartType!) {
      mergeCart(command: $command) {
        ...${type === 'short' ? 'shortCartFields' : 'fullCartFields'}
      }
    }
  `;
};
