import gql from 'graphql-tag';

export const REMOVE_CART = gql`
  mutation RemoveCart($command: InputRemoveCartType!) {
    removeCart(command: $command)
  }
`;
