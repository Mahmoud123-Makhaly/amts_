import gql from 'graphql-tag';

import { PROPERTY_FIELDS } from './propertyFields';
import { MONEY_FIELDS } from './moneyFields';
import { AVAILABILITY_DATA_FIELDS } from './availabilityDataFields';

export const LINE_ITEM_FIELDS = gql`
  ${PROPERTY_FIELDS}
  ${MONEY_FIELDS}
  ${AVAILABILITY_DATA_FIELDS}
  fragment lineItemFields on LineItemType {
    inStockQuantity
    warehouseLocation
    isValid
    catalogId
    categoryId
    createdDate
    height
    id
    imageUrl
    isGift
    isReadOnly
    isReccuring
    languageCode
    length
    measureUnit
    name
    note
    objectType
    productId
    productType
    quantity
    requiredShipping
    shipmentMethodCode
    sku
    taxPercentRate
    taxType
    thumbnailImageUrl
    volumetricWeight
    weight
    weightUnit
    width
    fulfillmentCenterId
    fulfillmentCenterName
    product {
      id
      name
      code
      slug
      outline
      hasVariations
      minQuantity
      maxQuantity
      imgSrc
      inWishlist
      productType
      images {
        url
      }
      description {
        content
      }
      price {
        pricelistId
        discounts {
          coupon
          promotionId
          description
          amount
          amountWithTax
          promotion {
            id
            name
            description
            type
          }
        }
        listWithTax {
          amount
          formattedAmount
          formattedAmountWithoutCurrency
        }
        actual {
          amount
          formattedAmount
        }
        discountAmount {
          amount
          formattedAmount
        }
        sale {
          amount
          formattedAmount
        }
        list {
          amount
          formattedAmount
        }
        discountPercent
      }
      masterVariation {
        id
        name
        code
        productType
        minQuantity
        maxQuantity
        slug
        images {
          url
          name
        }
        price {
          list {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          listWithTax {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          sale {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          saleWithTax {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          actual {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          discounts {
            coupon
            description
            promotionId
            amount
            amountWithTax
            promotion {
              id
              name
              description
              type
            }
          }
          minQuantity
        }
        availabilityData {
          ...availabilityDataFields
        }
        vendor {
          id
          name
          rating {
            value
            reviewCount
          }
        }
      }
      variations {
        id
        name
        slug
        images {
          url
        }
        minQuantity
        maxQuantity
        code
        productType
        properties {
          ...propertyFields
        }
        vendor {
          id
          name
          rating {
            value
            reviewCount
          }
        }
        availabilityData {
          ...availabilityDataFields
        }
        price {
          pricelistId
          discounts {
            coupon
            promotionId
            description
            amount
            amountWithTax
            promotion {
              id
              name
              description
              type
            }
          }
          listWithTax {
            amount
            formattedAmount
            formattedAmountWithoutCurrency
          }
          actual {
            amount
            formattedAmount
          }
          discountAmount {
            amount
            formattedAmount
          }
          sale {
            amount
            formattedAmount
          }
          list {
            amount
            formattedAmount
          }
          discountPercent
        }
      }
      properties {
        ...propertyFields
      }
      availabilityData {
        ...availabilityDataFields
      }
    }
    vendor {
      id
      name
      rating {
        value
        reviewCount
      }
    }
    extendedPrice {
      ...moneyFields
    }
    placedPrice {
      ...moneyFields
    }
    listPrice {
      ...moneyFields
    }
    salePrice {
      ...moneyFields
    }
    discountTotal {
      ...moneyFields
    }
    validationErrors {
      errorCode
      errorMessage
      errorParameters {
        key
        value
      }
    }
  }
`;
