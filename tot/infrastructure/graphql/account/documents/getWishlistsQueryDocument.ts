import gql from 'graphql-tag';
import { AVAILABILITY_DATA_FIELDS, PROPERTY_FIELDS } from '../../common/fragments';

export const GET_WISHLISTS = gql`
  ${PROPERTY_FIELDS}
  ${AVAILABILITY_DATA_FIELDS}
  query GetWishlists(
    $storeId: String!
    $userId: String!
    $currencyCode: String!
    $cultureName: String
    $after: String
    $first: Int
    $sort: String
  ) {
    wishlists(
      storeId: $storeId
      userId: $userId
      currencyCode: $currencyCode
      cultureName: $cultureName
      first: $first
      after: $after
      sort: $sort
    ) {
      totalCount
      items {
        id
        name
        itemsCount
        currency {
          code
          symbol
          exchangeRate
          customFormatting
        }
        items {
          id
          name
          imageUrl
          sku
          productId
          quantity
          salePrice {
            amount
            formattedAmount
          }
          listPrice {
            amount
            formattedAmount
          }
          validationErrors {
            errorCode
            errorMessage
            objectId
            objectType
          }
          productType
          product {
            name
            id
            code
            slug
            outline
            minQuantity
            maxQuantity
            imgSrc
            hasVariations
            inWishlist
            images {
              url
            }
            vendor {
              id
              name
            }
            masterVariation {
              id
              name
              code
              productType
              minQuantity
              maxQuantity
              slug
            }
            variations {
              id
              name
              code
              productType
              minQuantity
              maxQuantity
              slug
            }
            availabilityData {
              ...availabilityDataFields
            }
            properties {
              ...propertyFields
            }
            price {
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
            }
          }
        }
      }
    }
  }
`;
