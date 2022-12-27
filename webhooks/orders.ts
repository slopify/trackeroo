import { DeliveryMethod } from "@shopify/shopify-api";



export default {
    /**
     * Customers can request their data from a store owner. When this happens,
     * Shopify invokes this webhook.
     *
     * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
     */
    ORDERS_CREATE: {
        deliveryMethod: DeliveryMethod,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "orders_requested": [
            //     299938,
            //     280263,
            //     220458
            //   ],
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "data_request": {
            //     "id": 9999
            //   }
            // }
        },
    },
    /**
     * Customers can request their data from a store owner. When this happens,
     * Shopify invokes this webhook.
     *
     * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
     */
    ORDERS_UPDATE: {
        deliveryMethod: DeliveryMethod,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, body, webhookId) => {
            const payload = JSON.parse(body);
            // Payload has the following shape:
            // {
            //   "shop_id": 954889,
            //   "shop_domain": "{shop}.myshopify.com",
            //   "orders_requested": [
            //     299938,
            //     280263,
            //     220458
            //   ],
            //   "customer": {
            //     "id": 191167,
            //     "email": "john@example.com",
            //     "phone": "555-625-1199"
            //   },
            //   "data_request": {
            //     "id": 9999
            //   }
            // }
        },
    }
}   