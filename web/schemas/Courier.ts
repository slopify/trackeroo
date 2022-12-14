import { getModelForClass, prop } from '@typegoose/typegoose';

class Courier {
  @prop({ required: true })
  courierCode: string;

  @prop({ required: true })
  courierName: string;

  @prop({ required: true })
  isPost: boolean;

  @prop({ required: true })
  countryCode: string;
}

export const CourierModel = getModelForClass(Courier);
