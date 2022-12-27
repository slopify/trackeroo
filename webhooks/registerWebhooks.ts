import { ApiVersion } from '@shopify/shopify-api';


export const webhooksRegistrations = async (shopify): Promise<void> => {

    const data = await shopify.api.client.query({
        data: {
            "query": `mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
      webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
        webhookSubscription {
          id
          topic
          format
          includeFields
          endpoint {
            __typename
            ... on WebhookHttpEndpoint {
              callbackUrl
            }
          }
        }
      }
    }`,
            "variables": {
                "topic": "ORDERS_CREATE",
                "webhookSubscription": {
                    "callbackUrl": "https://example.org/endpoint",
                    "format": "JSON",
                    "includeFields": [
                        "id",
                        "note"
                    ]
                }
            },
        },
    });
    console.log(data)
};
