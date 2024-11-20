import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the Login document
interface ILogin extends Document {
  email: string;
  password: string;
}

// Define the Login schema
const loginSchema: Schema<ILogin> = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the Login model
const Login: Model<ILogin> = mongoose.model<ILogin>('Login', loginSchema);

export default Login;