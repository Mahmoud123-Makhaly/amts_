import { gql } from 'graphql-tag';
import type { DocumentNode } from 'graphql';

import { getChildCategoriesTreeString } from './getChildCategoriesQueryDocuments';
export const getCategoryQueryDocument = (categoryId?: string, maxChildCategoriesLevel = 0): DocumentNode => {
  const childCategoriesFragment = getChildCategoriesTreeString(maxChildCategoriesLevel);
  const categoryQueryString = categoryId
    ? `
    category(
        storeId: $storeId
        userId: $userId
        cultureName: $cultureName
        currencyCode: $currencyCode
        id: "${categoryId}"
    ) {
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
    }`
    : '';

  return gql`
    query GetCategory(
      $storeId: String!
      $userId: String
      $cultureName: String
      $currencyCode: String
      $maxLevel: Int
      $onlyActive: Boolean
      $productFilter: String
    ) {
      ${categoryQueryString}

      childCategories(
        storeId: $storeId
        userId: $userId
        cultureName: $cultureName
        currencyCode: $currencyCode
        maxLevel: $maxLevel
        onlyActive: $onlyActive
        productFilter: $productFilter
        ${categoryId ? `categoryId: "${categoryId}"` : ''}
      ) {
        __typename
        ${childCategoriesFragment}
      }
    }
  `;
};
