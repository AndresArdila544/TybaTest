const router = require("express").Router();

// Controller Imports
const AuthController = require("./AuthController");

router.post(
  "/signup",
  AuthController.register
);

router.post(
  "/login",
  AuthController.login
);
router.post(
  "/logout",
  AuthController.logout
);

module.exports = router;
