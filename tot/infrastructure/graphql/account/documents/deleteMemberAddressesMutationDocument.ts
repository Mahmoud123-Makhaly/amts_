import gql from 'graphql-tag';

export const DELETE_MEMBER_ADDRESSES = gql`
  mutation DeleteMemberAddresses($command: InputDeleteMemberAddressType!) {
    deleteMemberAddresses(command: $command) {
      id
    }
  }
`;
