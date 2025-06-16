import { json } from "express";
import { userModel } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const foundUser = await userModel.find({ email: reqBody.email });

    if (foundUser.length > 0) {
      return res.json({
        sucess: false,
        message: `user with email ${reqBody.email}already exist`,
      });
    }
    const newUser = await userModel.create(reqBody);

    return res.json({
      sucess: true,
      data: newUser,
      message: `Dear ${newUser.name},Welcome to LMS.`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserController = async (req, res) => {
  try {
    const newUser = await userModel.find();
    res.json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};
export const updateUserController = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const reqBody = req.body;
    const foundUser = userModel.findById(userId);

    if (foundUser) {
      const UpdatedUser = await userModel.findByIdAndUpdate(userId, reqBody, {
        new: true,
      });
      return res.json({
        success: true,
        data: UpdatedUser,
      });
      res.json({
        success: false,
        message: `users with id:${userId}not found`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteuserController = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const foundUser = await userModel.findById(userId);

    if (foundUser) {
      await userModel.findByIdAndDelete(userId);

      return res.json({
        success: true,
        message: `user with id:${userId} has been deleted`,
      });
    }

    res.json({
      success: false,
      message: `user with id:${userId} not found`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "This is delete route of books",
  });
};
export const loginUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const foundUser = await userModel.findOne({ email: reqBody.email });

    if (!foundUser) {
      return res.json({
        success: false,
        message: "invalid credentials!!1",
      });
    }
    const isPasswordValid = await foundUser.isPasswordValid(reqBody.password);

    if (isPasswordValid) {
      const userData = {
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phoneNumber: foundUser.phoneNumber,
      };

      res.json({
        success: true,
        message: `Welcome back$(foundUser.name)`,
      });
    }
    res.json({
      success: false,
      message: "invalid credentials!!!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
