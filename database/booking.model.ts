import mongoose, { Schema, Document, Model, Types} from 'mongoose';
import Event from './event.model';
/**
 * Booking document interface extending Mongoose Document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking schema with event reference validation
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true // Index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string): boolean {
          // RFC 5322 compliant email regex
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address'
      }
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false
  }
);

/**
 * Pre-save hook to validate event existence
 */
BookingSchema.pre("save", async function () {
  // Only validate eventId if it's new or modified
  if (!this.isNew && !this.isModified("eventId")) {
    return;
  }

  // Check if the referenced event exists
  const eventExists = await Event.findById(this.eventId);

  if (!eventExists) {
    throw new Error(`Event with ID ${this.eventId} does not exist`);
  }
});

/**
 * Compound index for efficient queries by event and email
 */
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Create and export the Booking model
 */
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;