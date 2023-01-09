import { OrderModel } from "../schemas/Order";

export async function shipmentEndpoints(app) {

    app.get("/api/shipments-overview", async (_req, res) => {
        const data = await OrderModel.find({ domain: res.locals.shopify.session.shop })
        res.status(200).send(data);
    });


}