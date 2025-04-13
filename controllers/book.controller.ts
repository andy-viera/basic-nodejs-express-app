import { Request, Response, NextFunction } from "express";
import {
  BookResponse,
  CreateBookDto,
  UpdateBookDto,
  ApiResponse,
} from "../dto";
import { BookService } from "../services/book.service";

const bookService = new BookService();

const getBooks = async (
  req: Request,
  res: Response<ApiResponse<BookResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await bookService.getAllBooks();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (
  req: Request,
  res: Response<ApiResponse<BookResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await bookService.getBookById(id);
    if (!result) {
      res.status(404).json({ success: false, error: "Book not found" });
      return;
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createBook = async (
  req: Request<{}, {}, CreateBookDto>,
  res: Response<ApiResponse<BookResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (
  req: Request<{ id: string }, {}, UpdateBookDto>,
  res: Response<ApiResponse<[affectedCount: number]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await bookService.updateBook(id, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<void>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
