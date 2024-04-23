import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const getOrCreateCartDocument = (type: 'short' | 'full' | 'withProductIDs'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_CART_FIELDS : type === 'withProductIDs' ? Fragments.CART_PRODUCT_IDs_FIELDS : Fragments.FULL_CART_FIELDS}
    query Cart($storeId: String!, $userId: String!, $currencyCode: String!, $cultureName: String, $cartName: String, $cartType: String) {
      cart(storeId: $storeId, userId: $userId, currencyCode: $currencyCode, cultureName: $cultureName, cartName: $cartName, cartType: $cartType) {
        ...${type === 'short' ? 'shortCartFields' : type === 'withProductIDs' ? 'withProductIDs' : 'fullCartFields'}
      }
    }
  `;
};
