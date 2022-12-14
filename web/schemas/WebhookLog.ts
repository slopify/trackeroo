import { getModelForClass, prop } from '@typegoose/typegoose';

class WebhookLog {
  @prop({ required: true })
  shop: string;

  @prop({ required: true })
  topic: string;

  @prop({ required: true })
  status: string;

  @prop({ required: true })
  date: any;

  @prop()
  body?: any;

  @prop()
  message?: string;
}

export const WebhookLogModel = getModelForClass(WebhookLog);
