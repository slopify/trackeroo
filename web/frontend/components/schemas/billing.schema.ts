import { gql } from 'graphql-tag';

export const CREATE_CHARGING_PLAN = gql`
  mutation CreateChargingPlan($plan: String!, $trial: Boolean!) {
    createChargingPlan(plan: $plan, trial: $trial) {
      confirmationUrl
    }
  }
`;

export const BILLING_REDIRECT = gql`
  mutation AcceptBillingRedirect($chargeId: String!) {
    acceptBillingRedirect(chargeId: $chargeId) {
      redirectUrl
    }
  }
`;
