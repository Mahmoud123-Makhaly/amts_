import gql from 'graphql-tag';

const GET_CUSTOMER_REVIEWS = gql`
  query CustomerReviews(
    $storeId: String!
    $entityId: String!
    $entityType: String!
    $after: String
    $first: Int
    $keyword: String
    $sort: String
    $filter: String
  ) {
    customerReviews(
      storeId: $storeId
      entityId: $entityId
      entityType: $entityType
      after: $after
      first: $first
      filter: $filter
      sort: $sort
      keyword: $keyword
    ) {
      totalCount
      items {
        id
        createdDate
        modifiedDate
        storeId
        userId
        userName
        entityId
        entityType
        entityName
        title
        review
        rating
        reviewStatus
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          createdDate
          modifiedDate
          storeId
          userId
          userName
          entityId
          entityType
          entityName
          title
          review
          rating
          reviewStatus
        }
      }
    }
  }
`;

export default GET_CUSTOMER_REVIEWS;
