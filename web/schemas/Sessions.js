import { Schema, model } from 'mongoose';

const SessionsSchema = new Schema(
  {
    key: Schema.Types.String,
    payload: Schema.Types.String,
    domain: Schema.Types.String,
  },
  { versionKey: false },
);

const SessionsModel = model('sessions', SessionsSchema);
export default SessionsModel;
