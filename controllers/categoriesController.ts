import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import {
  ApiResponse,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/api";

const getCategories = async (
  req: Request,
  res: Response<ApiResponse<CategoryResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await Category.findAll();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response<ApiResponse<CategoryResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await Category.findByPk(id);
    if (!result) {
      res.status(404).json({ success: false, error: "Category not found" });
      return;
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (
  req: Request<{}, {}, CreateCategoryDto>,
  res: Response<ApiResponse<CategoryResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;

    const result = await Category.create({
      name,
      description,
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request<{ id: string }, {}, UpdateCategoryDto>,
  res: Response<ApiResponse<[affectedCount: number]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await Category.update(
      {
        name,
        description,
      },
      { where: { category_id: id } }
    );
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<void>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { category_id: id } });
    res.status(204).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
