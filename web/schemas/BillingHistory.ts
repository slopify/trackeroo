import { Field, ObjectType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
class BillingHistory {
  @Field()
  @prop({ required: true })
  description: string;

  @Field()
  @prop({ required: true })
  shop: string;

  @Field()
  @prop({ required: true })
  date: Date;

  @Field()
  @prop({ required: true })
  status: string;

  @Field()
  @prop()
  id: string;

  @Field()
  @prop()
  price: number;

  @Field()
  @prop()
  error: string;
}

export const BillingHistoryModel = getModelForClass(BillingHistory);
