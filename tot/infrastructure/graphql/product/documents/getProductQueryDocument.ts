import { Fragments } from '../../common';
import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  ${Fragments.PROPERTY_FIELDS}
  ${Fragments.AVAILABILITY_DATA_FIELDS}
  query GetProduct($storeId: String!, $userId: String!, $currencyCode: String!, $cultureName: String, $id: String!) {
    product(storeId: $storeId, userId: $userId, id: $id, currencyCode: $currencyCode, cultureName: $cultureName) {
      name
      id
      code
      slug
      catalogId
      category {
        id
        imgSrc
        code
        name
        level
        priority
        outline
        slug
        path
        hasParent
        seoInfo {
          id
          name
          semanticUrl
          pageTitle
          metaDescription
          imageAltDescription
          metaKeywords
          isActive
          languageCode
        }
        description {
          id
          descriptionType
          content
          languageCode
        }
        images {
          id
          name
          group
          url
          relativeUrl
          sortOrder
          cultureName
        }
        outlines {
          items {
            id
            name
            seoObjectType
          }
        }
        parent {
          id
          imgSrc
          code
          name
          level
          priority
          outline
          slug
          path
          hasParent
        }
      }
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
      assets {
        name
        url
      }
      breadcrumbs {
        itemId
        typeName
        title
        seoPath
      }
      description {
        content
      }
      properties {
        ...propertyFields
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
      seoInfo {
        pageTitle
        metaKeywords
        metaDescription
        semanticUrl
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
      assets {
        id
        name
        mimeType
        size
        url
        relativeUrl
        typeId
        group
        cultureName
      }
    }
  }
`;

export default GET_PRODUCT;
