import gql from 'graphql-tag';

export const PAGE_INFO_FIELDS = gql`
  fragment pageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
