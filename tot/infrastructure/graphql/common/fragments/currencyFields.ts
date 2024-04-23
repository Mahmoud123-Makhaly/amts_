import gql from 'graphql-tag';

export const CURRENCY_FIELDS = gql`
  fragment currencyFields on CurrencyType {
    code
    symbol
    exchangeRate
    customFormatting
  }
`;
