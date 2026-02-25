const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    const coordinates = await mapService.getAddressCoordinate(address);

    return res.status(200).json(coordinates);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  try {
    // ✅ Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { pickup, destination } = req.query;

    // ✅ Extra safety check
    if (!pickup || !destination) {
      return res.status(400).json({
        success: false,
        message: "Pickup and destination are required"
      });
    }

    // ✅ Call service
    const distanceData = await mapService.getDistanceTime(pickup, destination);

    return res.status(200).json({
      success: true,
      data: distanceData
    });

  } catch (error) {
    console.error("Distance Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  } 
};

module.exports.getAutocompleteSuggestions = async (req, res) => {
  console.log("Controller Hit");

  try {
    const { input } = req.query;
    console.log("Input:", input);

    const suggestions = await mapService.getAutocompleteSuggestions(input);

    console.log("Suggestions received");

    return res.status(200).json({
      success: true,
      data: suggestions
    });

  } catch (error) {
    console.error("Autocomplete Controller Error:", error.message);
    return res.status(500).json({ success: false });
  }
};
// module.exports.getAutocompleteSuggestions = async (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }

//     const { input } = req.query;

//     const suggestions = await mapService.getAutocompleteSuggestions(input);

//     // ✅ SEND RESPONSE BACK
//     return res.status(200).json({
//       success: true,
//       data: suggestions
//     });

//   } catch (error) {
//     console.error("Autocomplete Controller Error:", error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error"
//     });
//   }
// };