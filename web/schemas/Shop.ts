import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class ShopFeatureFlags {
  @Field({ nullable: true })
  @prop()
  brandingIsRemoved?: boolean;

  @Field({ nullable: true })
  @prop()
  trackeroo2IsEnabled?: boolean;

  @Field({ nullable: true })
  @prop()
  needsPlanSignUp?: boolean;

  @Field({ nullable: true })
  @prop()
  unlimitedShipments?: boolean;

  @Field({ nullable: true })
  @prop()
  importLastThirtyDays?: boolean;
}

@ObjectType()
export class PrimaryDomain {
  @Field({ nullable: true })
  @prop()
  id: string;

  @Field({ nullable: true })
  @prop()
  host: string;
}

@ObjectType()
export class ShopBilling {
  @Field()
  @prop()
  isBillingStep: boolean;

  @Field({ nullable: true })
  @prop()
  isAccepted: boolean;

  @Field({ nullable: true })
  @prop()
  trialEnd?: Date;

  @Field({ nullable: true })
  @prop()
  billingDate?: Date;

  @Field({ nullable: true })
  @prop()
  lastBillingDate?: Date;

  @Field({ nullable: true })
  @prop()
  applyPlanDate?: Date;

  @Field({ nullable: true })
  @prop()
  plan?: string;

  @Field({ nullable: true })
  @prop()
  chargeId?: string;

  @Field({ nullable: true })
  @prop()
  testMode: boolean;
}

@ObjectType()
export class ShopBillingDetails {
  @Field()
  @prop()
  shipments: number;

  @Field(() => ShopBilling)
  @prop({ type: () => ShopBilling })
  billing: ShopBilling;
}
@ObjectType()
export class Shop {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field(() => PrimaryDomain, { nullable: true })
  @prop({ type: () => PrimaryDomain })
  primaryDomain: PrimaryDomain;

  @Field({ nullable: true })
  @prop()
  contactEmail?: string;

  @Field({ nullable: true })
  @prop()
  currencyCode?: string;

  @Field({ nullable: true })
  @prop()
  email?: string;

  @Field({ nullable: true })
  @prop()
  name?: string;

  @Field({ nullable: true })
  @prop()
  scope?: string;

  @Field({ nullable: true })
  @prop()
  accessToken?: string;

  @Field({ nullable: true })
  @prop()
  isInstall: boolean;

  @Field({ nullable: true })
  @prop()
  isActive: boolean;

  @Field(() => ShopFeatureFlags, { nullable: true })
  @prop({ type: () => ShopFeatureFlags })
  featureFlags?: ShopFeatureFlags;

  @Field(() => [String], { nullable: true })
  @prop({ default: [], type: () => [String] })
  setupGuide: string[];

  @Field(() => ShopBilling, { nullable: true })
  @prop({ type: () => ShopBilling, _id: false })
  billing?: ShopBilling;
}

@InputType()
export class ShopInput {
  @Field()
  isInstall: boolean;
}

@InputType()
export class SetupGuideInput {
  @Field(() => [String], { nullable: true })
  setupGuide: string[];
}

@InputType()
export class ShopBillingInput {
  @Field({ nullable: true })
  isBillingStep?: boolean;

  @Field({ nullable: true })
  trialEnd?: string;

  @Field({ nullable: true })
  billingDate?: string;

  @Field({ nullable: true })
  plan?: string;
}

export const ShopModel = getModelForClass(Shop);
