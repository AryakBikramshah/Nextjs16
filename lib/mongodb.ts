import mongoose, { Connection } from "mongoose";

/**
 * Define the shape of our global cache
 */
type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

/**
 * Extend NodeJS global object safely
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Read MongoDB URI from environment
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}


const uri: string = MONGODB_URI;
/**
 * Initialize cache if it doesn't exist
 */
const cached: MongooseCache =
  global.mongooseCache ?? { conn: null, promise: null };

global.mongooseCache = cached;

/**
 * Connect to MongoDB (with caching)
 */
export async function connectDB(): Promise<Connection> {
  // If already connected, reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // If not connecting yet, start connection
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  // Wait for connection
  cached.conn = await cached.promise;
  return cached.conn;
}
