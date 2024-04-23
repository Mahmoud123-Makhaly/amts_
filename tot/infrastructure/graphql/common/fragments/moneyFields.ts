import {CURRENCY_FIELDS} from './currencyFields'
import gql from 'graphql-tag'

export const MONEY_FIELDS = gql`
  ${CURRENCY_FIELDS}
  fragment moneyFields on MoneyType {
    amount
    formattedAmount
    formattedAmountWithoutCurrency
    currency {
      ...currencyFields
    }
  }
`;
