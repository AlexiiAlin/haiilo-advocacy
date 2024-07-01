import { IAuthor } from "../types";
import { authorService } from "./author-service";

describe('AuthorService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get authors', async () => {
    const authors: IAuthor[] = [{ email: 'test@example.com', userName: 'test', image: 'test.png' }];
    localStorage.setItem('authors', JSON.stringify(authors));

    const result = await authorService.getAuthors();
    expect(result).toEqual(authors);
  });

  it('should get author by email', async () => {
    const authors: IAuthor[] = [{ email: 'test@example.com', userName: 'test', image: 'test.png' }];
    localStorage.setItem('authors', JSON.stringify(authors));

    const result = await authorService.getAuthorByEmail('test@example.com');
    expect(result).toEqual(authors[0]);
  });

  it('should create a new author', async () => {
    const newAuthor: IAuthor = { email: 'new@example.com', userName: 'new', image: 'new.png' };

    await authorService.createAuthor(newAuthor);

    const authors = await authorService.getAuthors();
    expect(authors).toContainEqual(newAuthor);
  });

  it('should throw error when creating an author that already exists', async () => {
    const existingAuthor: IAuthor = { email: 'test@example.com', userName: 'test', image: 'test.png' };
    localStorage.setItem('authors', JSON.stringify([existingAuthor]));

    await expect(authorService.createAuthor(existingAuthor)).rejects.toThrow("Author already exists with the same email.");
  });

  it('should update an existing author', async () => {
    const existingAuthor: IAuthor = { email: 'test@example.com', userName: 'test', image: 'test.png' };
    const updatedAuthor: IAuthor = { email: 'test@example.com', userName: 'updated', image: 'updated.png' };
    localStorage.setItem('authors', JSON.stringify([existingAuthor]));

    await authorService.updateAuthor('test@example.com', updatedAuthor);

    const authors = await authorService.getAuthors();
    expect(authors).toContainEqual(updatedAuthor);
  });

  it('should throw error when updating a non-existing author', async () => {
    const updatedAuthor: IAuthor = { email: 'nonexistent@example.com', userName: 'nonexistent', image: 'nonexistent.png' };

    await expect(authorService.updateAuthor('nonexistent@example.com', updatedAuthor)).rejects.toThrow("Author not found.");
  });

  it('should delete an author', async () => {
    const existingAuthor: IAuthor = { email: 'test@example.com', userName: 'test', image: 'test.png' };
    localStorage.setItem('authors', JSON.stringify([existingAuthor]));

    await authorService.deleteAuthor('test@example.com');

    const authors = await authorService.getAuthors();
    expect(authors).not.toContainEqual(existingAuthor);
  });
});
