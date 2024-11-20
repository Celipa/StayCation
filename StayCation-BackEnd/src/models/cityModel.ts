import { Schema, model, Document, Model } from 'mongoose';

// Define an interface for the City document
interface ICity extends Document {
  cityName: string;
  image: string;
  description: string;
}

// Define the City schema
const citySchema: Schema<ICity> = new Schema({
  cityName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the City model
const City: Model<ICity> = model<ICity>('City', citySchema);

export default City;