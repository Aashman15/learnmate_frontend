import type { PracticeStatus } from "../practice-types";

export interface PracticeBaseDto {
  id: number;
  startTime: string;
  endTime?: string;
  totalQuestions: number;
  totalAnsweredQuestions?: number;
  status: PracticeStatus;
}
