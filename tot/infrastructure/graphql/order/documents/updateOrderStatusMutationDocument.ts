import gql from 'graphql-tag';

export const CHANGE_ORDER_STATUS = gql`
  mutation ChangeOrderStatus($command: InputChangeOrderStatusType!) {
    changeOrderStatus(command: $command)
  }
`;
