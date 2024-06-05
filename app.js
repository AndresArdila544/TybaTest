const express = require("express");

const app = express ();

const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || 3000;

const UserModel = require("./Model/User/User");
const TransactionModel = require("./Model/Transactions/Transaction")

const AuthRoutes = require("./Controller/Auth/routes");
const UserRoutes = require("./Controller/User/routes");
const TransactionRoutes = require("./Controller/Transactions/routes")
const PlacesRoutes = require("./Controller/Places/routes")

app.use(express.json());

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/data.db", 
  });
const { initialiseTransaction } = require('./Controller/Transactions/TransactionController');
UserModel.initialise(sequelize);
TransactionModel.initialiseTransactionModel(sequelize);
initialiseTransaction(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthRoutes);
    app.use("/user", UserRoutes);
    app.use("/transactions",TransactionRoutes)
    app.use("/places", PlacesRoutes)

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

