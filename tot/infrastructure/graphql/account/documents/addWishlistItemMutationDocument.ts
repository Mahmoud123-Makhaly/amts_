import gql from 'graphql-tag';

export const ADD_WISHLIST_ITEM = gql`
  mutation AddWishlistItem($command: InputAddWishlistItemType!) {
    addWishlistItem(command: $command) {
      id
    }
  }
`;
