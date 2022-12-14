import { getModelForClass, prop } from '@typegoose/typegoose';

class Tracker {
  @prop({ required: true })
  domain: string;

  @prop({ required: true })
  trackerId: string;

  @prop({ required: true })
  trackingNumber: string;

  @prop({ required: true })
  isSubscribed: boolean;

  @prop()
  createdAt?: string;
}

export const TrackersModel = getModelForClass(Tracker);
