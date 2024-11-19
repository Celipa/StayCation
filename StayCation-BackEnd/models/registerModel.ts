import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the Register document
interface IRegister extends Document {
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the Register schema
const registerSchema: Schema<IRegister> = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      // This custom validator checks that confirmPassword is the same as password
      validator: function (this: IRegister, value: string) {
        return this.password === value;
      },
      message: "Passwords don't match."
    }
  }
}, {
  timestamps: true
});

// Pre-save hook to check if passwords match
registerSchema.pre<IRegister>('save', function (next) {
  if (this.isModified('password') || this.isModified('confirmPassword')) {
    if (this.password !== this.confirmPassword) {
      throw new Error("Passwords don't match");
    }
  }
  next();
});

// Create the Register model
const Register: Model<IRegister> = mongoose.model<IRegister>('Register', registerSchema);

export default Register;