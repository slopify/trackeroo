import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const initDB = () => {
  const url = process.env.DB_CONNECTION_URL;
  const connectOpts = {useNewUrlParser: true};
  mongoose.connection.once('open', () => {
    console.log('> Connected to database');
  });

  return mongoose.connect(url, connectOpts).catch((err) => {
    console.log(err);
  });
};

export { initDB };

