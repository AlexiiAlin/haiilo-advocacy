import { IComment, CreateCommentDto } from "../types";
import { commentService } from './comment-service';

describe('CommentService', () => {
  const mockComments: IComment[] = [
    { id: 1, postId: 1, text: 'Comment 1', authorEmail: 'author1@test.com' },
    { id: 2, postId: 1, text: 'Comment 2', authorEmail: 'author2@test.com' },
    { id: 3, postId: 2, text: 'Comment 3', authorEmail: 'author1@test.com' }
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('getCommentsByPostId returns an empty array if no comments exist for the post', async () => {
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).toEqual([]);
  });

  it('getCommentsByPostId returns the correct comments for the post in reverse order', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).toEqual([mockComments[1], mockComments[0]]);
  });

  it('createComment successfully adds a new comment with a unique ID', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    const newComment: CreateCommentDto = { postId: 1, text: 'New Comment', authorEmail: 'author3@test.com' };
    await commentService.createComment(newComment);
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).toHaveLength(3);
    const createdComment = comments.find(comment => comment.text === 'New Comment');
    expect(createdComment).toBeDefined();
    expect(createdComment?.id).toBeGreaterThan(3);
  });

  it('updateComment successfully updates an existing comment', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    const updatedComment: IComment = { id: 1, postId: 1, text: 'Updated Comment 1', authorEmail: 'author1@test.com' };
    await commentService.updateComment(updatedComment);
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).toContainEqual(updatedComment);
  });

  it('updateComment does nothing if the comment does not exist', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    const nonExistentComment: IComment = { id: 999, postId: 1, text: 'Non-existent Comment', authorEmail: 'author@test.com' };
    await commentService.updateComment(nonExistentComment);
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).not.toContainEqual(nonExistentComment);
    expect(comments).toEqual([mockComments[1], mockComments[0]]);
  });

  it('deleteComment successfully deletes an existing comment', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    await commentService.deleteComment(1);
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).not.toContainEqual(mockComments[0]);
  });

  it('deleteComment does nothing if the comment does not exist', async () => {
    localStorage.setItem('comments', JSON.stringify(mockComments));
    await commentService.deleteComment(999);
    const comments = await commentService.getCommentsByPostId(1);
    expect(comments).toEqual([mockComments[1], mockComments[0]]);
  });
});
