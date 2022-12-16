import { gql } from 'graphql-tag';

export const GET_DASHBOARD_CHART = gql`
  query Query($dashboardChartInput: DashboardChartInput!) {
    dashboardChart(DashboardChartInput: $dashboardChartInput) {
      data {
        date
        value
      }
    }
  }
`;
