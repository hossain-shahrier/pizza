const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create model
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, required: true, default: "customer" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
