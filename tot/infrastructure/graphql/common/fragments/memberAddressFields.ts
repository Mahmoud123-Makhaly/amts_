import gql from 'graphql-tag'

export const MEMBER_ADDRESS_FIELDS = gql`
  fragment memberAddressFields on MemberAddressType {
    id
    name
    organization
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
    isDefault
    phone
    email
    description
    addressType
  }
`;
