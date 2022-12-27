import { ShopModel } from "../schemas/Shop";

export async function storeEndpoints(app) {

    app.get("/api/user", async (_req, res) => {
        const data = await ShopModel.findOne({ domain: res.locals.shopify.session.shop })
        res.status(200).send(data);
    });

}