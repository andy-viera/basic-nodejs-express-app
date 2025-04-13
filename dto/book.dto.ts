/**
 * DTO for creating a new book
 */
export interface CreateBookDto {
  title: string;
  authorId: number;
  categoryId: number;
  price: number;
  publishedDate: Date;
  isbn: string;
}

/**
 * DTO for updating an existing book
 */
export interface UpdateBookDto extends Partial<CreateBookDto> {}

/**
 * Response DTO for book data
 */
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
