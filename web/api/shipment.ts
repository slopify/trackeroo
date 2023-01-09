import { OrderModel } from "../schemas/Order";

export async function shipmentEndpoints(app) {

    app.get("/api/shipments-overview", async (_req, res) => {
        const days = 30;
        const data = await OrderModel.find({
            domain: res.locals.shopify.session.shop, "createdAt":
            {
                $gte: new Date((new Date().getTime() - (days * 24 * 60 * 60 * 1000)))
            }
        }, { fulfillment: 1 })
        console.log(data)
        res.status(200).send(data);
    });


}