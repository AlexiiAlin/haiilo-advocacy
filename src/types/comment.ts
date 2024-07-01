import { Entity } from "./entity";

export interface IComment extends Entity {
  id: number;
  postId: number;
  text: string;
  authorEmail: string;
}


export interface CreateCommentDto {
  id?: number;
  postId: number;
  text: string;
  authorEmail: string;
}