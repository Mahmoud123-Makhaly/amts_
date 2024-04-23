import gql from 'graphql-tag';

import { AVAILABILITY_DATA_FIELDS } from './availabilityDataFields';

export const SHORT_CART_FIELDS = gql`
  ${AVAILABILITY_DATA_FIELDS}
  fragment shortCartFields on CartType {
    id
    itemsCount
    status
    purchaseOrderNumber
    total {
      formattedAmount
    }
    subTotal {
      formattedAmount
    }
    items {
      id
      imageUrl
      quantity
      extendedPrice {
        formattedAmount
      }
      placedPrice {
        formattedAmount
      }
      product {
        id
        name
        slug
        availabilityData {
          ...availabilityDataFields
        }
      }
    }
  }
`;
