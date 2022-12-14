import { getModelForClass, prop } from '@typegoose/typegoose';

export class ChineseLocations {
  @prop({ required: true })
  locationName: string;
}

export const ChineseLocationsModel = getModelForClass(ChineseLocations);
