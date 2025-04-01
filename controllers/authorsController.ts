import { Request, Response, NextFunction } from "express";
import Author from "../models/Author";
import {
  ApiResponse,
  AuthorResponse,
  CreateAuthorDto,
  UpdateAuthorDto,
} from "../types/api";

const getAuthors = async (
  req: Request,
  res: Response<ApiResponse<AuthorResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await Author.findAll();
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
    const result = await Author.findByPk(id);
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
    const { name, biography, birthDate, deathDate } = req.body;

    const result = await Author.create({
      name,
      biography,
      birth_date: birthDate,
      death_date: deathDate,
    });
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
    const { name, biography, birthDate, deathDate } = req.body;

    const result = await Author.update(
      {
        name,
        biography,
        birth_date: birthDate,
        death_date: deathDate,
      },
      { where: { author_id: id } }
    );
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
    await Author.destroy({ where: { author_id: id } });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
