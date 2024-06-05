const { initialiseTransactionModel } = require('../../Model/Transactions/Transaction');
const { findAllTransactions } = require('../../Model/Transactions/Transaction');

let TransactionModel; // Define TransactionModel variable

// Initialize the TransactionModel with the Sequelize instance
const initialiseTransaction = (sequelize) => {
  TransactionModel = initialiseTransactionModel(sequelize);
};

async function createTransactionLog(transactionType, user,description) {
    try {
      // Create a new transaction log record in the database
      console.log(transactionType);
      console.log(user);
      console.log(description);
  
      const transactionlog = await TransactionModel.create({
        transactionType,
        user,
        description
      });
  
      console.log('Transaction log created:', transactionlog.toJSON());
    } catch (error) {
      console.error('Error creating transaction log:', error);
    }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await TransactionModel.findAll({
      where: req.query
    });
    await createTransactionLog("GETTRANSACIONS", "ALL_USERS", "OK");
    console.log("GETALLTRANS");
    return res.status(200).json({
      status: true,
      data: transactions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: err,
    });
  }
}
  
module.exports = {
  initialiseTransaction, // Export the function to initialize the TransactionModel
  createTransactionLog,
  getAllTransactions
};