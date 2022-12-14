import { Field, ObjectType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class DashboardStatuses {
  @Field({ nullable: true })
  @prop()
  statusDelivered?: number;

  @Field({ nullable: true })
  @prop()
  statusException?: number;

  @Field({ nullable: true })
  @prop()
  statusAttempted?: number;

  @Field({ nullable: true })
  @prop()
  statusOutForDelivery?: number;

  @Field({ nullable: true })
  @prop()
  statusAvailableForPickup?: number;

  @Field({ nullable: true })
  @prop()
  statusExceptionReturn?: number;

  @Field({ nullable: true })
  @prop()
  statusCleared?: number;

  @Field({ nullable: true })
  @prop()
  statusRejected?: number;

  @Field({ nullable: true })
  @prop()
  statusCustomsException?: number;

  @Field({ nullable: true })
  @prop()
  statusReceived?: number;

  @Field({ nullable: true })
  @prop()
  statusArrival?: number;

  @Field({ nullable: true })
  @prop()
  statusOrderCancelled?: number;

  @Field({ nullable: true })
  @prop()
  statusOrderCreated?: number;
}

export const DashboardStatusesModel = getModelForClass(DashboardStatuses);
