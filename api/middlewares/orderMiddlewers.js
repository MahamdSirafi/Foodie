const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.checkMony = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.paid == false) return next(new AppError('you dont paid', 400));
  next();
});
