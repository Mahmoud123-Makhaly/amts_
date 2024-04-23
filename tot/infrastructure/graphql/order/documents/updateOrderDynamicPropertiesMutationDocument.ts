import gql from 'graphql-tag';

export const UPDATE_ORDER_DYNAMIC_PROPERTIES = gql`
  mutation UpdateOrderDynamicProperties($command: InputUpdateOrderDynamicPropertiesType!) {
    updateOrderDynamicProperties(command: $command) {
      id
    }
  }
`;
