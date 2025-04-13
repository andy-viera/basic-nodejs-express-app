import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";
import {
  ApiResponse,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../dto";

const categoryService = new CategoryService();

const getCategories = async (
  req: Request,
  res: Response<ApiResponse<CategoryResponse[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await categoryService.getAllCategories();
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
    const result = await categoryService.getCategoryById(id);
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
    const result = await categoryService.createCategory(req.body);
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
    const result = await categoryService.updateCategory(id, req.body);
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
    await categoryService.deleteCategory(id);
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
