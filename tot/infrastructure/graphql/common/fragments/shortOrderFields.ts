import {MONEY_FIELDS} from "./moneyFields"
import {ORDER_LINE_ITEM_FIELDS} from "./orderLineItemFields"
import gql from 'graphql-tag'

export const SHORT_ORDER_FIELDS = gql`
  ${MONEY_FIELDS}
  ${ORDER_LINE_ITEM_FIELDS}
  fragment shortOrderFields on CustomerOrderType {
    id
    number
    createdDate
    status
    items {
      ...orderLineItemFields
    }
    discounts {
      amount {
        amount
        formattedAmount
        currency {
          code
        }
      }
      coupon
      description
      promotionId
    }
    discountTotal {
      ...moneyFields
    }
    shippingTotal {
      ...moneyFields
    }
    taxTotal {
      ...moneyFields
    }
    subTotal {
      ...moneyFields
    }
    total {
      ...moneyFields
    }
  }
`;
