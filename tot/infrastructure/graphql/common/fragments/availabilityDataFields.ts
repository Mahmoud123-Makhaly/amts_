import gql from 'graphql-tag'

export const AVAILABILITY_DATA_FIELDS = gql`
  fragment availabilityDataFields on AvailabilityData {
    isActive
    isAvailable
    isBuyable
    isInStock
    availableQuantity
    inventories {
      fulfillmentCenterId
      fulfillmentCenterName
      inStockQuantity
    }
  }
`;
