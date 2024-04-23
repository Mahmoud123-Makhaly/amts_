import gql from 'graphql-tag';
import { MONEY_FIELDS } from '../../common/fragments';

export const GET_ORDERS = gql`
  ${MONEY_FIELDS}
  query GetOrders($filter: String, $sort: String, $cultureName: String, $userId: String, $after: String, $first: Int) {
    orders(filter: $filter, sort: $sort, cultureName: $cultureName, userId: $userId, after: $after, first: $first) {
      totalCount
      items {
        id
        createdDate
        status
        currency {
          code
        }
        items {
          id
          imageUrl
          name
          status
          quantity
          placedPrice {
            ...moneyFields
          }
          product {
            slug
          }
        }
        total {
          ...moneyFields
        }
        inPayments {
          number
          gatewayCode
        }
        number
        customerId
        purchaseOrderNumber
      }
    }
  }
`;
