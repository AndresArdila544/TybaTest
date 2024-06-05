const router = require("express").Router();

// Controller Imports
const PlacesController = require("./PlacesController");
const isAuth = require("../Auth/IsAuth");

router.get(
  "/",
  [isAuth.check],
  PlacesController.getRestaurants
);

module.exports = router;
