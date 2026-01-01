import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Event document interface extending Mongoose Document
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event schema with validation and automatic slug generation
 */
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
      trim: true
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Event date is required']
    },
    time: {
      type: String,
      required: [true, 'Event time is required']
    },
    mode: {
      type: String,
      required: [true, 'Event mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid'
      }
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (agenda: string[]) => agenda.length > 0,
        message: 'Agenda must contain at least one item'
      }
    },
    organizer: {
      type: String,
      required: [true, 'Event organizer is required'],
      trim: true
    },
    tags: {
      type: [String],
      required: [true, 'Event tags are required'],
      validate: {
        validator: (tags: string[]) => tags.length > 0,
        message: 'At least one tag is required'
      }
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false
  }
);

/**
 * Pre-save hook for slug generation and data normalization
 */
EventSchema.pre('save', async function () {
  // Generate slug only if title is new or modified
  if (this.isNew || this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date
  if (this.isModified('date')) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time
  if (this.isModified('time')) {
    this.time = normalizeTime(this.time);
  }
});


/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Normalize date to ISO format (YYYY-MM-DD)
 */
function normalizeDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format. Please provide a valid date.');
  }
  return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

/**
 * Normalize time to HH:MM format
 */
function normalizeTime(timeStr: string): string {
  // Handle various time formats and normalize to HH:MM
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  
  if (timeRegex.test(timeStr)) {
    return timeStr;
  }
  
  // Try to parse and format common time formats
  const time = new Date(`1970-01-01T${timeStr}`);
  if (!isNaN(time.getTime())) {
    return time.toTimeString().slice(0, 5); // Extract HH:MM
  }
  
  throw new Error('Invalid time format. Please use HH:MM format.');
}

/**
 * Create and export the Event model
 */
const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;