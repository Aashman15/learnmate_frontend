import type { Collection } from "./collection";

export interface Question {
  id: number;
  question: string;
  answer?: string;
  collection: Collection;
}
