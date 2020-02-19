import mongoose from 'mongoose';
import config from '../config';
const {isDevelopment, URL_DB} = config;

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
