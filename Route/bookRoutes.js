import express from "express";

import {
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../Controllers/bookControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkStaffLevelPermissions } from "../middleware/CheckPermission.js";

const bookRouter = express.Router();

bookRouter
  .route("/").get(checkAuthorization, getBookController) 
  .post(checkAuthorization, checkStaffLevelPermissions, createBookController);

bookRouter
  .route("/:id") .put(updateBookController)
  .delete(checkAuthorization, deleteBookController);

bookRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "This is root of books",
  });
});

bookRouter.post("/", (req, res) => {
  res.json({
    success: true,
    message: "This is create route of books",
  });
});

export default bookRouter;



// import express from 'express';
// import {getBookController, createBookController,update,deleteBook} from '../controllers/bookControllers.js';
// import { checkAuthorization  } from '../middleware/checkAuthorization.js';
// import { checkPermissions } from '../middleware/checkPermissions.js';
// const bookRouter = express.Router();



// bookRouter.route('/').get(checkAuthorization, getBookController)
// .post(checkAuthorization,checkPermissions,createBookController);

// bookRouter.route('/:id').put(checkAuthorization,update)
// .delete(checkAuthorization, deleteBook);

// bookRouter.get('/', (req,res) => {
//     res.json({
//         success:true,
//         message:"This is root of books",
//     })
// });

// bookRouter.post("/", (req,res) => {
//     res.json({
//         success:true,
//         message:"This is create route of books",
//     })
// })

// export default bookRouter;