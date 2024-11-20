import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

// Register a new user
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
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
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
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

export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
    profilePicture: user.profilePicture
  });
});

export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
    profilePicture: updatedUser.profilePicture
  });
});


// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get user by ID
// Removed duplicate declaration of getUserById
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
export const deleteUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.userId)

  if(user) {
    await user.deleteOne()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//GET ALL USERS-----------------------------------------------
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({})
  res.json(users)
})

//GET USER BY ID-----------------------------------------------
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//UPDATE USER-----------------------------------------------
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (req.body.password) {
      user.passwordHash = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//DELETE USER-----------------------------------------------
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
