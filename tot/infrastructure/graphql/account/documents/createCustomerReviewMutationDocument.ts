import gql from 'graphql-tag';

export const ADD_CUSTOMER_REVIEW = gql`
  mutation CreateCustomerReview($command: CreateCustomerReviewCommandType!) {
    createCustomerReview(command: $command) {
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
`;
