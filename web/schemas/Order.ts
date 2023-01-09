import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';

@ObjectType()
export class OrderFulfillments {
    @prop({ nullable: true })
    fulfillmentId?: number;

    @prop({ nullable: true })
    trackingNumber?: string;

    @prop({ nullable: true })
    courier?: string;

    @prop({ nullable: true })
    trackingUrl?: string;

    @prop({ nullable: true })
    fulfillmentStatus?: string;

    @prop({ nullable: true })
    fulfillmentSteps?: any[];

    @prop({ nullable: true })
    currentStep?: string;
    
    @prop({ nullable: true })
    lastUpdateAt?: Date;
}

class Order {

    @prop({ required: true })
    domain: string;

    @prop({ required: true })
    orderId: string;

    @prop({ required: true })
    customerEmail: string;

    @prop({ required: true })
    orderNumber: number;

    @prop({ required: true })
    createdAt: Date;

    @prop({ required: true })
    updatedAt: Date;

    @prop({ required: true })
    cancelledAt?: Date | null;

    @prop({ required: true })
    cancelledReason: string | null;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    orderStatusUrl: string;

    @prop({ required: true })
    lineItems: any[];

    @prop({ required: true })
    fulfillment?: OrderFulfillments;
}


export const OrderModel = getModelForClass(Order);
