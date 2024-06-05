const router = require("express").Router();
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
