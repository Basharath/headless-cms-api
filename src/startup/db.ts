/* eslint-disable no-console */
import mongoose from 'mongoose';

export default function database() {
  const db = process.env.db as string;
  mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log(err.message));
}
