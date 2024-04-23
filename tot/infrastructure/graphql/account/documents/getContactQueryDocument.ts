import gql from 'graphql-tag';

export const GET_CONTACT = gql`query Contact($memberId: String!) {
    contact(id: $memberId) {
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
        birthDate
        organizationId
        organizationsIds
        about
        securityAccounts {
            accessFailedCount
            createdBy
            createdDate
            email
            emailConfirmed
            id
            isAdministrator
            lockoutEnabled
            lockoutEnd
            memberId
            modifiedBy
            modifiedDate
            normalizedEmail
            normalizedUserName
            passwordExpired
            phoneNumber
            phoneNumberConfirmed
            photoUrl
            permissions
            securityStamp
            storeId
            twoFactorEnabled
            userName
            userType
            forcePasswordChange
            lockedState
        }
    }
}
`
