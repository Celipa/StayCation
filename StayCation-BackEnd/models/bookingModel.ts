import { Schema, Document, Model, model } from 'mongoose';

// Define an interface for the Booking document
interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  guests: number;
  nights: number;
  totalPrice: number;
  checkIn: Date;
  checkOut: Date;
  checkInTime: string;
  checkOutTime: string;
}

// Define the Booking schema
const bookingSchema: Schema<IBooking> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  property: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Property'
  },
  guests: {
    type: Number,
    required: true
  },
  nights: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  checkInTime: {
    type: String,
    required: true
  },
  checkOutTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the Booking model
const Booking: Model<IBooking> = model<IBooking>('Booking', bookingSchema);

export default Booking;