import { Entity } from "./entity";

export interface IPost extends Entity {
  id: number;
  title: string;
  text: string;
  image: string;
  authorEmail: string;
}

export interface CreatePostDto {
  id?: number;
  title: string;
  text: string;
  image: string;
  authorEmail: string;
}