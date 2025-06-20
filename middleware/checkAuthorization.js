import jwt from "jsonwebtoken";
import { jwtsecretKey } from "../utils/generateToken.js";
import { UserModel } from "../models/userModel.js";

export const checkAuthorization = async (req, res, next) => {
  try {
    const token = req?.body?.token;
    const decoded = await jwt.verify(token, jwtsecretKey);

    if (!decoded.id) {
      return res.json({
        success: false,
        message: "You are unauthorized",
      });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid user or User not found!",
      });
    }

    req.User = user;

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
