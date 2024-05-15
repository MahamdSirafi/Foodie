const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getproduct = handlerFactory.getOne(Product);
exports.createproduct = handlerFactory.createOne(Product);
exports.updateproduct = handlerFactory.updateOne(Product);
exports.deleteproduct = handlerFactory.deleteOne(Product);
exports.getAllproduct = handlerFactory.getAll(Product);

