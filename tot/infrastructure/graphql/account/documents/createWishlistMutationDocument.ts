import gql from 'graphql-tag';

export const ADD_WISHLIST = gql`
  mutation AddWishlist($command: InputCreateWishlistType!) {
    createWishlist(command: $command) {
      id
    }
  }
`;
