export type PracticeInputType = "AUDIO" | "TEXT";

export interface PracticeAnswerState {
  id?: number;
  questionId: number;
  question: string;
  givenTextAnswer?: string;
  givenAudioAnswerUrl?: string;
  isCreated: boolean;
}
