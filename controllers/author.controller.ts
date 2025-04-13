import { Request, Response, NextFunction } from "express";
import { AuthorService } from "../services/author.service";
import {
  ApiResponse,
  AuthorResponse,
  CreateAuthorDto,
  UpdateAuthorDto,
} from "../dto";

const authorService = new AuthorService();

const getAuthors = async (
  req: Request,
  res: Response<ApiResponse<AuthorResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authorService.getAllAuthors();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (
  req: Request,
  res: Response<ApiResponse<AuthorResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await authorService.getAuthorById(id);
    if (!result) {
      res.status(404).json({ success: false, error: "Author not found" });
      return;
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (
  req: Request<{}, {}, CreateAuthorDto>,
  res: Response<ApiResponse<AuthorResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authorService.createAuthor(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (
  req: Request<{ id: string }, {}, UpdateAuthorDto>,
  res: Response<ApiResponse<[affectedCount: number]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await authorService.updateAuthor(id, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<void>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await authorService.deleteAuthor(id);
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
