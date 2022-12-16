import { gql } from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query Shop {
    shop {
      id
      myshopifyDomain
      name
      email
      plan {
        displayName
      }
      currencyFormats {
        moneyFormat
      }
    }
  }
`;
