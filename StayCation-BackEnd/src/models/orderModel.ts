import { Schema, Document, model } from 'mongoose';

interface IProduct {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: IProduct[];
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;