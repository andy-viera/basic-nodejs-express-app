import Author from "../models/author.model";
import {
  CreateAuthorDto,
  UpdateAuthorDto,
  AuthorResponse,
} from "../dto/author.dto";

export class AuthorService {
  /**
   * Get all authors
   * @returns Promise<AuthorResponse[]>
   */
  async getAllAuthors(): Promise<AuthorResponse[]> {
    return await Author.findAll();
  }

  /**
   * Get an author by their ID
   * @param id - The author ID
   * @returns Promise<AuthorResponse | null>
   */
  async getAuthorById(id: string): Promise<AuthorResponse | null> {
    return await Author.findByPk(id);
  }

  /**
   * Create a new author
   * @param authorData - The author data to create
   * @returns Promise<AuthorResponse>
   */
  async createAuthor(authorData: CreateAuthorDto): Promise<AuthorResponse> {
    const { name, biography, birthDate, deathDate } = authorData;

    return await Author.create({
      name,
      biography,
      birth_date: birthDate,
      death_date: deathDate,
    });
  }

  /**
   * Update an author
   * @param id - The author ID
   * @param authorData - The author data to update
   * @returns Promise<[affectedCount: number]>
   */
  async updateAuthor(
    id: string,
    authorData: UpdateAuthorDto
  ): Promise<[affectedCount: number]> {
    const { name, biography, birthDate, deathDate } = authorData;

    return await Author.update(
      {
        name,
        biography,
        birth_date: birthDate,
        death_date: deathDate,
      },
      { where: { author_id: id } }
    );
  }

  /**
   * Delete an author
   * @param id - The author ID
   * @returns Promise<number>
   */
  async deleteAuthor(id: string): Promise<number> {
    return await Author.destroy({ where: { author_id: id } });
  }
}
