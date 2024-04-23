import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($command: InputChangePasswordType) {
    changePassword(command: $command) {
      succeeded
      errors {
        code
        description
        parameter
      }
    }
  }
`;
