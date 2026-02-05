const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const CaptainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {

    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }
        const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
        }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();

    }catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}   

// module.exports.authcaptain = async (req, res, next) => {
//     const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized. No token provided.' });
//     }
//         const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
//         if (isBlacklisted) {
//             return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
//         }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);
//         req.captain = user;
//         return next();  
//     }catch (error) {
//         return res.status(401).json({ message: 'Invalid token.' });
//     }   

// }
// module.exports.authcaptain = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized. No token provided.' });
//     }

//     const isBlacklisted = await blacklistTokenModel.findOne({ token });
//     if (isBlacklisted) {
//         return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const captain = await CaptainModel.findById(decoded._id);

//         if (!captain) {
//             return res.status(401).json({ message: 'Captain not found.' });
//         }

//         req.captain = captain;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token.' });
//     }
// };

module.exports.authCaptain = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token expired" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await CaptainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: "Captain not found" });
        }

        req.captain = captain;
        next();
    } catch (error) {
        console.error("Auth Captain Error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

