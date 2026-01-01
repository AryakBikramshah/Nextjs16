# MongoDB Connection Setup

This directory contains the MongoDB connection configuration for the Next.js application.

## Files

- `mongodb.ts` - Main MongoDB connection module with caching
- `example-usage.ts` - Example usage patterns and API route implementation

## Features

### ✅ Connection Caching
- Prevents multiple database connections during development
- Uses global caching to persist connections across module reloads
- Optimized for serverless environments

### ✅ TypeScript Support
- Fully typed with proper TypeScript interfaces
- No `any` types used
- Comprehensive error handling

### ✅ Production Ready
- Optimized connection pool settings
- Proper timeout configurations
- Connection health monitoring
- Graceful error handling and recovery

### ✅ Development Friendly
- Detailed logging with emojis for better visibility
- Connection status utilities
- Easy debugging with connection event listeners

## Environment Variables

Make sure to set up your MongoDB connection string in `.env`:

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

## Usage

### Basic Connection

```typescript
import connectToDatabase from '@/lib/mongodb';

export async function handler() {
  try {
    await connectToDatabase();
    // Your database operations here
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}
```

### In API Routes

```typescript
// app/api/example/route.ts
import connectToDatabase, { isConnected } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    
    if (!isConnected()) {
      throw new Error('Database not connected');
    }
    
    // Your database operations here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database operation failed' },
      { status: 500 }
    );
  }
}
```

### Connection Utilities

```typescript
import { 
  isConnected, 
  getConnectionStatus, 
  disconnectFromDatabase 
} from '@/lib/mongodb';

// Check if connected
if (isConnected()) {
  console.log('Database is connected');
}

// Get connection status (0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
const status = getConnectionStatus();

// Gracefully disconnect (useful for cleanup)
await disconnectFromDatabase();
```

## Connection Configuration

The connection is configured with production-optimized settings:

- **maxPoolSize**: 10 connections
- **minPoolSize**: 2 connections  
- **serverSelectionTimeoutMS**: 5000ms
- **socketTimeoutMS**: 45000ms
- **connectTimeoutMS**: 10000ms
- **heartbeatFrequencyMS**: 10000ms

## Error Handling

The connection module includes comprehensive error handling:

- Automatic retry on connection failures
- Cache cleanup on errors
- Detailed error logging
- Graceful degradation

## Best Practices

1. **Always use the cached connection** - Import from `@/lib/mongodb`
2. **Handle connection errors** - Wrap database operations in try-catch
3. **Check connection status** - Use `isConnected()` before operations
4. **Use proper TypeScript types** - Define interfaces for your models
5. **Monitor connection health** - Check logs for connection issues

## Troubleshooting

### Common Issues

1. **Multiple connections in development**
   - Solution: The caching mechanism prevents this automatically

2. **Connection timeout errors**
   - Check your MongoDB URI and network connectivity
   - Verify firewall settings allow MongoDB connections

3. **Authentication errors**
   - Ensure your MongoDB user has proper permissions
   - Check username/password in connection string

4. **TypeScript errors**
   - Make sure mongoose is installed: `npm install mongoose`
   - Mongoose includes its own TypeScript definitions