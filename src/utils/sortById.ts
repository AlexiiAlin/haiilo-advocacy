import { Entity } from "../types";

export const sortById = (a: Entity, b: Entity): number => b.id - a.id;
