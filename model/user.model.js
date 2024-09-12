const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("blogs", {
  ref: "Blog",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", function () {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

userSchema.method("checkPassword", function (password) {
  let valid = bcrypt.compareSync(password, this.password);
  return valid;
});

userSchema.method("generateToken", function () {
  const token = JWT.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { issuer: "http://localhost:6969", expiresIn: "4H" }
  );
  return token;
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
