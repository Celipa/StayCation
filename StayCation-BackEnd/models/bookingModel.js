"use strict";
const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    guests: {
        type: Number,
        required: true
    },
    nights: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: String,
        required: true
    },
    checkOutTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
