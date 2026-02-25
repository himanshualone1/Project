const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  try {
    // 1️⃣ Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // 2️⃣ Get authenticated user (from JWT middleware)
    const userId = req.user._id;

    const { pickup, destination, vehicleType } = req.body;

    // 3️⃣ Create Ride
    const ride = await rideService.createRide({
      userId,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: ride,
    });
  } catch (error) {
    console.error("Create Ride Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getfare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

  const { pickup, destination } = req.query;
  try{
    const fare =await rideService.getFare(pickup,destination);
    return res.status(200).json({
      success: true,
      fare
    });
    
  }catch(error){
    return res.status(500).json({message: error.message});
  }
}