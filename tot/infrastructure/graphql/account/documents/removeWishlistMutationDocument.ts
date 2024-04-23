import gql from 'graphql-tag';

export const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($command: InputRemoveWishlistType!) {
    removeWishlist(command: $command)
  }
`;
