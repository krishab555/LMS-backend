import express from "express";

import {
  deleteuserController,
  getUserController,
  loginUser,
  registerUser,
  updateUserController,
} from "../Controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser).get(getUserController);

router
  .route("/register/:id")
  .put(updateUserController)
  .delete(deleteuserController);

router.route("/login").post(loginUser);
export default router;
