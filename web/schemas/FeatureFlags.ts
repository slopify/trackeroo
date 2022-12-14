import { Field, ObjectType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

@ObjectType()
export class FeatureFlags {
  @Field()
  @prop()
  id: string;

  @Field()
  @prop()
  expertSetupEnabled: boolean;

  @Field()
  @prop()
  trackeroo2IsEnabled: boolean;

  @Field()
  @prop()
  needsPlanSignUp: boolean;

  @Field()
  @prop()
  unlimitedShipments: boolean;
}

export const FeatureFlagsModel = getModelForClass(FeatureFlags);
