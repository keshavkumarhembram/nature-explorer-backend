const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/:slug',authController.isLoggedIn, viewController.getTour);

module.exports = router;