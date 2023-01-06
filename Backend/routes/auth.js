//// Packages
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//// Controllers
const authControllers = require("../controllers/auth");

////Auth Not Required Routes
router.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("Please enter your email."),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Please enter your password."),
  ],
  authControllers.login
);

router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Please enter name."),
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Your password must contain between 6 and 60 characters."),
  ],
  authControllers.register
);

module.exports = router;
