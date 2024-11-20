import { Request, Response } from 'express';
import Message from '../models/messageModel';

// Create a new message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ message: 'Missing required fields: name, email, and message' });
      return;
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.log('Unknown error');
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

// Get all messages
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find({});
    const messageTexts = messages.map((message) => `${message.name}: ${message.message}. Sent From: ${message.email}`);
    res.status(200).json(messageTexts);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unknown error');
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};