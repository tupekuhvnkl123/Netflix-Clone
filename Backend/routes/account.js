//// Packages
const express = require("express");
const router = express.Router();

//// Controllers
const accountControllers = require("../controllers/account");

//// Middleware
const checkAuth = require("../middleware/check-auth");

//# Checking authentication
router.use(checkAuth);

////Auth Not Required Routes
router.delete("/deleteAccount", accountControllers.deleteAccount);

module.exports = router;
