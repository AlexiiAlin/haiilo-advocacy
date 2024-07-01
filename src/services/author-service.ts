import { IAuthor } from "../types";

class AuthorService {
  private static readonly storageKey = 'authors';

  public async getAuthors(): Promise<IAuthor[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const authors = localStorage.getItem(AuthorService.storageKey);
        resolve(authors ? JSON.parse(authors) : []);
      }, 300);
    });
  }

  public async getAuthorByEmail(email: string): Promise<IAuthor | undefined> {
    return this.getAuthors().then(authors => authors.find(author => author.email === email));
  }

  public async createAuthor(author: IAuthor): Promise<void> {
    const authors = await this.getAuthors();
    const existingAuthor = authors.find(a => a.email === author.email);
    if (!existingAuthor) {
      authors.push(author);
      this.saveAuthors(authors);
    } else {
      throw new Error("Author already exists with the same email.");
    }
  }

  public async updateAuthor(email: string, updatedAuthor: IAuthor): Promise<void> {
    let authors = await this.getAuthors();
    const index = authors.findIndex(author => author.email === email);
    if (index !== -1) {
      authors[index] = updatedAuthor;
      this.saveAuthors(authors);
    } else {
      throw new Error("Author not found.");
    }
  }

  public async deleteAuthor(email: string): Promise<void> {
    let authors = await this.getAuthors();
    authors = authors.filter(author => author.email !== email);
    this.saveAuthors(authors);
  }

  private saveAuthors(authors: IAuthor[]): void {
    localStorage.setItem(AuthorService.storageKey, JSON.stringify(authors));
  }
}

export const authorService = new AuthorService();
