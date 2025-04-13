/**
 * DTO for creating a new category
 */
export interface CreateCategoryDto {
  name: string;
  description?: string;
}

/**
 * DTO for updating an existing category
 */
export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

/**
 * Response DTO for category data
 */
export interface CategoryResponse {
  category_id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
