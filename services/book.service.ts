import Book from "../models/book.model";
import { CreateBookDto, UpdateBookDto, BookResponse } from "../dto/book.dto";

export class BookService {
  /**
   * Get all books
   * @returns Promise<BookResponse[]>
   */
  async getAllBooks(): Promise<BookResponse[]> {
    return await Book.findAll();
  }

  /**
   * Get a book by its ID
   * @param id - The book ID
   * @returns Promise<BookResponse | null>
   */
  async getBookById(id: string): Promise<BookResponse | null> {
    return await Book.findByPk(id);
  }

  /**
   * Create a new book
   * @param bookData - The book data to create
   * @returns Promise<BookResponse>
   */
  async createBook(bookData: CreateBookDto): Promise<BookResponse> {
    const { title, authorId, categoryId, price, publishedDate, isbn } =
      bookData;

    return await Book.create({
      title,
      author_id: authorId,
      category_id: categoryId,
      price,
      published_date: publishedDate,
      isbn,
    });
  }

  /**
   * Update a book
   * @param id - The book ID
   * @param bookData - The book data to update
   * @returns Promise<[affectedCount: number]>
   */
  async updateBook(
    id: string,
    bookData: UpdateBookDto
  ): Promise<[affectedCount: number]> {
    const { title, authorId, categoryId, price, publishedDate, isbn } =
      bookData;

    return await Book.update(
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
  }

  /**
   * Delete a book
   * @param id - The book ID
   * @returns Promise<number>
   */
  async deleteBook(id: string): Promise<number> {
    return await Book.destroy({ where: { book_id: id } });
  }
}
