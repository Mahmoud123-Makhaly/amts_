import {MONEY_FIELDS} from "./moneyFields"
import {PROPERTY_FIELDS} from "./propertyFields"
import gql from 'graphql-tag'

export const ORDER_LINE_ITEM_FIELDS = gql`
  ${MONEY_FIELDS}
  ${PROPERTY_FIELDS}
  fragment orderLineItemFields on OrderLineItemType {
    id
    imageUrl
    isGift
    name
    productId
    productType
    product {
      id
      brandName
      slug
      masterVariation {
        id
        slug
      }
      properties {
        ...propertyFields
      }
    }
    quantity
    sku
    extendedPrice {
      ...moneyFields
    }
    placedPrice {
      ...moneyFields
    }
    taxTotal {
      ...moneyFields
    }
    discountTotal {
      ...moneyFields
    }
    outerId
    vendor {
      id
      name
      rating {
        value
        reviewCount
      }
    }
  }
`;
