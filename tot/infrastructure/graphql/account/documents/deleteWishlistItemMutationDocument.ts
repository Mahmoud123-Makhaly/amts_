import gql from 'graphql-tag';

export const DELETE_WISHLIST_ITEM = gql`
  mutation DeleteWishlistItem($command: InputRemoveWishlistItemType!) {
    removeWishlistItem(command: $command) {
      id
    }
  }
`;
