//User Controller: GET, UPDATE, DELETE users

const UserModel = require("./../../Model/User/User");
const { createTransactionLog } = require("../Transactions/TransactionController");

module.exports = {
  getUser: async (req, res) => {
    try {
      const {
        params: { userId },
      } = req;
      console.log(userId);
      const user = await UserModel.findUser({ id: userId });
      console.log(user)
      await createTransactionLog("GET", userId, "OK");
      
      return res.status(200).json({
        status: true,
        data: user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        user: { userId },
        body: payload,
      } = req;
      
      if (!Object.keys(payload).length) {
        await createTransactionLog("UPDATE", "ALL_USERS", "ERROR: Body is empty.");
        return res.status(400).json({
          status: false,
          error: {
            message: "Body is empty.",
          },
        });
      }

      await UserModel.updateUser({ id: userId }, payload);
      const user = await UserModel.findUser({ id: userId });
      await createTransactionLog("UPDATE", user.username, "OK");

      return res.status(200).json({
        status: true,
        data: user.toJSON(),
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {
        params: { userId },
      } = req;

      await UserModel.deleteUser({ id: userId });
      await createTransactionLog("DELETE", userId, "OK");
  
      

      return res.status(200).json({
        status: true,
        data: {
          numberOfUsersDeleted: 1, 
        },
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.findAllUsers(req.query);
      //console.log(users)
      await createTransactionLog("GETALL", "ALL_USERS", "OK");

      return res.status(200).json({
        status: true,
        data: users,
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },
};
