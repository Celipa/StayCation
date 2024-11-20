import { Schema, model, Document, Model } from 'mongoose';

// Define an interface for the Message document
interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
}

// Define the Message schema
const messageSchema: Schema<IMessage> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the Message model
const Message: Model<IMessage> = model<IMessage>('Message', messageSchema);

export default Message;