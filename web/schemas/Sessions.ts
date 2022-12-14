import mongoose, { Schema, model } from 'mongoose';

export interface ISessions extends mongoose.Document {
  key: string;
  payload: string;
  domain: string;
}

const SessionsSchema = new Schema<ISessions>(
  {
    key: Schema.Types.String,
    payload: Schema.Types.String,
    domain: Schema.Types.String,
  },
  { versionKey: false },
);

const SessionsModel = model<ISessions>('sessions', SessionsSchema);
export default SessionsModel;
