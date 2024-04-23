import gql from 'graphql-tag';

export const REQUEST_REGISTRATION = gql`
  mutation requestRegistration($command: InputRequestRegistrationType!) {
    requestRegistration(command: $command) {
      account {
        createdBy
        email
        id
        status
        username
      }
      organization {
        id
      }
      contact {
        about
        birthdate
        createdBy
        firstName
        id
        lastName
        middleName
        phoneNumber
        status
      }
      result {
        succeeded
        requireEmailVerification
        errors {
          code
          description
          parameter
        }
      }
    }
  }
`;
