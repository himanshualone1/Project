const UserModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

    const { fullname, email, password } = req.body;

    // Hash password
    const hashedPassword = await UserModel.hashPassword(password);

    // Register user
    const user = await userService.registerUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = user.generateAuthToken();

    // Exclude password from response
    const { password: pwd, ...userData } = user.toObject();

    res.status(201).json({ message: "User registered", user: userData, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser };
