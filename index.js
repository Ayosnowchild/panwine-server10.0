const express = require("express");
const mongoose = require("mongoose");
const server = express();
const {
  createProduct,
  fetchProductById,
  fetchAllProduct,
  updateById,
  deleteById,
} = require("./controllers/product.controller");
const { CreateShipping } = require("./controllers/shipping.controller");

const PORT = 6969;

server.use(express.json());

// middleware to read formdata/urlencoded reqbody
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.get("/", (req, res) => {
  try {
    res.status(200).send({
      message: " welcome to panwine",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
});

server.post("/product", createProduct);

server.get("/product/:id", fetchProductById);

server.get("/product", fetchAllProduct);

server.put("/product/:id", updateById);

server.delete("/product/:id", deleteById);

server.post("/shipping", CreateShipping);

server.all("*", (req, res) => {
  try {
    res.status(200).send({
      message: "route does not exist",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
});
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/panwine10");
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
    console.log("issues" + err.message);
  }
});
