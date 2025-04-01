export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export interface CategoryResponse {
  category_id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuthorDto {
  name: string;
  biography?: string;
  birthDate?: Date;
  deathDate?: Date;
}

export interface UpdateAuthorDto extends Partial<CreateAuthorDto> {}

export interface AuthorResponse {
  author_id: number;
  name: string;
  biography?: string;
  birth_date?: Date;
  death_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookDto {
  title: string;
  authorId: number;
  categoryId: number;
  price: number;
  publishedDate: Date;
  isbn: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}

export interface BookResponse {
  book_id: number;
  title: string;
  author_id: number;
  category_id?: number;
  price: number;
  published_date?: Date;
  isbn?: string;
  createdAt: Date;
  updatedAt: Date;
}
