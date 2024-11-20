import { Request, Response } from 'express';
import City from '../models/cityModel';

// Create a new city
export const createCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = new City(req.body);
    const savedCity = await city.save();
    res.status(201).json(savedCity);
  } catch (error) {
    const errorMessage = (error as any).message;
    console.log(errorMessage);
    res.status(400).json({ message: errorMessage });
  }
};

// Get all cities
export const getAllCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const cities = await City.find({});
    res.status(200).json(cities);
  } catch (error) {
    const errorMessage = (error as any).message;
    console.log(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

// Get a city by id
export const getCityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const city = await City.findById(id);
    if (!city) {
      res.status(404).json({ message: `City with id ${id} not found` });
      return;
    }
    res.status(200).json(city);
  } catch (error) {
    const errorMessage = (error as any).message;
    console.log(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

// Update a city by id
export const updateCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndUpdate(id, req.body);
    if (!city) {
      res.status(404).json({ message: `City with id ${id} not found` });
      return;
    }
    const updatedCity = await City.findById(id);
    res.status(200).json(updatedCity);
  } catch (error) {
    const errorMessage = (error as any).message;
    console.log(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

// Delete a city by id
export const deleteCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) {
      res.status(404).json({ message: `City with id ${id} not found` });
      return;
    }
    res.status(200).json({ message: `City with id ${id} deleted` });
  } catch (error) {
    const errorMessage = (error as any).message;
    console.log(errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};