import type { QuestionType } from "./QuestionType";

export interface QuestionBaseDto {
  id: number;
  question: string;
  type: QuestionType;
}
