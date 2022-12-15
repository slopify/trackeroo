// import express from "express";
// import { BILLING_PLANS } from "../frontend/constants/constants.js";
// import shopify from "../shopify.js";

// const GET_BILLING_DETAILS = `
//   query discounts($first: Int!) {
//     codeDiscountNodes(first: $first) {
//       edges {
//         node {
//           id
//           codeDiscount {
//             ... on DiscountCodeBasic {
//               codes(first: 1) {
//                 edges {
//                   node {
//                     code
//                   }
//                 }
//               }
//             }
//             ... on DiscountCodeBxgy {
//               codes(first: 1) {
//                 edges {
//                   node {
//                     code
//                   }
//                 }
//               }
//             }
//             ... on DiscountCodeFreeShipping {
//               codes(first: 1) {
//                 edges {
//                   node {
//                     code
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export default function applyBillingEndpoints(app) {
//   app.use(express.json());

//   app.get("/api/plan", async (req, res) => {
//     const client = new shopify.api.clients.Graphql({
//       session: res.locals.shopify.session,
//     });

//     const shopData = await ShopModel.findOne({ domain: shop });

//     /* Fetch all available discounts to list in the QR code form */
//     const billingDetails = await client.query({
//       data: {
//         query: GET_BILLING_DETAILS,
//       },
//     });

//     res.send(billingDetails.body.data);
//   });

//   app.post("/api/qrcodes", async (req, res) => {
//     try {
//       const id = await QRCodesDB.create({
//         ...(await parseQrCodeBody(req)),

//         /* Get the shop from the authorization header to prevent users from spoofing the data */
//         shopDomain: await getShopUrlFromSession(req, res),
//       });
//       const response = await formatQrCodeResponse(req, res, [
//         await QRCodesDB.read(id),
//       ]);
//       res.status(201).send(response[0]);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });

//   app.patch("/api/qrcodes/:id", async (req, res) => {
//     const qrcode = await getQrCodeOr404(req, res);

//     if (qrcode) {
//       try {
//         await QRCodesDB.update(req.params.id, await parseQrCodeBody(req));
//         const response = await formatQrCodeResponse(req, res, [
//           await QRCodesDB.read(req.params.id),
//         ]);
//         res.status(200).send(response[0]);
//       } catch (error) {
//         res.status(500).send(error.message);
//       }
//     }
//   });

//   app.get("/api/qrcodes", async (req, res) => {
//     try {
//       const rawCodeData = await QRCodesDB.list(
//         await getShopUrlFromSession(req, res)
//       );

//       const response = await formatQrCodeResponse(req, res, rawCodeData);
//       res.status(200).send(response);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error.message);
//     }
//   });

//   app.get("/api/qrcodes/:id", async (req, res) => {
//     const qrcode = await getQrCodeOr404(req, res);

//     if (qrcode) {
//       const formattedQrCode = await formatQrCodeResponse(req, res, [qrcode]);
//       res.status(200).send(formattedQrCode[0]);
//     }
//   });

//   app.delete("/api/qrcodes/:id", async (req, res) => {
//     const qrcode = await getQrCodeOr404(req, res);

//     if (qrcode) {
//       await QRCodesDB.delete(req.params.id);
//       res.status(200).send();
//     }
//   });
// }