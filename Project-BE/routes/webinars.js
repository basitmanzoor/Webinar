const express = require("express");
const router = express.Router();
const webinarsController = require("../controllers/webinarsController");
const authController = require("./../controllers/authController");

router
  .route("/getpastwebinars")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    webinarsController.getpastwebinars
  );
router
  .route("/getallwebinars")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    webinarsController.getallwebinars
  );

router
  .route("/getupcommingwebinars")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    webinarsController.getupcommingwebinars
  );

router
  .route("/ongoingwebinars")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    webinarsController.ongoingwebinars
  );

router
  .route("/createWebinar")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    webinarsController.createWebinar
  );

router
  .route("/getattendedWebinars")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    webinarsController.getattendedWebinars
  );

router
  .route("/registeredWebinars")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    webinarsController.registeredWebinars
  );
router
  .route("/attendWebinar/:id")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    webinarsController.attendWebinar
  );

router
  .route("/registerWebinar/:id")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    webinarsController.registerWebinar
  );
router
  .route("/watchwebinar/:id")
  .get(
    authController.protect,
    authController.restrictTo("user"),
    webinarsController.watchwebinar
  );
router
  .route("/getRegisteredUsers/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    webinarsController.getRegisteredUsers
  );
module.exports = router;
