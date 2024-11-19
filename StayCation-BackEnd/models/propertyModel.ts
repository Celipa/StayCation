import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the Property document
interface IReview {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  accessabilities: string[];
  images?: string[];
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  availability?: boolean;
  location?: string;
  distance?: string;
  owner?: mongoose.Schema.Types.ObjectId;
  reviews?: IReview[];
  rating?: number;
  coordinates?: ICoordinates;
}

// Define the Property schema
const propertySchema: Schema<IProperty> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  accessabilities: { type: [String], required: true },
  images: { type: [String], required: false },
  bedrooms: { type: Number, required: false },
  bathrooms: { type: Number, required: false },
  amenities: { type: [String], required: false },
  availability: { type: Boolean, default: true, required: false },
  location: { type: String, required: false },
  distance: { type: String, required: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
      rating: { type: Number, required: false },
      comment: { type: String, required: false }
    }
  ],
  rating: { type: Number, default: 0 },
  coordinates: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  }
}, {
  timestamps: true
});

// Create the Property model
const Property: Model<IProperty> = mongoose.model<IProperty>('Property', propertySchema);

export default Property;