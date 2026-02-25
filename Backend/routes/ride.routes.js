const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const { authUser } = require('../middleware/auth.middleware');

router.post(
  '/create',
authUser,   // 🔐 Protect route

  body('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Pickup location is required'),

  body('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Dropoff location is required'),

  body('vehicleType')
    .isIn(['auto', 'car', 'moto'])
    .withMessage('Vehicle type must be auto, car, or moto'),

  rideController.createRide
);

router.get('/getfare', authUser,
   query('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Pickup location is required'),
  query('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Dropoff location is required'),
   rideController.getfare);


module.exports = router;