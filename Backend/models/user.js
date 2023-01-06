const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  list: [{ type: String, default: [] }],
});

module.exports = mongoose.model("User", userSchema);
