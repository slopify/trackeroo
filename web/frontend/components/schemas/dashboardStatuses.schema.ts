import { gql } from 'graphql-tag';

export const GET_DASHBOARD_STATUSES = gql`
  query Query {
    dashboardStatuses {
      statusRejected
      statusReceived
      statusOutForDelivery
      statusOrderCreated
      statusOrderCancelled
      statusExceptionReturn
      statusException
      statusDelivered
      statusCustomsException
      statusCleared
      statusAvailableForPickup
      statusAttempted
      statusArrival
    }
  }
`;
