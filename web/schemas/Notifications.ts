import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';

@ObjectType()
export class NotificationSetting {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field({ nullable: true })
  @prop()
  logoUrl: string;

  @Field({ nullable: true })
  @prop()
  logoWidth: number;

  @Field({ nullable: true })
  @prop()
  accentColor: string;

  @Field({ nullable: true })
  @prop()
  questionEmail: string;

  @Field({ nullable: true })
  @prop()
  emailTemplate: string;

  @Field(() => [String])
  @prop({ type: () => [String], required: true })
  emailStatusToggles: string[];
}

@InputType()
export class NotificationSettingInput implements Partial<NotificationSetting> {
  @Field({ nullable: true })
  logoUrl?: string;

  @Field({ nullable: true })
  logoWidth?: number;

  @Field({ nullable: true })
  accentColor?: string;

  @Field({ nullable: true })
  questionEmail?: string;

  @Field({ nullable: true })
  emailTemplate?: string;

  @Field(() => [String])
  emailStatusToggles: string[];
}

export const NotificationSettingModel = getModelForClass(NotificationSetting);
