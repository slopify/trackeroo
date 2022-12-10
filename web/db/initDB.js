import mongoose from 'mongoose';

const initDB = () => {
  const url = process.env.DB_CONNECTION_URL || '';
  const connectOpts = {};
  mongoose.connection.once('open', () => {
    console.log('> Connected to database');
  });

  return mongoose.connect(url, connectOpts).catch((err) => {
    console.log(err);
  });
};

export { initDB };

