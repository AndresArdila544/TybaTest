//Authentication Controller: Generates an Access Token, REGISTER, LOGIN, LOGOUT

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../../Model/User/User");

const { jwtSecret, jwtExpirationInSeconds } = require("../../config");

const { createTransactionLog } = require("../Transactions/TransactionController");

const { invalidateToken } = require('./IsAuth');

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

const encryptPassword = (password) => {

  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

module.exports = {
  register: async (req, res) => {
    try {
      const payload = req.body;

      let encryptedPassword = encryptPassword(payload.password);

      const existingUser = await UserModel.findUser({ username: payload.username });
      if (existingUser) {
        await createTransactionLog("REGISTER",  payload.username,"ERROR: User already exists");
        return res.status(400).json({
          status: false,
          error: {
            message: `User already exists.`,
          },
        });
      }

      const user = await UserModel.createUser(
        Object.assign(payload, { password: encryptedPassword })
      );

      const accessToken = generateAccessToken(payload.username, user.id);

      // Creating a transaction log
      await createTransactionLog("REGISTER", payload.username, "OK");

      return res.status(200).json({
        status: true,
        data: {
          user: user.toJSON(),
          token: accessToken,
        },
      });
    } catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({
        status: false,
        error: err,
      });
    }
  },

  login: async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findUser({ username });

        if (!user) {
            await createTransactionLog("LOGIN", username,"Could not find any user with username");
            return res.status(400).json({
                status: false,
                error: {
                    message: `Could not find any user with username: \`${username}\`.`,
                },
            });
        }

        const encryptedPassword = encryptPassword(password);

        if (user.password !== encryptedPassword) {
            await createTransactionLog("LOGIN", username,"ERROR: Provided username and password did not match.");
            return res.status(400).json({
                status: false,
                error: {
                    message: `Provided username and password did not match.`,
                },
            });
        }

        const accessToken = generateAccessToken(user.username, user.id);

        // Creating a transaction log
        await createTransactionLog("LOGIN", username,"OK");

        return res.status(200).json({
            status: true,
            data: {
                user: user.toJSON(),
                token: accessToken,
            },
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err,
        });
    }
},
  logout: async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(200).json({
          status: true,
          message: "Logout successful",
        });
      }
  
      const token = authHeader.split(' ')[1];
  
      invalidateToken(token);
  
      return res.status(200).json({
        status: true,
        message: "Logout successful",
      });
    } catch (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({
        status: false,
        error: "Internal server error",
      });
    }
  },
};
