//// Packages
const jwt = require("jsonwebtoken");
require("dotenv").config();

//// Models
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpError("Authentication failed!", 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 401)); //? 401 status means not authenticated
  }
};
