import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';

@ObjectType()
export class SentEmailNotifications {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field({ nullable: true })
  @prop()
  shopifyOrderId: string;

  @Field({ nullable: true })
  @prop()
  customerName: string;

  @Field({ nullable: true })
  @prop()
  customerEmail: string;

  @Field({ nullable: true })
  @prop()
  status: string;

  @Field({ nullable: true })
  @prop()
  sentAt: Date;

  @Field({ nullable: true })
  @prop()
  html: string;
}

export const SentEmailNotificationsModel = getModelForClass(SentEmailNotifications);
