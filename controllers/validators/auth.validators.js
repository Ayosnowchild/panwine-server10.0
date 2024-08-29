const JWT = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
  try {
    const longToken = req.headers.authorization;
    if (!longToken) {
      return res.status(400).json({ message: "token not present" });
    }
    const token = longToken.split(" ")[1];
    let user = JWT.verify(token, process.env.JWT_SECRET);
    if (req.params.id != user) {
      return res.status(400).json({ message: "token does not match user" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = { isTokenValid };
