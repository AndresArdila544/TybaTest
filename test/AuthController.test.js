const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../Model/User/User');
const AuthController = require('../Controller/Auth/AuthController');

describe('AuthController', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const req = { body: { username: 'testuser123', password: 'password' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const createUserStub = sinon.stub(UserModel, 'createUser').resolves({ toJSON: sinon.stub().returns({ id: 1 }) });
      const encryptPasswordStub = sinon.stub(AuthController, 'encryptPassword').returns('hashed_password');
      const generateAccessTokenStub = sinon.stub(jwt, 'sign').returns('dummy_token');

      await AuthController.register(req, res);

      sinon.assert.calledOnceWithExactly(createUserStub, { username: 'testuser123', password: sinon.match.string });
      sinon.assert.calledOnceWithExactly(encryptPasswordStub, 'password');
      sinon.assert.calledOnceWithExactly(generateAccessTokenStub, 'testuser123', 1);
      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, {
        status: true,
        data: { user: { id: 1, username: 'testuser', password: 'hashed_password' }, token: 'dummy_token' }
      });

      createUserStub.restore();
      generateAccessTokenStub.restore();
    });
  });

  describe('login', () => {
    it('should log in the user with valid credentials', async () => {
      const req = { body: { username: 'testuser', password: 'password' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const findUserStub = sinon.stub(UserModel, 'findUser').resolves({ toJSON: sinon.stub().returns({ username: 'testuser', password: 'hashed_password' }) });
      const encryptPasswordStub = sinon.stub(AuthController, 'encryptPassword').returns('hashed_password');
      const generateAccessTokenStub = sinon.stub(jwt, 'sign').returns('dummy_token');

      await AuthController.login(req, res);

      sinon.assert.calledOnceWithExactly(findUserStub, { username: 'testuser' });
      sinon.assert.calledOnceWithExactly(encryptPasswordStub, 'password');
      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, {
        status: true,
        data: { user: { username: 'testuser', password: 'hashed_password' }, token: 'dummy_token' }
      });

      findUserStub.restore();
      encryptPasswordStub.restore();
      generateAccessTokenStub.restore();
    });

    it('should return error for invalid credentials', async () => {
      const req = { body: { username: 'testuser', password: 'wrong_password' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const findUserStub = sinon.stub(UserModel, 'findUser').resolves(null);

      await AuthController.login(req, res);

      sinon.assert.calledOnceWithExactly(findUserStub, { username: 'testuser' });
      sinon.assert.calledOnceWithExactly(res.status, 400);
      sinon.assert.calledOnceWithExactly(res.json, {
        status: false,
        error: { message: 'Could not find any user with username: `testuser`.' }
      });

      findUserStub.restore();
    });
  });

  describe('logout', () => {
    it('should invalidate token and return success message', async () => {
      const req = { headers: { authorization: 'Bearer dummy_token' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const invalidateTokenStub = sinon.stub(AuthController, 'invalidateToken');
      const successResponse = { status: true, message: 'Logout successful' };

      await AuthController.logout(req, res);

      sinon.assert.calledOnceWithExactly(invalidateTokenStub, 'dummy_token');
      sinon.assert.calledOnceWithExactly(res.status, 200);
      sinon.assert.calledOnceWithExactly(res.json, successResponse);

      invalidateTokenStub.restore();
    });

    it('should return success message if no token provided', async () => {
      const req = { headers: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const successResponse = { status: true, message: 'Logout successful' };

      await AuthController.logout(req, res);

      sinon.assert.notCalled(res.status);
      sinon.assert.calledOnceWithExactly(res.json, successResponse);
    });
  });
});
