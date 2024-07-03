const express = require('express');
const tourSpecialController = require('./../controllers/tourSpecialController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/:slug',authController.isLoggedIn, tourSpecialController.getTour);

module.exports = router;