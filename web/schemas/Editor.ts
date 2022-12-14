import { Field, ObjectType, InputType } from 'type-graphql';
import 'reflect-metadata';
import { getModelForClass, prop } from '@typegoose/typegoose';

enum ProductRecommendationsPosition {
  Top = 'top',
  Bottom = 'bottom',
}

export enum lookupOptions {
  'order number/email & tracking number' = 'order number/email & tracking number',
  'order number/email only' = 'order number/email only',
  'tracking number only' = 'tracking number only',
}

@ObjectType()
export class PageEditor {
  @Field()
  @prop({ required: true })
  domain: string;

  @Field()
  @prop({ default: true })
  aiProductRecommendations?: boolean;

  @Field()
  @prop({ default: ProductRecommendationsPosition.Bottom })
  aiProductRecommendationsPosition?: ProductRecommendationsPosition;

  @Field({ nullable: true })
  @prop()
  primaryColor?: string;

  @Field({ nullable: true })
  @prop({ default: 'other' })
  blackListedLocation?: string;

  @Field({ nullable: true })
  @prop({ default: '' })
  replacementMessage?: string;

  @Field({ nullable: true })
  @prop({ default: '' })
  keywords?: string;

  @Field({ nullable: true })
  @prop()
  secondaryColor?: string;

  @Field({ nullable: true })
  @prop()
  customCss?: string;

  @Field({ nullable: true })
  @prop()
  customHtmlTop?: string;

  @Field({ nullable: true })
  @prop()
  customHtmlBottom?: string;

  @Field({ nullable: true })
  @prop({ default: lookupOptions['order number/email & tracking number'] })
  lookupOptions?: lookupOptions;

  @Field({ nullable: true })
  @prop({ default: false })
  lookupIsChecked?: boolean;
}

@InputType()
export class PageEditorInput implements Partial<PageEditor> {
  @Field({ nullable: true })
  aiProductRecommendations?: boolean;

  @Field({ nullable: true })
  blackListedLocation?: string;

  @Field({ nullable: true })
  replacementMessage?: string;

  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  aiProductRecommendationsPosition?: ProductRecommendationsPosition;

  @Field({ nullable: true })
  primaryColor?: string;

  @Field({ nullable: true })
  secondaryColor?: string;

  @Field({ nullable: true })
  customCss?: string;

  @Field({ nullable: true })
  customHtmlTop?: string;

  @Field({ nullable: true })
  customHtmlBottom?: string;

  @Field({ nullable: true })
  lookupOptions?: lookupOptions;

  @Field({ nullable: true })
  lookupIsChecked?: boolean;
}

export const PageEditorModel = getModelForClass(PageEditor);
