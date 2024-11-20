import { Router } from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);

export default router;