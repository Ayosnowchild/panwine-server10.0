const { Shipping } = require("../model");

async function CreateShipping(req, res) {
  try {
    if (
      !req.body.fullName ||
      !req.body.phone ||
      !req.body.address ||
      !req.body.country
    ) {
      return res.status(400).json({
        message: "necessary details missing",
      });
    }
    let shipping = new Shipping(req.body);
    await shipping.save();
    res.status(200).json({
      message: " successfully created",
      data: shipping,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
}

module.exports = { CreateShipping };
