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
const session = require("express-session");
const passport = require("passport");
const { User } = require("./model/user.model.js");
const { isTokenValid } = require("./controllers/validators/auth.validators.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("./passport.js");

const PORT = 6969;
server.use(
  session({
    secret: process.env.SESSION_SECRET, // session secret
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());

// middleware to read formdata/urlencoded reqbody
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
server.get(
  "/auth/google-redirect",
  passport.authenticate("google", {
    access_type: "offline",
    scope: ["email", "profile"],
  }),
  async (req, res) => {
    if (!req.user) {
      res.status(400).json({ error: "Authentication failed" });
    }
    console.log(req.user);
    const userExists = await User.findOne({ email: req.user.emails[0].value });
    if (userExists) {
      const passwordMatch = userExists.checkPassword(
        req.user.id.concat("$Google")
      );
      if (passwordMatch) {
        let token = userExists.generateToken();
        res.status(201).json({
          message: "login successful",
          user: userExists,
          token,
        });
      } else {
        res.status(400).json({ message: "wrong credentials" });
      }
    } else {
      const googleUser = new User({
        fullname: req.user.displayName,
        email: req.user.emails[0].value,
        password: req.user.id.concat("$Google"),
        phone: req.user.id,
      });
      const token = googleUser.generateToken();
      await googleUser.save();
      res
        .status(201)
        .json({ message: "signup successful", user: googleUser, token });
    }
  }
);

server.get("/user/profile/:id", isTokenValid, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ mesaage: "user fetched", user });
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

server.all("/", (req, res) => {
  try {
    res.status(200).send({
      message: "welcome",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
});

server.all("*", (req, res) => {
  try {
    res.status(404).send({
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
