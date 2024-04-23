import gql from 'graphql-tag'

export const QUOTE_ADDRESS_FIELDS = gql`
  fragment quoteAddressFields on QuoteAddressType {
    firstName
    lastName
    line1
    line2
    city
    countryCode
    countryName
    regionId
    regionName
    postalCode
    phone
    email
    addressType
    key
  }
`;
