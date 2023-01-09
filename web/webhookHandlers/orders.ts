import { OrderModel } from '../schemas/Order'

type OrderFulfilmentWebHookResponse = {
    domain: string
    fulfillmentId: number,
    orderId: number,
    trackingNumber: string,
    trackingUrl: string,
    courier: string,
    shipmentStatus: string,
    createdAt: Date,
    updatedAt: Date,
}
type OrderCreateWebhookResponse = {
    domain: string
    orderId: number,
    customerEmail: string,
    orderNumber: number,
    createdAt: Date,
    updatedAt: Date,
    price: number,
    fufillmentStatus: string,
    orderUrl: string,
    fulfillments: any[],
    lineItems: any[],
    cancelledAt: Date | null,
    cancelledReason: string | null,
}


export const handleOrderFulfilled = async (body: OrderFulfilmentWebHookResponse): Promise<void> => {
     await OrderModel.updateOne(
        { domain: body.domain, orderId: body.orderId },
        {
            fulfillment: {
                fulfillmentId: body.fulfillmentId,
                trackingNumber: body.trackingNumber,
                courier: body.courier,
                trackingUrl: body.trackingUrl,
                fulfillmentStatus: body.shipmentStatus,
                lastUpdatedAt: new Date(),
                fulfillmentSteps: ["Waiting For Fulfilllment","Info Recieved"],
                currentStep: "Info Recieved"
            }
        });
        console.log(" -- FULFILLED ORDER WEBHOOK COMLPETE --")
        
}

export const handleOrderCreated = async (body: OrderCreateWebhookResponse): Promise<void> => {
    await OrderModel.updateOne(
        { domain: body.domain, orderId: body.orderId },
        {
            domain: body.domain,
            orderId: body.orderId,
            customerEmail: body.customerEmail,
            orderNumber: body.orderNumber,
            updatedAt: body.updatedAt,
            createdAt: body.createdAt,
            fulfillment: {
                fulfillmentId: null,
                trackingNumber: null,
                trackingUrl: null,
                fulfillmentStatus: body.fufillmentStatus,
                lastUpdatedAt: new Date(),
                fulfillmentSteps: ["Waiting For Fulfillment"],
                currentStep: 'Waiting For Fulfilllment'
            },
            lineItems: body.lineItems,
            cancelledAt: body.cancelledAt,
            cancelledReason: body.cancelledReason,
        },
        { new: true, upsert: true },
    );
    console.log(" -- CREATE ORDER WEBHOOK COMLPETE --")

}

export const handleOrderUpdated = (body: OrderCreateWebhookResponse): void => {
    console.log("updated: ", body);
}