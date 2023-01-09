// @ts-nocheck
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import { setUpShopify } from "./shopify";
import { DeliveryMethod } from "@shopify/shopify-api";
import 'dotenv/config'
import { storeEndpoints } from './api/user'
import { shipmentEndpoints } from "./api/shipment";
import { handleOrderFulfilled, handleOrderCreated, handleOrderUpdated } from './webhookHandlers/orders'
// import { DataType } from '@shopify/shopify-api';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

const app = express();

setUpShopify().then((shopify) => {

    // Set up Shopify authentication and webhook handling
    app.get(shopify.config.auth.path, shopify.auth.begin());
    app.get(
        shopify.config.auth.callbackPath,
        shopify.auth.callback(),
        shopify.redirectToShopifyOrAppRoot()
    );

    const webhookHandlers = {
        CUSTOMERS_DATA_REQUEST: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId, apiVersion) => {
                const payload = JSON.parse(body);
                // prepare customers data to send to customer
            },
        },
        CUSTOMERS_REDACT: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body) => {
                const payload = JSON.parse(body);
                // remove customers data
            },
        },
        SHOP_REDACT: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId, apiVersion) => {
                const payload = JSON.parse(body);
                // remove shop data
            },
        },
        ORDERS_CREATE: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId) => {
                console.log(" -- ORDER CREATE --")
                const payload = JSON.parse(body);
                const requiredPayload = {
                    domain: shop,
                    orderId: payload.id,
                    customerEmail: payload?.customer?.email,
                    orderNumber: payload?.order_number,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    price: payload?.subtotal_price,
                    fufillmentStatus: payload?.fulfillment_status,
                    orderUrl: payload?.order_status_url,
                    fulfillments: payload?.fulfillments,
                    lineItems: payload?.line_items,
                    cancelledAt: null,
                    cancelledReason: null,
                }
                handleOrderCreated(requiredPayload);


            }
        },
        ORDERS_UPDATED: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId) => {
                console.log(" -- ORDER UPDATED --")
                if (!body) return;
                const payload = JSON.parse(body);
                const requiredPayload = {
                    domain: shop,
                    orderId: payload.id,
                    customerEmail: payload?.customer?.email,
                    orderNumber: payload?.order_number,
                    createdAt: payload?.created_at,
                    updatedAt: new Date(),
                    price: payload?.subtotal_price,
                    fufillmentStatus: payload?.fulfillment_status,
                    orderUrl: payload?.order_status_url,
                    fulfillments: payload?.fulfillments,
                    lineItems: payload?.line_items,
                    cancelledAt: payload?.cancelled_at,
                    cancelledReason: payload?.cancel_reason,
                }
                handleOrderUpdated(requiredPayload);
            }
        },
        ORDERS_FULFILLED: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId) => {
                console.log(" -- ORDER FULFILLED --")
                const payload = JSON.parse(body);
                console.log("PAYLOAD: ", payload.fulfillments)
                for (const fulfillment of payload.fulfillments) {
                    const requiredPayload = {
                        domain: shop,
                        fulfillmentId: fulfillment?.id,
                        orderId: fulfillment?.order_id,
                        trackingNumber: fulfillment.tracking_number,
                        trackingUrl: fulfillment.tracking_url,
                        courier: fulfillment.tracking_company,
                        shipmentStatus: fulfillment.shipment_status,
                        createdAt: fulfillment.created_at,
                        updatedAt: fulfillment.updated_at,
                    }
                    handleOrderFulfilled(requiredPayload);
                }
            }
        },


    };
    app.post(
        shopify.config.webhooks.path,
        shopify.processWebhooks({ webhookHandlers })
    );

    // All endpoints after this point will require an active session
    app.use("/api/*", shopify.validateAuthenticatedSession());

    app.use(express.json());

    storeEndpoints(app);
    shipmentEndpoints(app);


    app.use(serveStatic(STATIC_PATH, { index: false }));

    app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
        return res
            .status(200)
            .set("Content-Type", "text/html")
            .send(readFileSync(join(STATIC_PATH, "index.html")));
    });

    app.listen(PORT);
});
