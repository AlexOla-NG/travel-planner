import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const connectMongoDB = async () => {
  if (!MONGO_DB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGO_DB_URI"');
  }

  // try {
  //   if (process.env.NODE_ENV === 'development') {
  //     let globalWithMongo = global;
  //     // console.log('inside connectMongoDB globalWithMongo here:', globalWithMongo._mongoClientPromise.Promise.s);
  //     // console.log('inside connectMongoDB globalWithMongo here:', globalWithMongo._mongoClientPromise);

  //     if (!globalWithMongo._mongoClientPromise) {
  //       globalWithMongo._mongoClientPromise = await mongoose.connect(MONGO_DB_URI);
  //       console.log('Connected to MongoDB in development mode');
  //     }
  //   } else {
  //     await mongoose.connect(MONGO_DB_URI);
  //     console.log('Connected to MongoDB in production mode');
  //   }
  // } catch (error) {
  //   console.error('Error connecting to MongoDB:', error);
  //   throw error; // Re-throw the error for further handling
  // }
  
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('connected to mongoDB');
  } catch (error) {
    console.log('error connecting to mongoDB:', error);
    throw error; // Re-throw the error for further handling
  }
};
