import express from "express";

import {
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../Controllers/bookControllers.js";
const bookRouter = express.Router();

bookRouter.route("/").get(getBookController).post(createBookController);

bookRouter.route("/:id").put(updateBookController).delete(deleteBookController);

export default bookRouter;
