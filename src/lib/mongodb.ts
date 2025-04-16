import mongoose from 'mongoose'

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI!

// Check if the MONGODB_URI environment variable is defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Check if a cached mongoose connection exists in the global context
let cached = (global as any).mongoose

// If no cached connection exists, initialize one
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

// Function to connect to the MongoDB database
export const dbConnect = async () => {
  // If there is already an active connection, return it
  if (cached.conn) return cached.conn
  
  // If there is no existing promise, create one to connect to the database
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }
  
  // Await the connection and store it in the cache
  cached.conn = await cached.promise
  
  // Return the active database connection
  return cached.conn
}
