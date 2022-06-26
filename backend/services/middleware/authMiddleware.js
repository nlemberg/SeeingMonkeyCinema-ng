const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header (format: Bearer <token>)
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || require("../config/keys").JWT_SECRET
      );

      // get employee from token
      req.employee = await Employee.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
});

module.exports = { auth };
