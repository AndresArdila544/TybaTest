const sinon = require('sinon');
const UserController = require('../Controller/User/UserController');
const UserModel = require('../Model/User/User');

describe('UserController', () => {
  describe('getUser', () => {
    it('should return user data when user ID exists', async () => {
      const req = { params: { userId: 7 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const findUserStub = sinon.stub(UserModel, 'findUser').resolves({ username: 'testuser', password: 'password' });

      await UserController.getUser(req, res);

      sinon.assert.calledOnceWithExactly(findUserStub, { id: 7 });
      sinon.assert.calledWithExactly(res.status, 200);
      sinon.assert.calledWithExactly(res.json, { status: true, data: { username: 'testuser', password: 'password' } });

      findUserStub.restore();
    });

    it('should handle errors when user ID does not exist', async () => {
      const req = { params: { userId: 100 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const error = new Error('User not found');
      const findUserStub = sinon.stub(UserModel, 'findUser').rejects(error);

      await UserController.getUser(req, res);

      sinon.assert.calledOnceWithExactly(findUserStub, { id: 100 });
      sinon.assert.calledWithExactly(res.status, 500);
      sinon.assert.calledWithExactly(res.json, { status: false, error });

      findUserStub.restore();
    });
  });

  describe('updateUser', () => {
    it('should update user data and return updated user', async () => {
      const req = { params: { userId: 8 }, body: { username: 'testuser1', password: 'newpassword'  } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const updateUserStub = sinon.stub(UserModel, 'updateUser').resolves({username: 'testuser1', password: 'newpassword'  });
      const findUserStub = sinon.stub(UserModel, 'findUser').resolves({username: 'testuser1', password: 'newpassword'  });

      await UserController.updateUser(req, res);

      sinon.assert.calledOnceWithExactly(updateUserStub, { id: 8 }, { username: 'testuser1', password: 'newpassword'  });
      sinon.assert.calledOnceWithExactly(findUserStub, { id: 8});
      sinon.assert.calledWithExactly(res.status, 200);
      sinon.assert.calledWithExactly(res.json, { status: true, data: {username: 'testuser1', password: 'newpassword'  } });

      updateUserStub.restore();
      findUserStub.restore();
    });

    it('should handle empty request body', async () => {
      const req = { user: { userId: 1 }, body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await UserController.updateUser(req, res);

      sinon.assert.notCalled(UserModel.updateUser);
      sinon.assert.calledWithExactly(res.status, 400);
      sinon.assert.calledWithExactly(res.json, { status: false, error: { message: 'Body is empty.' } });
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return success message', async () => {
      const req = { params: { userId: 1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const deleteUserStub = sinon.stub(UserModel, 'deleteUser').resolves(1);

      await UserController.deleteUser(req, res);

      sinon.assert.calledOnceWithExactly(deleteUserStub, { id: 1 });
      sinon.assert.calledWithExactly(res.status, 200);
      sinon.assert.calledWithExactly(res.json, { status: true, data: { numberOfUsersDeleted: 1 } });

      deleteUserStub.restore();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const req = { query: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      const findAllUsersStub = sinon.stub(UserModel, 'findAllUsers').resolves(users);

      await UserController.getAllUsers(req, res);

      sinon.assert.calledOnceWithExactly(findAllUsersStub, {});
      sinon.assert.calledWithExactly(res.status, 200);
      sinon.assert.calledWithExactly(res.json, { status: true, data: users });

      findAllUsersStub.restore();
    });
  });
});
