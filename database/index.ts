/**
 * Database models export file
 * 
 * This file provides a centralized export point for all database models,
 * allowing clean imports throughout the application.
 */

// Import models
import Event from './event.model';
import Booking from './booking.model';

// Export models and their interfaces
export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

// Export TypeScript interfaces
export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';

// Default export for convenience
export default {
  Event,
  Booking
};