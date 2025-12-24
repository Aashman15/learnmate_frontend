export interface PracticeItemDto {
  id: number;
  question: string;
  expectedAnswer: string;
  givenAnswer?: string;
  audioUrl?: string;
}
