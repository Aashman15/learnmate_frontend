import type { QuestionType } from "@/features/question/dtos/QuestionType";
import type { Choice } from "./choice";

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  answer?: string;
  choices: Choice[];
}
