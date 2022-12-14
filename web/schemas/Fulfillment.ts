import { getModelForClass, prop } from '@typegoose/typegoose';

class Fulfillment {
  @prop({ required: true })
  domain: string;

  @prop({ required: true })
  shopifyFulfilmentId: number;

  @prop({ required: true })
  shopifyOrderId: number;

  @prop({ required: true })
  shopifyOrderName: string;

  @prop({ required: true })
  status: string;

  @prop({ required: true })
  createdAt: string;

  @prop({ required: true })
  updatedAt: string;

  @prop({ required: true })
  trackingCompany: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  destination: any;

  @prop({ required: true })
  lineItems: any;

  @prop({ required: true })
  trackingNumbers: any;

  @prop({ required: true })
  trackingUrls: any;

  @prop({ required: true })
  name: string;
}

export const FulfillmentModel = getModelForClass(Fulfillment);
