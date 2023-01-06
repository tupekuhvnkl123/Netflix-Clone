//// Packages
require("dotenv").config();

//// Models
const HttpError = require("../models/http-error");
const User = require("../models/user");

exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return next(
        new HttpError("Could not find user for the provided id", 404)
      );
    }

    await user.remove();

    res.status(200).json({ message: "Your user deleted!" });
  } catch (err) {
    return next(
      new HttpError("Deleting your user failed, please try again."),
      500
    );
  }
};
