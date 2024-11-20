const City = require('../models/cityModel');

// Create a new city
exports.createCity = async (req, res) => {
    try {
        const { cityName, image, description } = req.body;
        if (!cityName || !image || !description) {
            return res.status(400).json({ message: 'Missing required fields: cityName, image, and description' });
        }
        const city = await City.create({ cityName, image, description });
        res.status(201).json(city);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all cities
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.status(200).json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching cities' });
    }
};

exports.getCityById = async (req, res) => {
    try {
        const {id} = req.params;
        const city = await City.findById(id);
        res.status(200).json(city);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

exports.updateCity = async (req, res) => {
    try {
        const {id} = req.params;
        const city = await City.findByIdAndUpdate(id, req.body);
        if (!city) {
            return res.status(404).json({message: `City with id ${id} not found`});
        }
        const updatedCity = await City.findById(id);
        res.status(200).json(updatedCity);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const {id} = req.params;
        const city = await City.findByIdAndDelete(id);
        if (!city) {
            return res.status(404).json({message: `City with id ${id} not found`});
        }
        res.status(200).json({message: `City with id ${id} deleted`});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
