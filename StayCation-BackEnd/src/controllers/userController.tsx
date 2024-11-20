const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found!');
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    profilePicture: user.profilePicture
  });
});

// Update user profile
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found!');
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;

  if (req.body.email) {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
      res.status(400);
      throw new Error('The email address is already taken');
    }
    user.email = req.body.email;
  }

  if (req.body.password) {
    user.passwordHash = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.profilePicture) {
    user.profilePicture = req.body.profilePicture;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    displayName: updatedUser.displayName,
    profilePicture: updatedUser.profilePicture
  });
});

// Delete user profile
exports.deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// exports.updateUserProfile = asyncHandler(async (req, res) => {

//   const user = await User.findById(req.userId)
//   if(!user) {
//     res.status(404)
//     throw new Error('User not found!')
//   }

//   user.firstName = req.body.firstName || user.firstName
//   user.lastName = req.body.lastName || user.lastName

//   if(req.body.email) {

//     const userExists = await User.exists({ email: req.body.email })
//     if(userExists) {
//       res.status(400)
//       throw new Error('The email address is already taken')
//     }

//     user.email = req.body.email
//   }

//   if(req.body.password) {
//     user.passwordHash = await bcrypt.hash(req.body.password, 10);
//   }

//   const updatedUser = await user.save()

//   res.status(200).json({
//     _id: updatedUser._id,
//     firstName: updatedUser.firstName,
//     lastName: updatedUser.lastName,
//     email: updatedUser.email,
//     displayName: updatedUser.displayName
//   })
// })

//DELETE USER PROFILE-----------------------------------------------
exports.deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)

  if(user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//GET ALL USERS-----------------------------------------------
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//GET USER BY ID-----------------------------------------------
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//UPDATE USER-----------------------------------------------
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.displayName = req.body.displayName || user.displayName
    if(req.body.password) {
      user.passwordHash = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      displayName: updatedUser.displayName
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//DELETE USER-----------------------------------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
