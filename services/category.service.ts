import Category from "../models/category.model";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponse,
} from "../dto/category.dto";

export class CategoryService {
  /**
   * Get all categories
   * @returns Promise<CategoryResponse[]>
   */
  async getAllCategories(): Promise<CategoryResponse[]> {
    return await Category.findAll();
  }

  /**
   * Get a category by its ID
   * @param id - The category ID
   * @returns Promise<CategoryResponse | null>
   */
  async getCategoryById(id: string): Promise<CategoryResponse | null> {
    return await Category.findByPk(id);
  }

  /**
   * Create a new category
   * @param categoryData - The category data to create
   * @returns Promise<CategoryResponse>
   */
  async createCategory(
    categoryData: CreateCategoryDto
  ): Promise<CategoryResponse> {
    const { name, description } = categoryData;

    return await Category.create({
      name,
      description,
    });
  }

  /**
   * Update a category
   * @param id - The category ID
   * @param categoryData - The category data to update
   * @returns Promise<[affectedCount: number]>
   */
  async updateCategory(
    id: string,
    categoryData: UpdateCategoryDto
  ): Promise<[affectedCount: number]> {
    const { name, description } = categoryData;

    return await Category.update(
      {
        name,
        description,
      },
      { where: { category_id: id } }
    );
  }

  /**
   * Delete a category
   * @param id - The category ID
   * @returns Promise<number>
   */
  async deleteCategory(id: string): Promise<number> {
    return await Category.destroy({ where: { category_id: id } });
  }
}
