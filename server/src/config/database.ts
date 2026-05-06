import mongoose from 'mongoose';
import config from './config.js';

export async function connectDatabase() {
  if (!config.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured in the environment.');
  }

  await mongoose.connect(config.MONGODB_URI, {
    autoIndex: true,
  });
  console.log('MongoDB connected');
}
