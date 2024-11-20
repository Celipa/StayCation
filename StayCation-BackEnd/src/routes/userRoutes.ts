import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserProfile, getUserById, deleteUserProfile } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/', getAllUsers);
router.put('/profile', updateUserProfile);
router.get('/:id', getUserById);
router.delete('/profile', deleteUserProfile);

export default router;