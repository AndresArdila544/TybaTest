const sinon = require('sinon');
const TransactionController = require('../Controller/Transactions/TransactionController');
const TransactionModel = require('../Model/Transactions/Transaction');

describe('TransactionController', () => {
    describe('initialiseTransaction', () => {
        it('should initialise TransactionModel', () => {
          const sequelize = {}; 
          const initialiseTransactionModelStub = sinon.stub().returns({}); 
    
          sinon.stub(TransactionModel, 'initialiseTransactionModel').callsFake(initialiseTransactionModelStub);
    
          TransactionController.initialiseTransaction(sequelize);
    
          sinon.assert.calledOnceWithExactly(initialiseTransactionModelStub, sequelize);
    
          TransactionModel.initialiseTransactionModel.restore();
        });
      });

  describe('createTransactionLog', () => {
    it('should create a transaction log', async () => {
      
      const transactionType = 'GET';
      const user = 'testuser';
      const description = 'OK';

      const createStub = sinon.stub().resolves({ toJSON: sinon.stub().returns({}) });
      const TransactionModelMock = { create: createStub };

      await TransactionController.createTransactionLog(transactionType, user, description);

      sinon.assert.calledOnceWithExactly(createStub, { transactionType, user, description });
    });
  });

  describe('getAllTransactions', () => {
    it('should get all transactions', async () => {
      const req = { query: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      const findAllStub = sinon.stub().resolves([]);
      const TransactionModelMock = { findAll: findAllStub };

      await TransactionController.getAllTransactions(req, res);

      sinon.assert.calledOnceWithExactly(findAllStub, { where: {} });
      sinon.assert.calledOnceWithExactly(TransactionController.createTransactionLog, 'GETTRANSACIONS', 'ALL_USERS', 'OK');
    });

    it('should handle errors', async () => {
      const req = { query: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      const error = new Error('Internal server error');
      const findAllStub = sinon.stub().rejects(error);
      const TransactionModelMock = { findAll: findAllStub };

      await TransactionController.getAllTransactions(req, res);

      sinon.assert.calledOnceWithExactly(findAllStub, { where: {} });
      sinon.assert.calledOnceWithExactly(TransactionController.createTransactionLog, 'GETTRANSACIONS', 'ALL_USERS', 'OK');
      sinon.assert.calledOnceWithExactly(res.status, 500);
      sinon.assert.calledOnceWithExactly(res.json, { status: false, error: 'Internal server error' });
    });
  });
});
