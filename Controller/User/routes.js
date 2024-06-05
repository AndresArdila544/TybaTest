const router = require("express").Router();

// Middleware Imports
const isAuth = require("../Auth/IsAuth");

// Controller Imports
const UserController = require("./UserController");

router.get("/", [isAuth.check], UserController.getUser);

router.patch(
  "/",
  [
    isAuth.check
  ],
  UserController.updateUser
);

router.get(
  "/all",
  [isAuth.check],
  UserController.getAllUsers
);

router.delete(
  "/:userId",
  [isAuth.check],
  UserController.deleteUser
);

module.exports = router;
