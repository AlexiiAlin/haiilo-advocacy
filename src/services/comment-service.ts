import { CreateCommentDto, IComment } from "../types";
import { sortById } from "../utils/sortById";

class CommentService {
  private static readonly storageKey = 'comments';

  public async getCommentsByPostId(postId: number): Promise<IComment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allComments = localStorage.getItem(CommentService.storageKey);
        const comments = allComments ? JSON.parse(allComments).slice().sort(sortById) : [];
        resolve(comments.filter((comment: IComment) => comment.postId === postId));
      }, 300);
    });
  }

  public async createComment(comment: CreateCommentDto): Promise<void> {
    const comments = await this.getAllComments();
    const newId =  Math.max(...comments.map(comment => comment.id), 0) + 1;
    comments.push({
      ...comment,
      id: newId
    });
    this.saveComments(comments);
  }

  public async updateComment(updatedComment: IComment): Promise<void> {
    const comments = await this.getAllComments();
    const index = comments.findIndex(comment => comment.id === updatedComment.id);
    if (index !== -1) {
      comments[index] = updatedComment;
      this.saveComments(comments);
    }
  }

  public async deleteComment(id: number): Promise<void> {
    let comments = await this.getAllComments();
    comments = comments.filter(comment => comment.id !== id);
    this.saveComments(comments);
  }

  private async getAllComments(): Promise<IComment[]> {
    return new Promise((resolve) => {
      const allComments = localStorage.getItem(CommentService.storageKey);
      resolve(allComments ? JSON.parse(allComments) : []);
    });
  }

  private saveComments(comments: IComment[]): void {
    localStorage.setItem(CommentService.storageKey, JSON.stringify(comments));
  }
}

export const commentService = new CommentService();
