import {MONEY_FIELDS} from "./moneyFields"
import {PROPERTY_FIELDS} from "./propertyFields"
import gql from 'graphql-tag'

export const QUOTE_LINE_ITEM_FIELDS = gql`
  ${MONEY_FIELDS}
  ${PROPERTY_FIELDS}
  fragment quoteLineItemFields on QuoteItemType {
    id
    sku
    productId
    name
    imageUrl
    listPrice {
      ...moneyFields
    }
    selectedTierPrice {
      quantity
      price {
        ...moneyFields
      }
    }
    product {
      id
      slug
      brandName
      properties {
        ...propertyFields
      }
      availabilityData {
        availableQuantity
        isInStock
      }
    }
  }
`;
