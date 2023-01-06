//// Packages
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//// Models
const HttpError = require("../models/http-error");
const User = require("../models/user");

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check you data.", 422)
    );
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("Email doesn't exist.", 403));
    }

    const passwordIsEqual = await bcrypt.compare(password, user.password);
    if (!passwordIsEqual) {
      return next(new HttpError("Wrong password, try again", 403));
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "3h" }
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      list: user.list,
    };

    res.json({
      message: "Logged in successfully!",
      accessToken,
      userData,
    });
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again", 401));
  }
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check you data.", 422)
    );
  }

  const { name, email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email: email.toLowerCase() });
    if (emailExist) {
      return next(new HttpError("Email already exist", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    await createdUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    return next(
      new HttpError("Registering failed, please try again later", 500)
    );
  }
};
