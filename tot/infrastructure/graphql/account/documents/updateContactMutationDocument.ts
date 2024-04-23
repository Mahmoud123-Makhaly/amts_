import gql from 'graphql-tag';

export const UPDATE_CONTACT = gql`
  mutation updateContact($command: InputUpdateContactType!) {
    updateContact(command: $command) {
      id
      outerId
      memberType
      name
      status
      phones
      emails
      groups
      seoObjectType
      firstName
      lastName
      middleName
      fullName
      about
      birthDate
      organizationId
      organizationsIds
    }
  }
`;
