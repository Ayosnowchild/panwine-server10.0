const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  address: String,
  country: String,
});

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = { Shipping };

// middlewares
