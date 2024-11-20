import { Router } from 'express';
import { createMessage, getAllMessages } from '../controllers/messageController';

const router = Router();

router.post('/', createMessage);
router.get('/', getAllMessages);

export default router;