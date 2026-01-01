/**
 * Example usage of the MongoDB connection
 * This file demonstrates how to use the MongoDB connection in your Next.js application
 */

import connectToDatabase, { isConnected } from './mongodb';
import mongoose, { Schema, Document } from 'mongoose';

// Example: User interface and schema
interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Create model (only if it doesn't exist to prevent re-compilation errors)
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

/**
 * Example API route handler function
 * This shows how you would use the MongoDB connection in a Next.js API route
 */
export async function exampleApiHandler() {
  try {
    // Connect to database (uses cached connection if available)
    await connectToDatabase();
    
    // Check connection status
    if (!isConnected()) {
      throw new Error('Database connection failed');
    }

    // Example: Create a new user
    const newUser = new User({
      name: 'John Doe',
      email: 'john@example.com'
    });

    const savedUser = await newUser.save();
    console.log('User created:', savedUser);

    // Example: Find all users
    const users = await User.find({});
    console.log('All users:', users);

    return { success: true, users };
  } catch (error) {
    console.error('Database operation failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Example usage in a Next.js API route file (app/api/users/route.ts)
 * 
 * import connectToDatabase from '@/lib/mongodb';
 * import { NextRequest, NextResponse } from 'next/server';
 * 
 * export async function GET() {
 *   try {
 *     await connectToDatabase();
 *     // Your database operations here
 *     return NextResponse.json({ message: 'Success' });
 *   } catch (error) {
 *     return NextResponse.json(
 *       { error: 'Database connection failed' },
 *       { status: 500 }
 *     );
 *   }
 * }
 */