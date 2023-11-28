const { Product } = require("../model");

async function createProduct(req, res) {
  try {
    if (
      !req.body.productName ||
      !req.body.productCategory ||
      !req.body.productImage ||
      !req.body.productAmount ||
      !req.body.stock
    ) {
      return res.status(400).json({
        message: "necessary details missing",
      });
    }
    let productExists = await Product.findOne({
      productName: req.body.productName,
    });
    if (productExists) {
      return res.status(400).json({
        message: "product already exists",
      });
    }
    let product = new Product(req.body);
    await product.save();
    res.status(200).json({
      message: "product successfully created",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
}

const fetchProductById = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    res.status(200).json({
      status: "product fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: "all product fetched",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const updateById = async (req, res) => {
  try {
    let newProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json({
      status: "successfully updated",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    let product = await Product.deleteOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    res.status(200).json({
      message: "product deleted",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  createProduct,
  fetchProductById,
  fetchAllProduct,
  updateById,
  deleteById,
};

// duplication check
// user module
// product/user does not exist
