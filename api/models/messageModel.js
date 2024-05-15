const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema(
  {
    message: {
      required: [true, 'must enter message'],
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
