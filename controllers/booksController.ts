import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";
import {
  ApiResponse,
  BookResponse,
  CreateBookDto,
  UpdateBookDto,
} from "../types/api";

const getBooks = async (
  req: Request,
  res: Response<ApiResponse<BookResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await Book.findAll();
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
    const result = await Book.findByPk(id);
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
    const { title, authorId, categoryId, price, publishedDate, isbn } =
      req.body;

    const result = await Book.create({
      title,
      author_id: authorId,
      category_id: categoryId,
      price,
      published_date: publishedDate,
      isbn,
    });
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
    const { title, authorId, categoryId, price, publishedDate, isbn } =
      req.body;

    const result = await Book.update(
      {
        title,
        author_id: authorId,
        category_id: categoryId,
        price,
        published_date: publishedDate,
        isbn,
      },
      { where: { book_id: id } }
    );
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
    await Book.destroy({ where: { book_id: id } });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
