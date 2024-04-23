import gql from 'graphql-tag';
import { MONEY_FIELDS } from '../../common/fragments';

export const GET_INVOICE = gql`
  ${MONEY_FIELDS}
  query Invoice($number: String, $cultureName: String) {
    order(number: $number, cultureName: $cultureName) {
      number
      createdDate
      items {
        name
        quantity
        imageUrl
        product {
          id
          slug
        }
        placedPrice {
          ...moneyFields
        }
      }
      shipments {
        deliveryAddress {
          name
          firstName
          lastName
          line1
          line2
          city
          countryName
          regionName
          phone
          email
        }
      }
      inPayments(first: 1, sort: "CreatedDate:desc") {
        gatewayCode
      }
      discountTotalWithTax {
        ...moneyFields
      }
      shippingTotal {
        ...moneyFields
      }
      taxTotal {
        ...moneyFields
      }
      subTotal {
        ...moneyFields
      }
      total {
        ...moneyFields
      }
    }
  }
`;
