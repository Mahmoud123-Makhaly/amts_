import gql from 'graphql-tag';

import { Fragments } from '../../common';

const SEARCH_ASSOCIATED_PRODUCTS = gql`
  ${Fragments.PROPERTY_FIELDS}
  ${Fragments.AVAILABILITY_DATA_FIELDS}
  query SearchRelatedProducts(
    $storeId: String!
    $currencyCode: String!
    $cultureName: String
    $id: String!
    $after: String
    $first: Int
    $group: String
    $query: String
  ) {
    product(storeId: $storeId, id: $id, currencyCode: $currencyCode, cultureName: $cultureName) {
      name
      id
      code
      slug
      imgSrc
      outline
      brandName
      description {
        content
      }
      availabilityData {
        ...availabilityDataFields
      }
      properties {
        ...propertyFields
      }
      associations(after: $after, first: $first, group: $group, query: $query) {
        items {
          product {
            name
            id
            code
            slug
            imgSrc
            vendor {
              id
              name
            }
            availabilityData {
              ...availabilityDataFields
            }
            price {
              actual {
                amount
                formattedAmount
              }
              list {
                amount
                formattedAmount
              }
              sale {
                amount
                formattedAmount
              }
              discountAmount {
                amount
                formattedAmount
              }
            }
            availabilityData {
              ...availabilityDataFields
            }
            properties {
              ...propertyFields
            }
            seoInfo {
              pageTitle
              metaKeywords
              metaDescription
              semanticUrl
            }
          }
        }
      }
    }
  }
`;

export default SEARCH_ASSOCIATED_PRODUCTS;
