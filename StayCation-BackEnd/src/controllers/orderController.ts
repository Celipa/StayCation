import { Request, Response } from 'express';
import Order from '../models/orderModel';

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { user, products, totalPrice } = req.body;

  try {
    const order = new Order({
      user,
      products,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get an order by id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update an order by id
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { user, products, totalPrice } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.user = user || order.user;
    order.products = products || order.products;
    order.totalPrice = totalPrice || order.totalPrice;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};