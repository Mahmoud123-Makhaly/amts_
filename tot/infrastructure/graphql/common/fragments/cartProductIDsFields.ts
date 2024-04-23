import { MONEY_FIELDS } from './moneyFields';
import { CURRENCY_FIELDS } from './currencyFields';
import { VALIDATION_ERROR_FIELDS } from './validationErrorFields';
import gql from 'graphql-tag';

export const CART_PRODUCT_IDs_FIELDS = gql`
  ${MONEY_FIELDS}
  ${CURRENCY_FIELDS}
  fragment withProductIDs on CartType {
    id
    itemsQuantity
    comment
    items {
      id
      productId
      quantity
      product {
        id
        masterVariation {
          id
        }
      }
    }
    coupons {
      code
      isAppliedSuccessfully
    }
    currency {
      ...currencyFields
    }
    total {
      ...moneyFields
    }
    discountTotal {
      ...moneyFields
    }
    subTotal {
      ...moneyFields
    }
    shippingTotal {
      ...moneyFields
    }
    taxTotal {
      ...moneyFields
    }
  }
`;
