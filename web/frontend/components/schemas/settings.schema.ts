import { gql } from 'graphql-tag';

export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      trackingUrl
      notifications
      deliveryDateFrom
      deliveryDateStartDays
      deliveryDateEndDays
      deliveryDateEnabled
      translations {
        key
        value
      }
    }
  }
`;

export const GET_DELIVERY_SETTINGS = gql`
  query GetSettings {
    settings {
      deliveryDateFrom
      deliveryDateStartDays
      deliveryDateEndDays
      deliveryDateEnabled
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($settingsInput: SettingsInput!) {
    updateSettings(SettingsInput: $settingsInput) {
      trackingUrl
      notifications
      deliveryDateFrom
      deliveryDateStartDays
      deliveryDateEndDays
      deliveryDateEnabled
      translations {
        key
        value
      }
    }
  }
`;
