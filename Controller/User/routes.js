const router = require("express").Router();
const isAuth = require("../Auth/IsAuth");
const UserController = require("./UserController");

router.get("/:userId", [isAuth.check], UserController.getUser);

router.patch(
  "/",
  [
    isAuth.check
  ],
  UserController.updateUser
);

router.get(
  "/",
  [isAuth.check],
  UserController.getAllUsers
);

router.delete(
  "/:userId",
  [isAuth.check],
  UserController.deleteUser
);

module.exports = router;
