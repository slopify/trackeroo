import { ShipmentModel } from "../schemas/Shipment";

export async function shipmentEndpoints(app) {

    app.get("/api/shipments-overview", async (_req, res) => {
        const data = await ShipmentModel.find({ domain: res.locals.shopify.session.shop })
        console.log(data);
        res.status(200).send(data);
    });


}