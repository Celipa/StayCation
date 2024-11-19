"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Property schema
const propertySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    accessabilities: { type: [String], required: true },
    images: { type: [String], required: false },
    bedrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    amenities: { type: [String], required: false },
    availability: { type: Boolean, default: true, required: false },
    location: { type: String, required: false },
    distance: { type: String, required: false },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: false },
    reviews: [
        {
            user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: false },
            rating: { type: Number, required: false },
            comment: { type: String, required: false }
        }
    ],
    rating: { type: Number, default: 0 },
    coordinates: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false }
    }
}, {
    timestamps: true
});
// Create the Property model
const Property = mongoose_1.default.model('Property', propertySchema);
exports.default = Property;
