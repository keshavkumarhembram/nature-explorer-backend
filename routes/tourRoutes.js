const express = require("express");
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");
// const reviewController = require("./../controllers/reviewController");
const reviewRouter = require("./../routes/reviewRoutes");
const router = express.Router();

// router.param('id', tourController.checkID);

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", 'guide'),
    tourController.getMonthlyPlan
  );

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
// /tours-within/233/center/-40,45/unit/mi
///tours-within/:distance/center/:latlng/unit/:unit

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

  // query.explain();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

// TEST THIS ROUTE
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

// router
//   .route("./:tourId/reviews")
//   .post(
//     authController.protect,
//     authController.restrictTo("user"),
//     reviewController.createReview
//   );

module.exports = router;
