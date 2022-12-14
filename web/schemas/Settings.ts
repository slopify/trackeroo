import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

import { EstimateDeliveryDate } from '../../src/@constants/constants';

@ObjectType()
@InputType('SettingsTranslationsInput')
class SettingsTranslations {
  @Field()
  @prop({ required: true })
  key: string;

  @Field()
  @prop({ required: true })
  value: string;
}

@ObjectType()
export class Settings {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field()
  @prop({ required: true })
  trackingUrl: boolean;

  @Field()
  @prop({ required: true, default: false })
  notifications: boolean;

  @Field()
  @prop({ required: true, default: EstimateDeliveryDate.Created })
  deliveryDateFrom: EstimateDeliveryDate;

  @Field()
  @prop({ required: true, default: '10' })
  deliveryDateStartDays: string;

  @Field()
  @prop({ required: true, default: '15' })
  deliveryDateEndDays: string;

  @Field()
  @prop({ required: true, default: false })
  deliveryDateEnabled: boolean;

  @Field(() => [SettingsTranslations], { nullable: true })
  @prop({ type: () => [SettingsTranslations] })
  translations?: SettingsTranslations[];
}

@InputType()
export class SettingsInput implements Partial<Settings> {
  @Field({ nullable: true })
  trackingUrl?: boolean;

  @Field({ nullable: true })
  notifications?: boolean;

  @Field({ nullable: true })
  deliveryDateFrom?: EstimateDeliveryDate;

  @Field({ nullable: true })
  deliveryDateStartDays?: string;

  @Field({ nullable: true })
  deliveryDateEndDays?: string;

  @Field({ nullable: true })
  deliveryDateEnabled?: boolean;

  @Field(() => [SettingsTranslations], { nullable: true })
  translations?: SettingsTranslations[];
}

export const ShopSettingsModel = getModelForClass(Settings);
