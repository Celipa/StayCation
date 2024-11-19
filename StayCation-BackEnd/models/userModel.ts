import mongoose, { Document, Schema, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Define an interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  profilePicture?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profilePicture: { type: String },
}, {
  timestamps: true
});

// Define the matchPassword method
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;

// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({

//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }

// }, { timestamps: true })


// const User = mongoose.model('User', userSchema)

// module.exports = User;