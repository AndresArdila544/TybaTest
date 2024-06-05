const { Sequelize, DataTypes } = require("sequelize");

const TransactionModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const initialiseTransactionModel = (sequelize) => {
  return sequelize.define("Transaction", TransactionModel);
};

const findAllTransactions = (query) => {
  return TransactionModel.findAll({
    where: query
  });
};

module.exports = {
  initialiseTransactionModel,
  findAllTransactions
};
