const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config/config");
const { JsonWebTokenError } = require("../utlis/app-error.js");

const generateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};
const authentication = async (req, res, next) => {
  try {
    const signature = req.get("Authorization");

    if (!signature) {
      throw new JsonWebTokenError("JWT must be provided");
    }
    if (!signature.startsWith("Bearer ")) {
      console.error("Invalid Authorization format:", signature);
      throw new JsonWebTokenError("JWT must be in 'Bearer <token>' format");
    }
    const token = signature.split(" ")[1];
    const payload = await jwt.verify(token, APP_SECRET);

    req.user = payload; // Store user info for further use
    return next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return next(new JsonWebTokenError("Invalid or Expired JWT"));
  }
};

module.exports = { authentication, generateSignature };
