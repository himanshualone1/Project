const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true, minlength: 3 },
      lastname: { type: String, minlength: 3 },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
  },
  { timestamps: true }
);

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Hash password
userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
