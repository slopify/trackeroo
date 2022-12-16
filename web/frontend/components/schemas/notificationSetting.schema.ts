import { gql } from 'graphql-tag';

export const GET_NOTIFICATION_SETTINGS = gql`
  query {
    notificationSettings {
      domain
      logoUrl
      logoWidth
      accentColor
      questionEmail
      emailTemplate
      emailStatusToggles
    }
  }
`;

export const UPDATE_NOTIFICATION_SETTINGS = gql`
  mutation Mutation($notificationSettingInput: NotificationSettingInput!) {
    updateNotificationSetting(NotificationSettingInput: $notificationSettingInput) {
      logoUrl
      logoWidth
      accentColor
      questionEmail
      emailTemplate
      emailStatusToggles
    }
  }
`;
