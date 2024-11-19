const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getUserBookingById,
  updateBooking,
  deleteBooking,
  updateUserBookingById,
  deleteUserBookingById,
  deleteUserBookings
} = require('../controllers/bookingController');

router.post('/bookings', createBooking);
router.get('/bookings', getUserBookings);
router.get('/bookings/:id', getUserBookingById);
router.put('/bookings/:id', updateBooking);
router.patch('/bookings/:id', updateUserBookingById); // Ensure updateUserBookingById is defined
router.delete('/bookings', deleteUserBookings);
router.delete('/bookings/:id', deleteUserBookingById);

module.exports = router;