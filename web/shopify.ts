import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import { initDB } from "./db/initDB";



export async function setUpShopify(){

let { restResources } = await import(
    `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
);
await initDB();


// If you want IntelliSense for the rest resources, you should import them directly
// import { restResources } from "@shopify/shopify-api/rest/admin/2022-10";

const dbFile = process.env.DB_CONNECTION_URL;

const sessionDb = new MongoDBSessionStorage(new URL(dbFile), '');

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
    "Basic": {
        // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
        amount: 0,
        currencyCode: "USD",
        interval: BillingInterval.OneTime,
    },
    "Essentials": { 
        amount: 9.99,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
    },
    "Professional": { 
        amount: 34.99,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
    },
    "Enterprise": { 
        amount: 119.99,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
    },
};

const shopify = shopifyApp({
    api: {
        apiVersion: LATEST_API_VERSION,
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
    },
    auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/webhooks",
    },
    // This should be replaced with your preferred storage strategy
    sessionStorage: sessionDb,
});
return shopify
}
