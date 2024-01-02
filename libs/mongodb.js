import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false,
  maxIdleTimeMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
};

// TODO: stopped here
// server returns 500 on first connection, please fix

// TODO: implement recycled promises
// see: https://github.com/vercel/next.js/discussions/12229#discussioncomment-45826
const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};
let pendingPromise = null


if (!MONGO_DB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_DB_URI"');
}

export const connectMongoDB = async () => {

  try {
    // fix for mongodb cache issue
    // https://github.com/vercel/next.js/discussions/12229#discussioncomment-91070
    if (global.connection) return global.connection
  
    if (!global.connectionPromise) {
      global.connectionPromise = mongoose.connect(MONGO_DB_URI, options)
      console.log('connected to mongoDB');
    }
  
    const client = await global.connectionPromise
    global.connection = client
  
    return global.connection
    
  } catch (error) {
    console.log('error connecting to mongoDB:', error);
    throw error; // Re-throw the error for further handling
  }

};
