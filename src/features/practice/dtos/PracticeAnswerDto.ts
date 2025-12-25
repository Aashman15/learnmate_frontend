import type { QuestionDto } from "@/features/question/dtos/QuestionDto";

export interface PracticeAnswerDto {
  id: number;
  question: QuestionDto;
  givenTextAnswer?: string;
  givenAudioAnswerUrl?: string;
}
