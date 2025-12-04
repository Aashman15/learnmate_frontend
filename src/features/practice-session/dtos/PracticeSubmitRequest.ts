import type { PracticeItemWithAnswer } from "./PracticeItemWithAnswer";

export interface PracticeSubmitRequest {
  answers: Omit<PracticeItemWithAnswer, "question">[];
}
