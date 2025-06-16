import { BookModel } from "../models/bookModels.js";

export const getBookController = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

export const createBookController = async (req, res) => {
  try {
    const reqBody = req.body;
    const book = await BookModel.create(reqBody);
    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const foundBook = BookModel.findById(bookId);

    if (foundBook) {
      const UpdatedBook = await BookModel.findByIdAndUpdate(bookId, reqBody, {
        new: true,
      });
      return res.json({
        success: true,
        data: UpdatedBook,
      });
      res.json({
        success: true,
        message: "This is update route of books",
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
export const deleteBookController = async (req, res) => {
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
