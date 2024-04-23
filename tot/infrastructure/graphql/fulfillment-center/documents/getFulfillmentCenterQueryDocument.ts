import gql from 'graphql-tag';

export const GET_FULFILLMENT_CENTERS = gql`
  query GetFulfillmentCenters(
    $after: String
    $first: Int
    $storeId: String
    $query: String
    $sort: String
    $fulfillmentCenterIds: [String]
  ) {
    fulfillmentCenters(
      after: $after
      first: $first
      storeId: $storeId
      query: $query
      sort: $sort
      fulfillmentCenterIds: $fulfillmentCenterIds
    ) {
      totalCount
      items {
        id
        name
        description
        shortDescription
        geoLocation
        address {
          city
          countryCode
          countryName
          line1
          line2
          postalCode
          zip
          phone
        }
      }
    }
  }
`;
