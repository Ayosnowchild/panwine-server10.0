const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  productCategoty: String,
  productImage: String,
  productAmount: Number,
  stock: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
