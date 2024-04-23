import gql from 'graphql-tag'

export const PROPERTY_FIELDS = gql`
  fragment propertyFields on Property {
    name
    value
    type
    hidden
    valueType
    label
  }
`;
