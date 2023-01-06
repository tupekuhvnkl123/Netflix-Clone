//// Packages
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//// Models
const HttpError = require("./models/http-error");

//// Routes
const moviesRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");

//// Dependents Middlewares
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  })
);

//// Routes Middlewares
app.use("/api/movies", moviesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("db connected");
  })
  .catch((error) => {
    console.log("Could not connect the db");
    throw error;
  });
