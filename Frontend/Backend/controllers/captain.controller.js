const CaptainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

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

// module.exports.loginCaptain = async (req, res) => {
//   try {
//     // 1️⃣ Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     // 2️⃣ Find captain by email
//     const captain = await CaptainModel.findOne({ email }).select("+password");
//     if (!captain) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // 3️⃣ Verify password
//     const isPasswordValid = await captain.comparePassword(password);


//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // 4️⃣ Generate token
//     const token = captain.generateAuthToken();

//     // 5️⃣ Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     // 6️⃣ Send response
//     res.status(200).json({
//       success: true,
//       token,
//       captain,
//     });

//   } catch (error) {
//     console.error("Login Captain Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      token,
      captain,
    });
  } catch (error) {
    console.error("Login Captain Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}
module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await blacklistTokenModel.create({ token: token }); 
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}