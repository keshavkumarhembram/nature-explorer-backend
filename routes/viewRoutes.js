const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).render('base', {
      // These are call locals -> these can be accessed in template
      tour: "The Forest Hiker"
    });
  })
  

router.get('/overview', viewController.getOverview);
  

router.get('/tour/:slug', viewController.getTour);

module.exports = router;