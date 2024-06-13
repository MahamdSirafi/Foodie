const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    required: [true, 'must enter name'],
    type: String,
  },
  category: {
    required: [true, 'must enter category'],
    enum:["deserts","drinks","dinner","lunch","breakfast"],
    type: String,
  },
  image: {
    required: [true, 'must enter image'],
    type: String,
  },
  description: {
    required: [true, 'must enter description'],
    type: String,
  },
  quantity_available: {
    required: [true, 'must enter quantity_available'],
    type: Number,
  },
  total_quantity: {
    required: [true, 'must enter '],
    type: Number,
  },
  price: {
    required: [true, 'must enter price'],
    type: Number,
  },

}, {
  timestamps: true,
  versionKey: false
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
