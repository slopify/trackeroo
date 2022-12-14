import { getModelForClass, prop } from '@typegoose/typegoose';

class Order {
  @prop({ required: true })
  domain: string;

  @prop({ required: true })
  shopifyOrderId: string;

  @prop({ required: true })
  shopifyOrderName: string;

  @prop({ required: true })
  createdAt: string;

  @prop({ required: true })
  updatedAt: string;

  @prop({ required: true })
  cancelledAt?: string;

  @prop({ required: true })
  totalWeight: number;

  @prop({ required: true })
  financialStatus: string;

  @prop({ required: true })
  shopifyUserId?: string;

  @prop({ required: true })
  fulfillments: any;

  @prop()
  locationId?: string;

  @prop()
  fulfillmentStatus?: string;

  @prop({ required: true })
  orderStatusUrl: string;

  @prop({ required: true })
  shippingLines: any;

  @prop({ required: true })
  shippingAddress: any;

  @prop({ required: true })
  customer: any;

  @prop({ required: true })
  lineItems: any;
}

export const OrderModel = getModelForClass(Order);
