const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const factory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllOrder = factory.getAllpop1(
  Order,
  {
    path: 'user',
    select: 'name  ',
  },
  {
    path: 'cart.product',
    select: 'name price ',
  }
);
exports.getOrder = factory.getOne(
  Order,
  {
    path: 'user',
    select: 'name ',
  },
  {
    path: 'cart.product',
    select: 'name price ',
  }
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = factory.createOne(Order);
