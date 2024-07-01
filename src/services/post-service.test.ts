import { IPost, CreatePostDto } from "../types";
import { postService } from "./post-service";
import { commentService } from "./comment-service";

jest.mock("./comment-service", () => ({
  commentService: {
    getCommentsByPostId: jest.fn(),
    deleteComment: jest.fn(),
  }
}));

describe('PostService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should get posts', async () => {
    const posts: IPost[] = [{ id: 1, title: 'test', text: 'test', image: 'test.png', authorEmail: 'test@example.com' }];
    localStorage.setItem('posts', JSON.stringify(posts));

    const result = await postService.getPosts();
    expect(result).toEqual(posts);
  });

  it('should get post by id', async () => {
    const posts: IPost[] = [{ id: 1, title: 'test', text: 'test', image: 'test.png', authorEmail: 'test@example.com' }];
    localStorage.setItem('posts', JSON.stringify(posts));

    const result = await postService.getPostById(1);
    expect(result).toEqual(posts[0]);
  });

  it('should create a new post', async () => {
    const newPost: CreatePostDto = { title: 'new', text: 'new', image: 'new.png', authorEmail: 'new@example.com' };

    await postService.createPost(newPost);

    const posts = await postService.getPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject(newPost);
    expect(posts[0].id).toBeDefined();
  });

  it('should update an existing post', async () => {
    const existingPost: IPost = { id: 1, title: 'test', text: 'test', image: 'test.png', authorEmail: 'test@example.com' };
    const updatedPost: IPost = { id: 1, title: 'updated', text: 'updated', image: 'updated.png', authorEmail: 'test@example.com' };
    localStorage.setItem('posts', JSON.stringify([existingPost]));

    await postService.updatePost(updatedPost);

    const posts = await postService.getPosts();
    expect(posts).toContainEqual(updatedPost);
  });

  it('should delete a post and its comments', async () => {
    const existingPost: IPost = { id: 1, title: 'test', text: 'test', image: 'test.png', authorEmail: 'test@example.com' };
    const postComments = [{ id: 1, postId: 1, text: 'comment', authorEmail: 'comment@example.com' }];
    localStorage.setItem('posts', JSON.stringify([existingPost]));
    (commentService.getCommentsByPostId as jest.Mock).mockResolvedValue(postComments);

    await postService.deletePost(1);

    const posts = await postService.getPosts();
    expect(posts).toHaveLength(0);
    expect(commentService.getCommentsByPostId).toHaveBeenCalledWith(1);
    expect(commentService.deleteComment).toHaveBeenCalledTimes(postComments.length);
    expect(commentService.deleteComment).toHaveBeenCalledWith(postComments[0].id);
  });
});
