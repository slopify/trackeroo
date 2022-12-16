import { gql } from 'graphql-tag';

export const GET_FLAGS = gql`
  query {
    globalFeatureFlags {
      expertSetupEnabled
      trackeroo2IsEnabled
    }
  }
`;
