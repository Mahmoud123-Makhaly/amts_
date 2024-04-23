import { MONEY_FIELDS } from './moneyFields';
import { CURRENCY_FIELDS } from './currencyFields';
import { SHORT_ORDER_FIELDS } from './shortOrderFields';
import { ORDER_ADDRESS_FIELDS } from './orderAddressFields';
import gql from 'graphql-tag';

export const FULL_ORDER_FIELDS = gql`
  ${MONEY_FIELDS}
  ${CURRENCY_FIELDS}
  ${SHORT_ORDER_FIELDS}
  ${ORDER_ADDRESS_FIELDS}
  fragment fullOrderFields on CustomerOrderType {
    ...shortOrderFields
    comment
    modifiedDate
    purchaseOrderNumber
    currency {
      ...currencyFields
    }
    shipments {
      shipmentMethodCode
      shipmentMethodOption
      status
      shippingMethod {
        logoUrl
        typeName
      }
      price {
        ...moneyFields
      }
      deliveryAddress {
        ...orderAddressFields
      }
    }
    inPayments(first: 1, sort: "CreatedDate:desc") {
      id
      number
      isApproved
      gatewayCode
      paymentMethod {
        logoUrl
        code
        typeName
        paymentMethodType
        paymentMethodGroupType
        description
      }
      billingAddress {
        ...orderAddressFields
      }
    }
    availablePaymentMethods {
      code
      logoUrl
      price {
        ...moneyFields
      }
    }
  }
`;
