import gql from 'graphql-tag';

export const REQUEST_PASSWORD_RESET = gql`
  query requestPasswordReset($loginOrEmail: String!, $urlSuffix: String!) {
    requestPasswordReset(loginOrEmail: $loginOrEmail, urlSuffix: $urlSuffix)
  }
`;
