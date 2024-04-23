import gql from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { Fragments } from '../../common';

export const getOrderDetailsDocument = (type: 'short' | 'full'): DocumentNode => {
  return gql`
    ${type === 'short' ? Fragments.SHORT_ORDER_FIELDS : Fragments.FULL_ORDER_FIELDS}
    query Order($id:String,$number:String, $cultureName: String) {
      order(id:$id,number:$number, cultureName: $cultureName) {
        ...${type === 'short' ? 'shortOrderFields' : 'fullOrderFields'}
      }
    }
  `;
};
