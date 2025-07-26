import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable in .env.local"
  );
}

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseGlobal | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "zentra",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB connected successfully");

  return cached.conn;
};
