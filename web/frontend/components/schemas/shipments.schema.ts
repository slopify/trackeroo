import { gql } from 'graphql-tag';

export const GET_SHIPMENTS = gql`
  query Shipments($shipmentsInput: ShipmentsInput!) {
    shipments(ShipmentsInput: $shipmentsInput) {
      data {
        orderID
        shopifyOrderName
        shopifyOrderId
        trackingNumbers
        courier
        lastEvent
        orderDate
        status
        shipmentId
      }
      metaData {
        totalDocs
        totalPages
        pagingCounter
        hasPrevPage
        hasNextPage
        prevPage
        nextPage
        hasMore
      }
      statusCounts {
        _id
        count
      }
    }
  }
`;
