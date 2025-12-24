import type { PracticeStatus } from "../practice-types";

export interface PracticeSubmitResponse {
  practiceId: number;
  practiceStatus: PracticeStatus;
}
