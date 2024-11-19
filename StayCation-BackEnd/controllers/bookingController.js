const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');   
require('dotenv').config();

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { property, guests, nights, totalPrice, checkIn, checkOut } = req.body;
    const user = req.user._id;

    const booking = new Booking({
      user,
      property,
      guests,
      nights,
      totalPrice,
      checkIn,
      checkOut
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('property');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a booking by id
exports.getUserBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a booking by id
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { property, guests, nights, totalPrice, checkIn, checkOut } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.property = property || booking.property;
    booking.guests = guests || booking.guests;
    booking.nights = nights || booking.nights;
    booking.totalPrice = totalPrice || booking.totalPrice;
    booking.checkIn = checkIn || booking.checkIn;
    booking.checkOut = checkOut || booking.checkOut;

    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user booking by id
exports.updateUserBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { property, guests, nights, totalPrice, checkIn, checkOut } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.property = property || booking.property;
    booking.guests = guests || booking.guests;
    booking.nights = nights || booking.nights;
    booking.totalPrice = totalPrice || booking.totalPrice;
    booking.checkIn = checkIn || booking.checkIn;
    booking.checkOut = checkOut || booking.checkOut;

    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking by id
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete all bookings for a user
exports.deleteUserBookings = async (req, res) => {
  try {
    await Booking.deleteMany({ user: req.user._id });
    res.status(200).json({ message: 'All bookings removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user booking by id
exports.deleteUserBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// //CREATE USER BOOKING
// exports.createBooking = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       const booking = new Booking({
//         user: user._id,
//         property: req.body.property,
//         dates: req.body.dates,
//       });
//       const createdBooking = await booking.save();
//       res.status(201).json(createdBooking);
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     console.log(error);
//     throw new Error('Token is not valid');
//   }
// });

// //GET USER BOOKINGS
// exports.getUserBookings = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       const bookings = await Booking.find({ user: user._id }).populate('property');
//       res.json(bookings);
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

// //GET USER BOOKING BY ID
// exports.getUserBookingById = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       const booking = await Booking.findById(req.params.id).populate('property');
//       if(booking) {
//         res.json(booking);
//       } else {
//         res.status(404);
//         throw new Error('Booking not found');
//       }
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

// //UPDATE USER BOOKINGS
// exports.updateUserBookings = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       user.bookings = req.body.bookings;
//       const updatedUser = await user.save();
//       res.json(updatedUser);
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

// //UPDATE USER BOOKING BY ID
// exports.updateUserBookingById = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       const booking = await Booking.findById(req.params.id);
//       if(booking) {
//         booking.property = req.body.property || booking.property;
//         booking.dates = req.body.dates || booking.dates;
//         const updatedBooking = await booking.save();
//         res.json(updatedBooking);
//       } else {
//         res.status(404);
//         throw new Error('Booking not found');
//       }
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

// //DELETE USER BOOKING BY ID
// exports.deleteUserBookingById = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       await Booking.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Booking deleted' });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

// //DELETE ALL USER BOOKINGS
// exports.deleteUserBookings = asyncHandler(async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401);
//     throw new Error('No token, authorization denied');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     if(user) {
//       await Booking.deleteMany({ user: user._id });
//       res.json({ message: 'All bookings deleted' });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error('Token is not valid');
//   }
// });

























// const Order = require('../models/orderModel');

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({});
//         res.status(200).json(orders);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
//     }
// };


// //hämtar produkter med specifikt id
// exports.getOrderById = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const order = await Order.findById(id);
//         res.status(200).json(order);
        
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
        
//     }
// };


// //Skapar en ny produkt
// exports.createOrder = async (req, res) => {
//     try {
//         const order = await Order.create(req.body);
//         res.status(201).json(order);
        
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
        
//     }
// };

// //Uppdaterar en produkt med specifikt id
// exports.updateOrderById = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const order = await Order.findByIdAndUpdate
//         (id, req.body);
//         if (!order) {
//             return res.status(404).json({message: `order with id ${id} not found`});
//         }
//         const updatedOrder = await Order.findById(id);
//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
        
//     }};

// //Tar bort en produkt med specifikt id
// exports.deleteOrderById = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const order = await Order.findByIdAndDelete(id);
//         if (!order) {
//             return res.status(404).json({message: `order with id ${id} not found`});
//         }
//         res.status(200).json({message: `order with id ${id} deleted`});
        
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
        
//     }
// };




// //GET USER ORDERS-----------------------------------------------
// exports.getUserOrders = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.userId)
//     if(user) {
//       const orders = await Order.find({ user: user._id })
//       res.json(orders)
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
  
//   //CREATE USER ORDER-----------------------------------------------
//   exports.updateUserOrders = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.userId)
//     if(user) {
//       user.orders = req.body.orders
//       const updatedUser = await user.save()
//       res.json(updatedUser)
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
  
//   //DELETE USER ORDERS-----------------------------------------------
//   exports.deleteUserOrders = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.userId)
//     if(user) {
//       user.orders = []
//       const updatedUser = await user.save()
//       res.json(updatedUser)
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
  
//   //GET USER ORDER BY ID-----------------------------------------------
//   exports.getUserOrderById = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.userId)
//     if(user) {
//       const order = user.orders.find(order => order._id.toString() === req.params.id)
//       if(order) {
//         res.json(order)
//       } else {
//         res.status(404)
//         throw new Error('Order not found')
//       }
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
  
//   //UPDATE USER ORDER BY ID-----------------------------------------------
//   exports.updateUserOrderById = asyncHandler(async (req, res) => {
//     const user =
//       await User.findById(req.userId)
//     if(user) {
//       const order = user.orders.find(order => order._id.toString() === req.params.id)
//       if(order) {
//         order.products = req.body.products || order.products
//         const updatedUser = await user.save()
//         res.json(updatedUser)
//       } else {
//         res.status(404)
//         throw new Error('Order not found')
//       }
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
  
//   //DELETE USER ORDER BY ID-----------------------------------------------
//   exports.deleteUserOrderById = asyncHandler(async (req, res) => {
//     const user =
//       await User.findById(req.userId)
//     if(user) {
//       user.orders = user.orders.filter(order => order._id.toString() !== req.params.id)
//       const updatedUser = await user.save()
//       res.json(updatedUser)
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   });