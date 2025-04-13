/**
 * DTO for creating a new author
 */
export interface CreateAuthorDto {
  name: string;
  biography?: string;
  birthDate?: Date;
  deathDate?: Date;
}

/**
 * DTO for updating an existing author
 */
export interface UpdateAuthorDto extends Partial<CreateAuthorDto> {}

/**
 * Response DTO for author data
 */
export interface AuthorResponse {
  author_id: number;
  name: string;
  biography?: string;
  birth_date?: Date;
  death_date?: Date;
  createdAt: Date;
  updatedAt: Date;
}
