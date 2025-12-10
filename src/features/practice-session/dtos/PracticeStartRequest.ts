import type { PracticeInputMode } from "../practice-types";

export interface PracticeStartRequest {
  collectionId: number;
  inputType: PracticeInputMode;
}
