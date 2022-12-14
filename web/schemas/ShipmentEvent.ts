import { Field, InputType, ObjectType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class Event {
  @Field({ nullable: true })
  @prop()
  status?: string;

  @Field({ nullable: true })
  @prop()
  datetime?: string;

  @Field({ nullable: true })
  @prop()
  hasNoTime?: boolean;

  @Field({ nullable: true })
  @prop()
  order?: string;

  @Field({ nullable: true })
  @prop()
  utcOffset?: string;

  @Field({ nullable: true })
  @prop()
  location?: string;
}

@ObjectType()
export class ShipmentEvent {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field()
  @prop({ required: true })
  shipmentId: string;

  @Field(() => [Event])
  @prop({ type: () => [Event], required: true })
  events: Event[];
}

@InputType()
export class ShipmentEventsInput {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field()
  @prop({ required: true })
  shipmentId: string;
}

export const ShipmentEventModel = getModelForClass(ShipmentEvent);
