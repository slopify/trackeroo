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
// import { DataType } from '@shopify/shopify-api';

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

const app = express();

setUpShopify().then((shopify) => {
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
                const payload = JSON.parse(body);
                console.log('order creation webhook hit')
            }
        },
        ORDERS_UPDATE: {
            deliveryMethod: DeliveryMethod.Http,
            callbackUrl: shopify.config.webhooks.path,
            callback: async (topic, shop, body, webhookId) => {
                const payload = JSON.parse(body);
                console.log('order update webhook hit')
            }
        },

    };
    // Set up Shopify authentication and webhook handling
    app.post(
        shopify.config.webhooks.path,
        shopify.processWebhooks({ webhookHandlers })
      );

    app.get(shopify.config.auth.path, shopify.auth.begin());
    app.get(
        shopify.config.auth.callbackPath,
        async (req, res) => {
            console.log('REGISTERING WEBHOOKS')
            const response = await shopify.api.webhooks.register({ session: res.locals.shopify.session })
            console.log(response);
            await shopify.auth.callback()
        }
        ,
        shopify.redirectToShopifyOrAppRoot()
    );


    // console.log(shopify)

    // app.post(
    //     shopify.config.webhooks.path + '/orders',
    //     shopify.processWebhooks({ webhookHandlers: OrderWebhookHandlers as any })
    // );

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
