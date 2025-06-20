import { BookModel } from "../models/bookModel.js";
import { decodeJWT } from "../utils/generateToken.js";


export const getBookController = async(req, res) => {
    try{
//       const jwtToken = req?.body?.token;

// if(!jwtToken){
//   return res.json({
//     success: false,
//     message: "You are not authorized!!!",
//   });
// }

//      const foundUser= await decodeJWT(jwtToken);
//      console.log(foundUser);
     
//      if(!foundUser){
//       return res.json({
//         success: false,
//         message:'You are not authorized!!!',
//       });
//      }
    const user=req.user;
    const books = await BookModel.find();
  res.json({
    success: true,
    data:books,
    userInfo:user,
  })
}catch(error){
    console.log(error);
    res.json({
        success: false,
        message:error,
      });
}
};
  
export const createBookController=async(req, res) => {
    try {
        const reqBody=req.body;
    const book=await BookModel.create(reqBody);
    res.json({
      success: true,
      data:book,
    });
}
    catch (error) {
        console.log(error);
    res.json({
        success: false,
        message:error,
      });
    }
}

export const updateBookController=async(req, res) => {
 try {
  const { id: bookId } = req.params;
  const reqBody = req.body;

  const foundBook = await BookModel.findById(bookId);

  if (foundBook) {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
      new: true,
    });

    return res.json({
      success: true,
      data: updatedBook,
    });
  }
  res.json({
    success: false,
    message: `Book with id:${bookId} not found`,
  });

 } catch (error) {
  console.log(error);
  res.json({
    success: false,
    message: error.message,
  });
 }
   
  };


  export const deleteBookController=async(req, res) => {
   try {
    const { id: bookId } = req.params;

    const foundBook = await BookModel.findById(bookId);

    if (foundBook) {
      await BookModel.findByIdAndDelete(bookId);

      return res.json({
        success: true,
        message: `Book with id:${bookId} has been deleted`,
      });
    }

    res.json({
      success: false,
      message: `Book with id:${bookId} not found`,
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
