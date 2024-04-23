import gql from 'graphql-tag';

export const RESET_PASSWORD_BY_TOKEN = gql`
  mutation ResetPasswordByToken($command: InputResetPasswordByTokenType) {
    resetPasswordByToken(command: $command) {
      succeeded
      errors {
        code
        description
        parameter
      }
    }
  }
`;
