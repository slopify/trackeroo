import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
mongoose.set('strictQuery', false);

const initDB = (): Promise<Mongoose | void> => {
    const url = process.env.DB_CONNECTION_URL || '';
    const connectOpts: ConnectOptions = {};
    mongoose.connection.once('open', () => {
        console.log('> Connected to database');
    });

    return mongoose.connect(url, connectOpts).catch((err: Error) => {
        console.log(err);
    });
};

export { initDB };


