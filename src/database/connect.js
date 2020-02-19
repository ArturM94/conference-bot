import mongoose from 'mongoose';
import {isDevelopment, URL_DB} from '../config';

export default async () => {
  try {
    await mongoose.connect(URL_DB, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Connected to mongodb!');
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
