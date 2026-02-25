const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;

            return {
                lat: location.lat,
                lng: location.lng
            };

        } else {
            throw new Error("Unable to fetch coordinates");
        }

    } catch (error) {
        console.error("Google Maps Error:", error.message);
        throw error;
    }
};
module.exports.getDistanceTime = async (pickup, destination) => {
    if (pickup === destination) {
        throw new Error("Pickup and destination cannot be the same");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {

            const element = response.data.rows[0].elements[0];

            if (element.status === "ZERO_RESULTS") {
                throw new Error("No route found between the specified locations");
            }

            // ✅ Return distance & duration
            return {
                distance: element.distance,
                duration: element.duration
            };

        } else {
            throw new Error("Unable to fetch distance and time from Google API");
        }

    } catch (error) {
        console.error("Google Maps Distance Matrix Error:", error.message);
        throw error;
    }
};

module.exports.getAutocompleteSuggestions = async (input) => {
    if (!input || input.trim() === "") {
        throw new Error("Input cannot be empty");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=geocode&components=country:in&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {

            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                placeId: prediction.place_id
            }));

        } else if (response.data.status === "ZERO_RESULTS") {
            return []; // No suggestions found
        } else {
            throw new Error(response.data.error_message || "Unable to fetch autocomplete suggestions");
        }

    } catch (error) {
        console.error("Google Places Autocomplete Error:", error.message);
        throw new Error("Failed to fetch autocomplete suggestions");
    }
};