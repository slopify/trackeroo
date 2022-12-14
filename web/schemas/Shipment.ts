import { Field, ObjectType, InputType, Int } from 'type-graphql';
import { getModelForClass, plugin, prop } from '@typegoose/typegoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Event } from './ShipmentEvent';
import 'reflect-metadata';
import { PaginateFn } from './utils';

@ObjectType()
class ShipmentsMetadata {
  @Field({ nullable: true })
  totalDocs?: number;

  @Field({ nullable: true })
  totalPages?: number;

  @Field({ nullable: true })
  pagingCounter?: number;

  @Field({ nullable: true })
  hasPrevPage?: boolean = false;

  @Field({ nullable: true })
  hasNextPage?: boolean = false;

  @Field({ nullable: true })
  prevPage?: number;

  @Field({ nullable: true })
  nextPage?: number;

  @Field({ nullable: true })
  hasMore?: boolean = false;
}

@ObjectType()
export class ShipmentDelivery {
  @Field({ nullable: true })
  @prop()
  estimatedDeliveryDate?: string;

  @Field({ nullable: true })
  @prop()
  service?: string;
}

@ObjectType()
class ShipmentAddress {
  @Field({ nullable: true })
  @prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  first_name?: string;

  @Field({ nullable: true })
  @prop()
  address1?: string;

  @Field({ nullable: true })
  @prop()
  phone?: string;

  @Field({ nullable: true })
  @prop()
  city?: string;

  @Field({ nullable: true })
  @prop()
  zip?: string;

  @Field({ nullable: true })
  @prop()
  province?: string;

  @Field({ nullable: true })
  @prop()
  country?: string;

  @Field({ nullable: true })
  @prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  last_name?: string;

  @Field({ nullable: true })
  @prop()
  address2?: string;

  @Field({ nullable: true })
  @prop()
  company?: string;

  @Field({ nullable: true })
  @prop()
  latitude?: string;

  @Field({ nullable: true })
  @prop()
  longitude?: string;

  @Field({ nullable: true })
  @prop()
  name?: string;

  @Field({ nullable: true })
  @prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  country_code?: string;

  @Field({ nullable: true })
  @prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  province_code?: string;
}

@ObjectType()
class ShipmentLineItem {
  @Field({ nullable: true })
  @prop()
  id?: string;

  @Field({ nullable: true })
  @prop()
  name?: string;

  @Field({ nullable: true })
  @prop()
  variant?: string;

  @Field({ nullable: true })
  @prop()
  quantity?: number;

  @Field({ nullable: true })
  @prop()
  image?: string;
}

@ObjectType()
@plugin(mongoosePaginate)
export class Shipment {
  static paginate: PaginateFn<Shipment>;

  @Field({ nullable: true })
  @prop()
  domain?: string;

  @Field({ nullable: true })
  @prop()
  orderID?: number;

  @Field({ nullable: true })
  @prop()
  shopifyOrderName?: string;

  @Field({ nullable: true })
  @prop()
  shopifyOrderId?: number;

  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String] })
  trackingNumbers?: string[];

  @Field({ nullable: true })
  @prop()
  courier?: string;

  @Field({ nullable: true })
  @prop()
  lastEvent?: string;

  /**
   * UNIX timestamp of order as a string
   */
  @Field({ nullable: true })
  @prop()
  orderDate?: string;

  /**
   * UNIX timestamp creation as a string
   */
  @Field({ nullable: true })
  @prop()
  createdAt?: string;

  /**
   * String of last updated time, formated as:  "Fri Feb 04 2022 02:06:57 GMT+0000 (Coordinated Universal Time)"
   */
  @Field({ nullable: true })
  @prop()
  updatedAt?: string;

  @Field({ nullable: true })
  @prop()
  status?: string;

  @Field({ nullable: true })
  @prop()
  shipmentId?: string;

  @Field({ nullable: true })
  @prop()
  trackerId?: string;

  @Field({ nullable: true })
  @prop()
  shopifyFulfilmentId?: string;

  @Field(() => [Event], { nullable: true })
  @prop({ type: () => [Event] })
  events?: Event[];

  @Field(() => ShipmentDelivery, { nullable: true })
  @prop({ type: () => [ShipmentDelivery] })
  delivery?: ShipmentDelivery;

  @Field(() => ShipmentAddress, { nullable: true })
  @prop({ type: () => [ShipmentAddress] })
  shippingAddress?: ShipmentAddress;

  @Field(() => [ShipmentLineItem], { nullable: true })
  @prop({ type: () => [ShipmentLineItem] })
  lineItems?: ShipmentLineItem[];
}

@ObjectType()
export class ShipmentsSchema {
  @Field(() => [Shipment], { nullable: true })
  data?: Shipment[];

  @Field(() => ShipmentsMetadata)
  metaData: ShipmentsMetadata;

  @Field(() => [CountSchema], { nullable: true })
  statusCounts: CountSchema[];
}

@ObjectType()
export class CountSchema {
  @Field()
  _id?: string;

  @Field()
  count: number;
}

@InputType()
export class ShipmentsInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field({ nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  @prop([String])
  statuses: string[];

  @Field(() => [String], { nullable: true })
  @prop([String])
  couriers: string[];

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}

@InputType()
export class ShipmentInput {
  @Field()
  domain: string;

  @Field({ nullable: true })
  trackingNumber?: string;

  @Field({ nullable: true })
  orderNumber?: string;

  @Field({ nullable: true })
  email?: string;
}

export const ShipmentModel = getModelForClass(Shipment);
