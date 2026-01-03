const CaptainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");

module.exports.registerCaptain = async (req, res) => {
  try {
    // 1️⃣ Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2️⃣ Correct destructuring ✅
    const { fullname, email, password, vehicle, location } = req.body;

    // 3️⃣ Check existing captain
    const isCaptainAlready = await CaptainModel.findOne({ email });
    if (isCaptainAlready) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await CaptainModel.hashPassword(password);

    // 5️⃣ Create captain via service
    const captain = await captainService.createCaptain({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
      location,
    });

    // 6️⃣ Generate token
    const token = captain.generateAuthToken();

    return res.status(201).json({
      success: true,
      token,
      captain,
    });
  } catch (error) {
    console.error("Register Captain Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
