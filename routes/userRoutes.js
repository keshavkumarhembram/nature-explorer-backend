const express = require("express");
// const multer = require('multer');
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

// const upload = multer({ dest: 'public/image/users'});

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// TEST THIS ROUTE
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

// ADDING authController.protect TO MIDDLEWARE STACK TO PROTECT ALL ROUTES BELOW IT
router.use(authController.protect);

router.patch(
  "/update-password",
  authController.updatePassword
);

router.get(
  "/me",
  userController.getMe,
  userController.getUser
);
router.patch("/update-me",  userController.uploadUserPhoto,userController.resizeUserPhoto, userController.updateMe);
router.delete("/delete-me", userController.deleteMe);

router.use(authController.restrictTo('admin'));
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
