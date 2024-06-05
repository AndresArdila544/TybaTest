//Authentication check middleware: Checks if user is authenticated

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");


const blacklistedTokens = [];

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Invalid auth mechanism or auth headers not provided in the request.'
        }
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Bearer token missing in the authorization headers.'
        }
      });
    }

    // Check if the token is in the blacklist
    if (blacklistedTokens.includes(token)) {
      return res.status(403).json({
        status: false,
        error: 'Access token has been invalidated. Please login again.'
      });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          error: 'Invalid access token provided, please login again.'
        });
      }

      req.user = user; // Save the user object for further use
      next();
    });
  },

  // Function to invalidate a token
  invalidateToken: (token) => {
    blacklistedTokens.push(token);
  }
};
