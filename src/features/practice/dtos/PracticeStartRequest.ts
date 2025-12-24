import type { PracticeInputType } from "../practice-types";

export interface PracticeStartRequest {
  collectionId: number;
  inputType: PracticeInputType;
}
