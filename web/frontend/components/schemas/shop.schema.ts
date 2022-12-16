import { gql } from 'graphql-tag';

export const GET_SHOP = gql`
  query {
    shop {
      domain
      isInstall
      isActive
      featureFlags {
        brandingIsRemoved
        trackeroo2IsEnabled
        needsPlanSignUp
      }
      billing {
        plan
      }
    }
  }
`;

export const GET_SETUP_GUIDE_STEPS = gql`
  query {
    shop {
      setupGuide
    }
  }
`;

export const SET_INSTALL_SHOP = gql`
  mutation Mutation($setInstallShopInput: ShopInput!) {
    setInstall(ShopInput: $setInstallShopInput) {
      isInstall
    }
  }
`;

export const UPDATE_SETUP_GUIDE = gql`
  mutation updateGuideStep($setupGuideInput: SetupGuideInput!) {
    updateGuideSteps(SetupGuideInput: $setupGuideInput) {
      setupGuide
    }
  }
`;

export const SET_BILLING_STEP = gql`
  mutation UpdateShopBilling($shopBillingInput: ShopBillingInput!) {
    updateShopBilling(ShopBillingInput: $shopBillingInput) {
      billing {
        isBillingStep
      }
    }
  }
`;

export const GET_BILLING_DETAILS = gql`
  query {
    shopBillingDetails {
      shipments
      billing {
        plan
        trialEnd
      }
    }
  }
`;
