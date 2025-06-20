import express from "express";
import { deleteuserController, getUserController, loginUser, registerUser, updateUserController } from "../Controllers/userControllers.js";

const router= express.Router();


router.route('/register').post(registerUser).get(getUserController);

router.route("/register/:id").put(updateUserController).delete(deleteuserController);

router.route('/Login').post(loginUser);

export default router;