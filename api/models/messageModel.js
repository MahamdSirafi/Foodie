const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  message: {
    required: [true, 'must enter message'],
    type: String,
  },
  user: {
    required: [true, 'must enter user'],
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

}, {
  timestamps: true,
  versionKey: false
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
