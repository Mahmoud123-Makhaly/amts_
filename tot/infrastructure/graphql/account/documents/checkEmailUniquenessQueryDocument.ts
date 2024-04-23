import gql from 'graphql-tag';

export const CHECK_EMAIL_UNIQUENESS = gql`
  query checkEmailUniqueness($email: String!) {
    checkEmailUniqueness(email: $email)
  }
`;
