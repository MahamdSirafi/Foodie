const Message = require("../models/messageModel");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.getmessage = handlerFactory.getOne(Message);
exports.createmessage = handlerFactory.createOne(Message);
exports.updatemessage = handlerFactory.updateOne(Message);
exports.deletemessage = handlerFactory.deleteOne(Message);
exports.getAllmessage = handlerFactory.getAll(Message);
exports.defult = catchAsync(async (req, res, next) => {
  //write your code here
  const doc = []
  if (!doc) {
    return (new AppError("Message Error", 400))
  }
  res.status(200).json({
    status: "success",
    doc,
  });
});
