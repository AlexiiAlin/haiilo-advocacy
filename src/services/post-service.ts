import { IPost, CreatePostDto } from "../types";
import { commentService } from "./comment-service";
import { sortById } from "../utils/sortById";

class PostService {
  private static readonly storageKey = 'posts';

  public async getPosts(): Promise<IPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = localStorage.getItem(PostService.storageKey);
        resolve(posts ? JSON.parse(posts).slice().sort(sortById) : []);
      }, 300);
    });
  }

  public async getPostById(id: number): Promise<IPost | undefined> {
    return this.getPosts().then(posts => posts.find(post => post.id === id));
  }

  public async createPost(post: CreatePostDto): Promise<void> {
    const posts = await this.getPosts();
    const newId =  Math.max(...posts.map(post => post.id), 0) + 1;
    posts.push({
      ...post,
      id: newId
    });
    this.savePosts(posts);
  }

  public async updatePost(updatedPost: IPost): Promise<void> {
    const posts = await this.getPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
      this.savePosts(posts);
    }
  }

  public async deletePost(id: number): Promise<void> {
    let posts = await this.getPosts();
    let postComments = await commentService.getCommentsByPostId(id);
    posts = posts.filter(post => post.id !== id);
    this.savePosts(posts);
    for (const postComment of postComments) {
      await commentService.deleteComment(postComment.id)
    }
  }

  private savePosts(posts: IPost[]): void {
    localStorage.setItem(PostService.storageKey, JSON.stringify(posts));
  }
}

export const postService = new PostService();
