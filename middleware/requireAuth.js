const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Read token from cookies
    const token = req.cookies.Authorization;
    
    if (!token) {
      return res.status(401).json({
        message: "You are unauthorized. Please log in.",
      });
    }

    // Decode the token
    const decodedToken = jwt.verify(token, process.env.Secret);
    
    // Check token expiration
    if (Date.now() > decodedToken.exp) {
      return res.status(401).json({
        message: "Your login session has expired. Please log in again.",
      });
    }

    // Find user using decoded sub
    const user = await User.findById(decodedToken.sub);
    if (!user) {
      return res.status(401).json({
        message: "You are unauthorized. Please log in with a valid user.",
      });
    }

    // Attach user to request object
    req.user = user;
    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error in requireAuth middleware:", err);
    return res.status(500).json({
      message: "Internal server error. Unable to authenticate user.",
    });
  }
}

module.exports = requireAuth;
