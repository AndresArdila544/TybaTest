const router = require("express").Router();
const TransactionController = require("./TransactionController");
const isAuth = require("../Auth/IsAuth");

router.get(
  "/",
  [isAuth.check],
  TransactionController.getAllTransactions
);

module.exports = router;
