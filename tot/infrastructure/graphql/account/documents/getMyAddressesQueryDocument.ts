import gql from 'graphql-tag';
import { Fragments } from '../../common';

export const GET_MY_ADDRESSES = gql`
  ${Fragments.MEMBER_ADDRESS_FIELDS}
  query GetMyAddresses($after: String, $first: Int, $sort: String) {
    me {
      contact {
        addresses(after: $after, first: $first, sort: $sort) {
          items {
            ...memberAddressFields
          }
        }
      }
    }
  }
`;
