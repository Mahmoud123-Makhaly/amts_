import { Fragments } from '../../common';
import gql from 'graphql-tag';

const SEARCH_PRODUCTS = gql`
  ${Fragments.PROPERTY_FIELDS}
  ${Fragments.AVAILABILITY_DATA_FIELDS}
  query SearchProducts(
    $storeId: String!
    $userId: String
    $currencyCode: String
    $cultureName: String
    $filter: String
    $after: String
    $first: Int
    $sort: String
    $query: String
    $fuzzy: Boolean
    $fuzzyLevel: Int
    $productIds: [String]
    $withFacets: Boolean!
    $withImages: Boolean!
  ) {
    products(
      storeId: $storeId
      userId: $userId
      after: $after
      first: $first
      filter: $filter
      sort: $sort
      currencyCode: $currencyCode
      cultureName: $cultureName
      query: $query
      fuzzy: $fuzzy
      fuzzyLevel: $fuzzyLevel
      productIds: $productIds
    ) {
      totalCount
      items {
        name
        id
        code
        catalogId
        category {
          id
        }
        minQuantity
        maxQuantity
        inWishlist
        productType
        vendor {
          id
          name
          rating {
            value
            reviewCount
          }
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
          minQuantity
          maxQuantity
          productType
          slug
          images @include(if: $withImages) {
            url
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
          properties {
            ...propertyFields
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
              formattedAmountWithoutCurrency
              currency {
                symbol
              }
            }
            discountPercent
            actual {
              amount
              formattedAmount
              formattedAmountWithoutCurrency
              currency {
                symbol
              }
            }
          }
        }
        hasVariations
        slug
        outline
        imgSrc
        images @include(if: $withImages) {
          url
        }
        description(type: "QuickReview") {
          content
          id
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
            formattedAmountWithoutCurrency
            currency {
              symbol
            }
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
            formattedAmountWithoutCurrency
            currency {
              symbol
            }
          }
          discountPercent
        }
        properties {
          ...propertyFields
        }
      }
      term_facets @include(if: $withFacets) {
        name
        label
        terms {
          label
          term
          count
          isSelected
        }
      }
      range_facets @include(if: $withFacets) {
        name
        label
        ranges {
          label
          count
          from
          to
          includeFrom
          includeTo
          isSelected
        }
      }
    }
  }
`;

export default SEARCH_PRODUCTS;
