"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the City schema
const citySchema = new mongoose_1.Schema({
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
const City = (0, mongoose_1.model)('City', citySchema);
exports.default = City;
