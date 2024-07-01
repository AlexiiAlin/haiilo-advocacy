import { IPost } from "./post";
import { IAuthor } from "./author";

export interface PostsContextType {
  posts: IPost[];
  authors: { [key: string]: IAuthor };
  loading: boolean;
  fetchData: () => void;
}