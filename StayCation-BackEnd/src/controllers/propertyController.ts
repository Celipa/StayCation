import { Request, Response } from 'express';
import Property from '../models/propertyModel';

// Get all properties
export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get a property by id
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.status(200).json(property);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new property
export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update a property by id
export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.status(200).json(property);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a property by id
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};