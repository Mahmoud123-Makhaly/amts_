import gql from 'graphql-tag'

export const VALIDATION_ERROR_FIELDS = gql`
fragment validationErrorFields on ValidationErrorType {
  errorCode
  errorMessage
  errorParameters {
    key
    value
  }
  objectId
  objectType
}
`
