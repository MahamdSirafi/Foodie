const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'A cart must have a Product'],
        },
        quantity: { type: Number, default: 1 },
        price: {
          type: Number,
          required: [true, 'A cart must have a price'],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A order must have a user'],
    },
    location: {
      address: {
        type: String,
        required: [true, ' location  must have a  zipcode.'],
      },
      region: {
        type: String,
        required: [true, ' location  must have a   region.'],
      },
    },
    phone: {
      type: String,
      required: [true, ' order  must have a   number phone.'],
    },
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
    dilivary_price: {
      type: Number,
      required: [true, 'A order must have a  dilivary price'],
    },
    delivery: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['Preparing', 'Out For Delivery', 'Completed'],
      default: 'Preparing',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'A order must have a Duration'],
    },
    paidstatus: {
      type: String,
      required: true,
      enum: ['cash', 'bank'],
      default: 'cash',
    },
  },
  { timestamps: true, versionKey: false }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
