import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('connected to mongoDB');
  } catch (error) {
    console.log('error connecting to mongoDB:', error);
  }
}