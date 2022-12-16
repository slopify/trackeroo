import { gql } from 'graphql-tag';

export const GET_PAGE_EDITOR = gql`
  query PageEditor {
    pageEditor {
      aiProductRecommendations
      aiProductRecommendationsPosition
      primaryColor
      secondaryColor
      customCss
      blackListedLocation
      replacementMessage
      keywords
      customHtmlTop
      customHtmlBottom
      lookupOptions
      lookupIsChecked
    }
  }
`;

export const UPDATE_PAGE_EDITOR = gql`
  mutation UpdatePageEditor($pageEditorInput: PageEditorInput!) {
    updatePageEditor(PageEditorInput: $pageEditorInput) {
      aiProductRecommendations
      aiProductRecommendationsPosition
      primaryColor
      secondaryColor
      customCss
      blackListedLocation
      replacementMessage
      keywords
      customHtmlTop
      customHtmlBottom
    }
  }
`;
