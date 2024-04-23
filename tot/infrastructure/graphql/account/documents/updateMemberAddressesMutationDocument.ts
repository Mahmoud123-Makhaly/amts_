import gql from 'graphql-tag';

export const UPDATE_MEMBER_ADDRESSES = gql`
  mutation UpdateMemberAddresses($command: InputUpdateMemberAddressType!) {
    updateMemberAddresses(command: $command) {
      id
    }
  }
`;
